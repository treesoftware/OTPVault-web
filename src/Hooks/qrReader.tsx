import { useCallback, useEffect, useRef } from "react";
import QrScanner from 'qr-scanner';
import { QrReadEvent } from "../@types/QrReadEvent";
import * as OTPAuth from 'otpauth';
import { hex2ascii } from "../Util/hexToAscii";



export const useQrReader = (onQRRead?: (params: QrReadEvent) => void) => {

    const reader = useRef(document.createElement("input"));

    const selectFile = useCallback(() => {
        reader.current.click();
    }, []);


    const onFilePicked = useCallback(async (e: any) => {
        if (e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        try {
            const decodedText = await QrScanner.scanImage(file);
            const parsed = OTPAuth.URI.parse(decodedText);
            const parsedURL = new URL(decodedText);

            if(onQRRead !== undefined) {
                onQRRead({ 
                    label: parsed.label,
                    key: parsedURL.searchParams.get("secret") || "",
                    issuer: parsed.issuer,
                    digits: parsed.digits,
                    algorithm: parsed.algorithm
                });
            }

        } catch (e: any) {
            alert(e.message);
        }

    }, [onQRRead]);

    useEffect(() => {
        reader.current.type = "file";
        reader.current.accept = "image/*";
        reader.current.addEventListener("change", onFilePicked);
        return () => {
            reader.current.removeEventListener("change", onFilePicked);
        }
    }, [onFilePicked]);

    return { selectFile };

}