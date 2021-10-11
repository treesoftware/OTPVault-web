import { AES, enc } from "crypto-js";
import { ApplicationStore } from "../Store/Store"

export const decryptString = (msg: string): string => {
    const key = ApplicationStore.getState().user.key!;

    const stringKey = key.toString(enc.Utf8);
    const bytes = AES.decrypt(msg, stringKey);

    return bytes.toString(enc.Utf8);
}