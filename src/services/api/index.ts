import axios from "axios";

const API_URL = process.env.BASE_URL;

export async function fetchCategories() {
    try {
        const response = await axios.get(`${API_URL}/products/category-list`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; 
    }
}

export async function fetchProductsByCategory(category:string) {
    try {
        const response = await axios.get(`${API_URL}/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export async function fetchProducts(searchQuery:string) {
    try {
        const response = await axios.get(`${API_URL}/products/search?q=${searchQuery}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);

    const newPathUrl = `${window.location.pathname}?${searchParams.toString()}`;
    return newPathUrl;
}