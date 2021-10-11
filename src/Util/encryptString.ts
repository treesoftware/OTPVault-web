import { AES, enc } from "crypto-js";
import { ApplicationStore } from "../Store/Store"

export const encryptString = (msg: string): string => {
    const key = ApplicationStore.getState().user.key!;

    const stringKey = key.toString(enc.Utf8);
    const cypher = AES.encrypt(msg, stringKey);

    return cypher.toString();
}