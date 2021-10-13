import { useCallback, useEffect, useRef, useState } from "react";
import QrScanner from 'qr-scanner';
import { parseAuthenticator } from "../Util/parseAuthenticator";

export const useAuthenticatorQRReader = (onQRRead?: (url: string) => void) => {

    const reader = useRef<HTMLInputElement>();
    const [isLoading, setIsLoading] = useState(false);

    const selectFile = useCallback(() => {
        reader.current?.click();
    }, []);


    const onFilePicked = useCallback(async (e: any) => {
        if (e.target.files.length === 0) {
            return;
        }
        setIsLoading(true);
        const file = e.target.files[0];
        try {
            const decodedText = await QrScanner.scanImage(file);
            const queryParams = new URL(decodedText).search;
            const data = new URLSearchParams(queryParams).get("data");
            
            if(data) {
                const accounts = await parseAuthenticator(data);
                if(onQRRead) 
                    onQRRead(accounts);

            }
            setIsLoading(false);
        } catch (e: any) {
            setIsLoading(false);
            console.log(e);
        }

    }, [onQRRead, setIsLoading]);


    useEffect(() => {
        reader.current = document.createElement("input");
        reader.current.type = "file";
        reader.current.accept = "image/*";
        reader.current.addEventListener("change", onFilePicked);
        
    }, [onFilePicked]);

    return { selectFile, isLoading };

}