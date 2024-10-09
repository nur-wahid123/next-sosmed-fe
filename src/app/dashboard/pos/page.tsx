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
      search && search.length > 0
        ? `${API_ENDPOINT.CATEGORY_LIST}?search=${search}`
        : `${API_ENDPOINT.CATEGORY_LIST}`;
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
    await fetchCategoriesData(query);
    await axiosInstance
      .get(`${API_ENDPOINT.PRODUCT_LIST}?search=${query}`)
      .then((res) => {
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
      className="w-full h-full overflow-hidden"
    >
      <TabsList>
        <TabsTrigger value="sale">Sale</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
      </TabsList>
      <TabsContent className="w-full" value="sale">
        <div className="flex w-full h-full">
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
            <Cart setTab={setTab} />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="payment">
        <div className="w-full h-full">
          <Payment />
        </div>
      </TabsContent>
    </Tabs>
  );
}
