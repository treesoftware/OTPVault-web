import { CircularProgress, Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/layout"
import { useClipboard } from "@chakra-ui/hooks"
import { useToast } from "@chakra-ui/toast"
import { Icon } from "@chakra-ui/icon"
import { Tooltip } from "@chakra-ui/tooltip"
import { useColorModeValue } from "@chakra-ui/color-mode"
import { Otp } from "../@types/Otp"
import { useGetOTP } from "../Hooks/getOTP"
import { decryptString } from "../Util/decryptString"
import { AiFillCopy } from "react-icons/ai"

export const SingleOTPCode: React.FC<{ otp: Otp }> = ({
    otp
}) => {
    const trackColor = useColorModeValue("gray.300", "gray.900");

    const {code, progress} = useGetOTP(
        decryptString(otp.key), 
        otp.digits ? decryptString(otp.digits) : undefined, 
        otp.period ? decryptString(otp.period) : undefined, 
        otp.algorithm ? decryptString(otp.algorithm) : undefined, 
    );
    const clipboard = useClipboard(code);
    const toast = useToast();

    return (
        <Tooltip label="Click to copy code">
            <Flex 
                cursor="pointer"
                py={3}
                borderRadius={5}
                alignItems="center"
                onClick={() => {

                    toast({
                        title: "Code Copied",
                        description: "The code has been copied to your clipboard",
                        status: "success",
                        duration: 2500,
                        isClosable: true
                    });
                    clipboard.onCopy();
                }}
            >
                
                <CircularProgress 
                    value={progress}
                    mr={3}
                    trackColor={trackColor}
                    thickness="90px"
                    size={"30px"}
                    borderRadius="50%"
                    overflow="hidden"
                />
                <Text fontSize="xx-large" fontWeight="bold">{
                    code.length > 6 ? code : `${code.substr(0, 3)} ${code.substr(3)}`
                }</Text>
                <Icon 
                    as={AiFillCopy}
                    ml={2}
                />
            </Flex>
        </Tooltip>
    )

}