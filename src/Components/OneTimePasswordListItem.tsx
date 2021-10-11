import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Otp } from "../@types/Otp";
import { AiFillCopy, AiOutlineEdit } from 'react-icons/ai';
import { decryptString } from "../Util/decryptString";
import { IconButton } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { useToast } from "@chakra-ui/toast";

import * as OTPAuth from 'otpauth';

interface OneTimePasswordListItemProps {
    otp: Otp;
    hidden?: boolean;
}
export const OneTimePasswordListItem: React.FC<OneTimePasswordListItemProps> = ({
    otp,
    hidden
}) => {

    const bgColor = useColorModeValue("gray.100", "gray.700");

    const OTPRef = useRef(new OTPAuth.TOTP({
        secret: decryptString(otp.key),
        digits: otp.digits ? parseInt(decryptString(otp.digits)) : 6,
        period: otp.period ? parseInt(decryptString(otp.period)) : 30,
        algorithm: otp.algorithm ? decryptString(otp.algorithm) : "SHA1"
    }));

    const [code, setCode] = useState(OTPRef.current.generate());
    const [progress, setProgress] = useState(0);
    const toast = useToast();

    const timer = useRef<number>();

    const onCopyCode = useCallback(async () => {

        await navigator.clipboard.writeText(code);

        toast({
            title: "Code Copied",
            description: "The code has been copied to your clipboard",
            status: "success",
            duration: 2500,
            isClosable: true
        });
        

    }, [toast]);

    const tick = useCallback(() => {
        const prog = (100 * (1 - (((0.001 * Date.now()) / OTPRef.current.period) % 1))) | 0;
        if(prog !== progress) {
            if(prog < progress) {
                setCode(OTPRef.current.generate());
            }
            setProgress(prog);
        }

        timer.current = requestAnimationFrame(tick);

    }, [progress, setProgress, setCode]);

    useEffect(() => {
        tick();
        return () => {
            if(timer.current) {
                cancelAnimationFrame(timer.current);
            }
        }
    }, [tick]);
    
    return (
        <Stack
            bg={bgColor}
            borderRadius={5}
            overflow="hidden"
            shadow="sm"
        >
            <Flex 
                p={5} 
                alignItems="center"
                flexWrap={{
                    base: "wrap",
                    md: "nowrap"
                }}
            >
                <Tooltip label="Click to copy code">
                    <Stack
                        flexGrow={1}
                        cursor="pointer"
                        onClick={onCopyCode}
                    >
                        {
                            otp.issuer &&
                            <Text 
                                fontSize="sm" 
                                mb={-2} 
                                fontWeight="bold" 
                                opacity={.8} 
                                userSelect="none"
                                isTruncated
                            >{decryptString(otp.issuer)}</Text>
                        }
                        <Text isTruncated fontSize="lg" opacity={.8} userSelect="none">{decryptString(otp.name)}</Text>
                        <Flex alignItems="center">
                            <Text 
                                fontSize="3xl" 
                                isTruncated 
                                fontWeight="bold"
                            >
                                {
                                    hidden ? "*** ***" :
                                    
                                    code.length > 6 ? code : `${code.substr(0, 3)} ${code.substr(3)}`
                                }
                            </Text>
                            <Icon
                                as={AiFillCopy}
                                ml={2}
                                opacity={.5}
                            />
                        </Flex>
                    </Stack>
                </Tooltip>
                <Stack 
                    width={{ base: "full", md: "auto" }} 
                    direction={{ base: "row", md: "column" }}
                    mt={{ base: 2, md: 0 }}
                >
                    <IconButton
                        size="sm"
                        aria-label={`Edit ${decryptString(otp.name)}`}
                        icon={<AiOutlineEdit size={25} />}
                        cursor="pointer"
                    />
                </Stack>
            </Flex>
            <Progress
                value={progress}
                size="xs"
                colorScheme="gray"
                isAnimated
            />
        </Stack>
    )

}