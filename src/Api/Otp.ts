import { Otp } from "../@types/Otp";
import { OtpField } from "../@types/OtpField";
import { Api, handleAxiosError } from "./Base";
import { encryptString } from "../Util/encryptString";
import { supportedAlgos } from "../Util/generateAlgos";


export const ApiListOtps = (): Promise<Otp[]> => {

    return new Promise(async (res, rej) => {

        try {

            const { data } = await Api.get("otp");
            
            res(data as any);
            
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });

}; 

export const ApiCreateOtp = (name: string, key: string, fields: OtpField[], issuer: string, digits: string, period: string, algorithm?: string): Promise<boolean> => {
    return new Promise(async (res, rej) => {

        if(isNaN(parseInt(digits))) {
            return rej({
                param: "digits",
                msg: "Invalid amount of digits to generate."
            });
        }
        if(isNaN(parseInt(period))) {
            return rej({
                param: "digits",
                msg: "Invalid amount of period to wait to generate."
            });
        }
        if(algorithm && algorithm !== "" && !supportedAlgos.includes(algorithm)) {
            return rej({
                param: "digits",
                msg: "That algorithm is unsupported"
            });
        }

        try {
            const issuerSecure = issuer === "" ? undefined : encryptString(issuer);
            const digitsSecure = digits === "" || digits === "6" ? undefined : encryptString(digits);
            const periodSecure = period === "" || period === "30" ? undefined : encryptString(period);
            const algorithmSecure = (!algorithm || algorithm === "" || algorithm === "SHA1") ? undefined : encryptString(algorithm);

            const nameSecure = encryptString(name);
            const keySecure = encryptString(key);
            
            const encryptedFields: OtpField[] = fields.map((field) => ({
                name: encryptString(field.name),
                value: encryptString(field.value),
            }));

            await Api.post("otp", {
                name: nameSecure,
                key: keySecure,
                fields: encryptedFields,
                issuer: issuerSecure,
                digits: digitsSecure,
                period: periodSecure,
                algorithm: algorithmSecure,
            });

            res(true);
        } catch (e) {
            rej(handleAxiosError(e));
        }

    });
}