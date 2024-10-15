"use client";
import CategoryBox from "@/components/pos/category-box";
import SearchBar from "@/components/search-bar";
import { Separator } from "@/components/ui/separator";
import Cart from "@/components/pos/cart";
import ProductsContainer from "@/components/pos/products-container";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_ENDPOINT from "../../../../config/endpoint";
import axiosInstance from "@/utils/axios-util";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Payment from "@/components/pos/payment";

export default function POSPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [saleCode, setSaleCode] = useState<string>("");
  const [tab, setTab] = useState<"sale" | "payment">("sale");

  const fetchCategoriesData = async (search?: string) => {
    const url =
      search && search != ""
        ? `${API_ENDPOINT.CATEGORY_CASHEER}?search=${search}`
        : `${API_ENDPOINT.CATEGORY_CASHEER}`;
    await axiosInstance
      .get(url)
      .then((res) => {
        if (Array.isArray(res.data)) {
          const ctgrs: { id: number; name: string }[] = [];
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            const ctgr = { id: element.id, name: element.name };
            ctgrs.push(ctgr);
          }
          setCategories(ctgrs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    let url = `${API_ENDPOINT.PRODUCT_LIST}?search=${query}`;
    if (query === "") {
      url = `${API_ENDPOINT.PRODUCT_LIST}`;
    }
    await fetchCategoriesData(query);
    await axiosInstance.get(url).then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleSelectedCategory = useCallback(async (category: number) => {
    await axiosInstance
      .get(`${API_ENDPOINT.PRODUCT_LIST}?category_id=${category}`)
      .then((res) => {
        setProducts(res.data);
      });
  }, []);

  return (
    <Tabs
      value={tab}
      onValueChange={(e) => {
        setTab(e as "sale" | "payment");
      }}
      className="w-full h-full overflow-y-auto"
    >
      <TabsList>
        <TabsTrigger value="sale">Sale</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full h-full" value="sale">
        <h1 className="scroll-m-20 mb-2 text-2xl font-extrabold tracking-tight lg:text-5xl">
          Cashier
        </h1>
        <div className="flex w-full">
          <div className="w-2/3">
            <SearchBar onSearch={handleSearch} />
            <div className="my-2 w-[50vw]">
              <CategoryBox
                categories={categories}
                onSelectedCategory={handleSelectedCategory}
              />
            </div>
            <Separator className="my-4" />
            <div className="mr-2 h-[50vh]">
              <ProductsContainer products={products} />
            </div>
          </div>
          <div className="w-1/3">
            <Cart setTab={setTab} setSaleCode={setSaleCode} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="payment">
        <div className="w-full h-full">
          <Payment sale_code={saleCode !== "" ? saleCode : undefined} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
