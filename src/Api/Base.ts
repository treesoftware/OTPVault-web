import Axios from 'axios';
export const Api = Axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true
})

export const handleAxiosError = (e: any) => {
    if(!Axios.isCancel(e)) {
        if(e.response?.data) {
            return e.response.data;
        } else {
            return {
                param: "wifi",
                msg: "Failed to connect to OTPVault, please check your internet connection"
            };
        }

    }
    return undefined;
}