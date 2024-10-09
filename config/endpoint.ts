import CONFIG from "./config";

const API_ENDPOINT = {
    URL_LOGIN: `${CONFIG.BASE_URL}/auth/login`,
    TRY_URL: `${CONFIG.BASE_URL}/hello`,
    CATEGORY_LIST: `${CONFIG.BASE_URL}/categories`,
    PRODUCT_LIST: `${CONFIG.BASE_URL}/products/all`,
    CREATE_SALE: `${CONFIG.BASE_URL}/sales/create`,
    DUMMY: `https://dummyjson.com`,
} as const

export default API_ENDPOINT