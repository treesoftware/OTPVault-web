import { QueryProvider } from "../App";
import { encryptString } from "../Util/encryptString";
import { Api, handleAxiosError } from "./Base";

export const ApiCreateOtpField = (id: string, name: string, value: string): Promise<boolean> => {
    return new Promise(async (res, rej) => {

        try {
            const nameSecure = encryptString(name);
            const valueSecure = encryptString(value);

            await Api.post(`fields/${id}`, {
                name: nameSecure,
                value: valueSecure
            });

            res(true);
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });
}
export const ApiUpdateOtpField = (otpId: string, id: number, name: string, value: string): Promise<boolean> => {
    return new Promise(async (res, rej) => {

        try {
            const nameSecure = encryptString(name);
            const valueSecure = encryptString(value);

            await Api.put(`fields/${otpId}/${id}`, {
                name: nameSecure,
                value: valueSecure
            });

            res(true);
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });
}

export const ApiDeleteOtpField = (otpId: string, id: number): Promise<boolean> => {

    return new Promise(async (res, rej) => {
        try {

            await Api.delete(`fields/${otpId}/${id}`);

            QueryProvider.invalidateQueries(["single-password", otpId]);

            res(true);
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });
}