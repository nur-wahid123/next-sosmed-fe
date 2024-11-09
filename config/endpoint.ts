import CONFIG from "./config";

const API_ENDPOINT = {
    //auth
    URL_LOGIN: `${CONFIG.BASE_URL}/auth/login`,

    //brand
    BRAND_LIST: `${CONFIG.BASE_URL}/brands/list`,

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
    CATEGORY_CASHEER: `${CONFIG.BASE_URL}/categories/cashier`,

    //supplier
    SUPPLIER_LIST: `${CONFIG.BASE_URL}/suppliers/list`,

    //checkurl
    TRY_URL: `${CONFIG.BASE_URL}/hello`,

    //sale
    CREATE_SALE: `${CONFIG.BASE_URL}/sales/create`,
    GET_SALE: `${CONFIG.BASE_URL}/sales/list`,
    PAY_SALE: `${CONFIG.BASE_URL}/sales/payment`,
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