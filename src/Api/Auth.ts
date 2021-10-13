import { AES, HmacSHA256, SHA256} from "crypto-js";
import { UserResponse } from "../@types/UserResponse";
import { QueryProvider } from "../App";
import { lockUserVault } from "../Store/Actions/UserActions";
import { ApplicationStore } from "../Store/Store";
import { Api, handleAxiosError } from "./Base";

export const ApiCheckAuth = (): Promise<UserResponse> => {

    return new Promise(async (res, rej) => {

        try {

            const { data } = await Api.get("auth");
            
            res(data as any);
            
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });

}

export const UnlockVault = (password: string, key: string): Promise<CryptoJS.lib.WordArray> => {

    return new Promise((res, rej) => {
        const unlockKey = `${password}`;

        const masterHmac = key.substring(0, 64);
        const masterKey = key.substring(64);
    
        const decryptHmac = HmacSHA256(masterKey, SHA256(unlockKey)).toString();
      
        if(decryptHmac === masterHmac) {
            const decryptedMasterKey = AES.decrypt(masterKey, unlockKey);
            res(decryptedMasterKey);
        } else {
            rej({
                param: "password",
                msg: "Password is incorrect, please try again."
            });
        }

    })

}
export const LockVault = () => {

    ApplicationStore.dispatch(lockUserVault());
    QueryProvider.invalidateQueries("my-passwords");
    QueryProvider.invalidateQueries("single-password");
    QueryProvider.getQueryCache().clear();

}

export const ApiLogin = (email: string, password: string): Promise<UserResponse> => {

    return new Promise(async (res, rej) => {

        try {

            const { data } = await Api.post("auth/login", {
                email,
                password
            });

            res(data as any);

        } catch (e) {
            rej(handleAxiosError(e));
        }

    });

}

export const ApiSignUp = (email: string, password: string, confirmPassword: string, name?: string): Promise<{ ok: boolean }> => {

    return new Promise(async (res, rej) => {

        try {

            const { data } = await Api.post("auth/signup", {
                email,
                password,
                confirmPassword,
                name
            });

            res(data as any);

        } catch (e) {
            rej(handleAxiosError(e));
        }

    });

}