import CONFIG from "./config";

const API_ENDPOINT = {
    URL_LOGIN: `${CONFIG.BASE_URL}/auth/login`,
    TRY_URL: `${CONFIG.BASE_URL}/hello`,
    CATEGORY_LIST: `${CONFIG.BASE_URL}/categories`,
    CATEGORY_CASHEER: `${CONFIG.BASE_URL}/categories/cashier`,
    PRODUCT_LIST: `${CONFIG.BASE_URL}/products/all`,
    SUPPLIER_LIST: `${CONFIG.BASE_URL}/suppliers`,
    CREATE_SALE: `${CONFIG.BASE_URL}/sales/create`,
    CREATE_PURCHASE: `${CONFIG.BASE_URL}/purchases/create`,
    GET_PURCHASE: `${CONFIG.BASE_URL}/purchases/list`,
    GET_SALE: `${CONFIG.BASE_URL}/sales/list`,
    PAY_PURCHASE: `${CONFIG.BASE_URL}/purchases/payment`,
    PAY_SALE: `${CONFIG.BASE_URL}/sales/payment`,
    CHECK_SALE_NEED_TO_PAY: `${CONFIG.BASE_URL}/sales/need-to-pay`,
    CHECK_PURCHASE_NEED_TO_PAY: `${CONFIG.BASE_URL}/purchases/need-to-pay`,
    DUMMY: `https://dummyjson.com`,
} as const

export default API_ENDPOINT