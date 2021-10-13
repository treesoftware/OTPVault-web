import { AES, HmacSHA256, SHA256 } from "crypto-js";
import { QueryProvider } from "../App";
import { setLoggedInAccount, setNotLoggedIn } from "../Store/Actions/UserActions";
import { ApplicationStore } from "../Store/Store";
import { Api, handleAxiosError } from "./Base";

export const ApiLogoutUser = (): Promise<{ ok: boolean }> => {

    return new Promise(async (res, rej) => {

        try {

            const { data } = await Api.post("auth/logout");
            
            ApplicationStore.dispatch(setNotLoggedIn());
            QueryProvider.getQueryCache().clear();
            QueryProvider.clear();

            res(data as any);
            
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });

}
export const ApiUpdateAccount = (email: string, name?: string): Promise<{ ok: boolean }> => {

    return new Promise(async (res, rej) => {

        try {

            const { data } = await Api.post("account", {
                email,
                name
            });
            
            const user = ApplicationStore.getState().user.user!;
            const key = ApplicationStore.getState().user.key!;

            const newUser = {
                ...user,
                email,
                name
            }
            ApplicationStore.dispatch(setLoggedInAccount(newUser, key));

            res(data as any);
            
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });

}
export const ApiDeleteAccount = (password: string): Promise<{ ok: boolean }> => {

    return new Promise(async (res, rej) => {

        try {

            const { data } = await Api.delete("account", {
                data: {
                    password
                }
            });
            
            ApplicationStore.dispatch(setNotLoggedIn());
            QueryProvider.getQueryCache().clear();
            QueryProvider.clear();

            res(data as any);
            
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });

}

export const ApiUpdatePassword = (password: string, newPassword: string, confirmNewPassword: string): Promise<{ ok: boolean }> => {

    return new Promise(async (res, rej) => {

        try {

            const existingKey = ApplicationStore.getState().user.key!;

            const encryptedKey = AES.encrypt(existingKey.toString(), newPassword).toString(); // Encrypt master password
            const hmac = HmacSHA256(encryptedKey, SHA256(newPassword)).toString(); // Generate master password HMAC

            const { data } = await Api.post("account/password", {
                data: {
                    password,
                    new_password: newPassword,
                    new_password_confirmed: confirmNewPassword,
                    key: encryptedKey + hmac
                }
            });

            res(data as any);
            
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });

}