import * as OTPAuth from 'otpauth';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useGetOTP = (key: string, digits?: string, period?: string, algorithm?: string) => {

    let nmb = digits && !isNaN(parseInt(digits)) ? parseInt(digits) : 6;
    let time = period && !isNaN(parseInt(period)) ? parseInt(period) : 30;
    
    const OTPRef = useRef(new OTPAuth.TOTP({
        secret: key,
        digits: nmb,
        period: time,
        algorithm: algorithm ? algorithm : "SHA1"
    }));

    const timer = useRef<number>();
    const [progress, setProgress] = useState(0);
    const [code, setCode] = useState(OTPRef.current.generate());

    const tick = useCallback(() => {
        const prog = (100 * (1 - (((0.001 * Date.now()) / OTPRef.current.period) % 1))) | 0;
        if (prog !== progress) {
            if (prog < progress) {
                setCode(OTPRef.current.generate());
            }
            setProgress(prog);
        }

        timer.current = requestAnimationFrame(tick);

    }, [progress, setProgress, setCode]);

    useEffect(() => {
        tick();
        return () => {
            if (timer.current) {
                cancelAnimationFrame(timer.current);
            }
        }
    }, [tick]);

    return { code, progress };

};