import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/progress";
import React, { useCallback } from "react";
import { Otp } from "../@types/Otp";
import { AiFillCopy } from 'react-icons/ai';
import { decryptString } from "../Util/decryptString";
import { Tooltip } from "@chakra-ui/tooltip";
import { useToast } from "@chakra-ui/toast";

import { useHistory } from "react-router";
import { useGetOTP } from "../Hooks/getOTP";
import { useClipboard } from "@chakra-ui/hooks";

interface OneTimePasswordListItemProps {
    otp: Otp;
    hidden?: boolean;
}
export const OneTimePasswordListItem: React.FC<OneTimePasswordListItemProps> = ({
    otp,
    hidden
}) => {

    const bgColor = useColorModeValue("gray.100", "gray.700");
    const history = useHistory();

    const {code, progress} = useGetOTP(
        decryptString(otp.key), 
        otp.digits ? decryptString(otp.digits) : undefined, 
        otp.period ? decryptString(otp.period) : undefined, 
        otp.algorithm ? decryptString(otp.algorithm) : undefined, 
    )

    const toast = useToast();
    const copyCode = useClipboard(code);

    const onCopyCode = useCallback(async () => {

        copyCode.onCopy();

        toast({
            title: "Code Copied",
            description: "The code has been copied to your clipboard",
            status: "success",
            duration: 2500,
            isClosable: true
        });


    }, [copyCode, toast]);



    return (
        <Stack
            bg={bgColor}
            borderRadius={5}
            overflow="hidden"
            cursor="pointer"
            onClick={() => {
                history.push(`/codes/${otp.id}`)
            }}
        >
            <Stack
                flexGrow={1}
                p={5}
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
                    <Tooltip label="Click to copy code">
                        <Text
                            fontSize="3xl"
                            isTruncated
                            fontWeight="bold"
                            cursor="pointer" onClick={onCopyCode}
                        >
                            {
                                hidden ? "*** ***" :

                                    code.length > 6 ? code : `${code.substr(0, 3)} ${code.substr(3)}`
                            }
                        </Text>
                    </Tooltip>
                    <Icon
                        as={AiFillCopy}
                        ml={2}
                        opacity={.5}
                    />
                </Flex>
            </Stack>
            <Progress
                value={progress}
                size="xs"
                colorScheme="gray"
                isAnimated
            />
        </Stack>
    )

}