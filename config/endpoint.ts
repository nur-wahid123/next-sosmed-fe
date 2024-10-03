import CONFIG from "./config";

const API_ENDPOINT = {
    URL_LOGIN: `${CONFIG.BASE_URL}/auth/login`,
    TRY_URL: `${CONFIG.BASE_URL}/hello`,
    DUMMY: `https://dummyjson.com`,
} as const

export default API_ENDPOINT