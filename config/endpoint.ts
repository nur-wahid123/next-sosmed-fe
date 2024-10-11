import CONFIG from "./config";

const API_ENDPOINT = {
    URL_LOGIN: `${CONFIG.BASE_URL}/auth/login`,
    TRY_URL: `${CONFIG.BASE_URL}/hello`,
    CATEGORY_LIST: `${CONFIG.BASE_URL}/categories`,
    PRODUCT_LIST: `${CONFIG.BASE_URL}/products/all`,
    CREATE_SALE: `${CONFIG.BASE_URL}/sales/create`,
    GET_SALE: `${CONFIG.BASE_URL}/sales/list`,
    PAY_SALE: `${CONFIG.BASE_URL}/sales/payment`,
    CHECK_SALE_NEED_TO_PAY: `${CONFIG.BASE_URL}/sales/need-to-pay`,
    DUMMY: `https://dummyjson.com`,
} as const

export default API_ENDPOINT