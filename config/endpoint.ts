import CONFIG from "./config";

const API_ENDPOINT = {
    //auth
    URL_LOGIN: `${CONFIG.BASE_URL}/auth/login`,

    //brand
    BRAND_LIST: `${CONFIG.BASE_URL}/brands/list`,
    BRAND_DETAIL: `${CONFIG.BASE_URL}/brands/detail`,
    CREATE_BRAND: `${CONFIG.BASE_URL}/brands/create`,
    UPDATE_BRAND: `${CONFIG.BASE_URL}/brands/update`,

    //uom
    UOM_LIST: `${CONFIG.BASE_URL}/uoms/list`,

    //INVENTORY
    GET_INVENTORY: `${CONFIG.BASE_URL}/inventory/list`,
    UPDATE_INVENTORY: `${CONFIG.BASE_URL}/inventory/update`,
    INVENTORY_INFORMATION: `${CONFIG.BASE_URL}/inventory/information`,

    //product
    PRODUCT_LIST: `${CONFIG.BASE_URL}/products/all`,
    PRODUCT_DETAIL: `${CONFIG.BASE_URL}/products/detail`,
    ADD_PRODUCT: `${CONFIG.BASE_URL}/products/create`,
    UPDATE_PRODUCT: `${CONFIG.BASE_URL}/products/update`,
    DELETE_PRODUCT: `${CONFIG.BASE_URL}/products/delete`,

    //category
    CATEGORY_LIST: `${CONFIG.BASE_URL}/categories/list`,
    CATEGORY_DETAIL: `${CONFIG.BASE_URL}/categories/detail`,
    CATEGORY_CASHEER: `${CONFIG.BASE_URL}/categories/cashier`,
    CREATE_CATEGORY: `${CONFIG.BASE_URL}/categories/create`,
    UPDATE_CATEGORY: `${CONFIG.BASE_URL}/categories/update`,

    //supplier
    SUPPLIER_LIST: `${CONFIG.BASE_URL}/suppliers/list`,

    //checkurl
    TRY_URL: `${CONFIG.BASE_URL}/hello`,

    //sale
    CREATE_SALE: `${CONFIG.BASE_URL}/sales/create`,
    GET_SALE: `${CONFIG.BASE_URL}/sales/list`,
    GET_SALE_DETAIL: `${CONFIG.BASE_URL}/sales/detail`,
    PAY_SALE: `${CONFIG.BASE_URL}/sales/payment`,
    GET_SALE_INFORMATION: `${CONFIG.BASE_URL}/sales/information`,
    CHECK_SALE_NEED_TO_PAY: `${CONFIG.BASE_URL}/sales/need-to-pay`,

    //purchase
    CREATE_PURCHASE: `${CONFIG.BASE_URL}/purchases/create`,
    GET_PURCHASE: `${CONFIG.BASE_URL}/purchases/list`,
    PAY_PURCHASE: `${CONFIG.BASE_URL}/purchases/payment`,
    CHECK_PURCHASE_NEED_TO_PAY: `${CONFIG.BASE_URL}/purchases/need-to-pay`,

    //dummyjson
    DUMMY: `https://dummyjson.com`,
} as const

export default API_ENDPOINT