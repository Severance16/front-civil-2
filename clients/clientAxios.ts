import axios from "axios";
import * as SecureStore from "expo-secure-store";

const clientAxios = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_SERVER}`
})

clientAxios.interceptors.request.use(async function(config) {
    const jsonValue = await SecureStore.getItem("token");
    const session = jsonValue === undefined ? {token: null} : jsonValue
    config.headers.Authorization = `Bearer ${session}`
    return config
})

export default clientAxios
