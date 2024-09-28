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
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
}