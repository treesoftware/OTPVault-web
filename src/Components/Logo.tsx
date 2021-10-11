import Icon from "@chakra-ui/icon";
import { Heading, Stack } from "@chakra-ui/layout";
import React from "react";
import { RiKey2Fill } from "react-icons/ri";

interface LogoProps {
    size: number;
}
export const Logo: React.FC<LogoProps> = ({
    size
}) => (
    <Stack
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
    >
        <Icon
            as={RiKey2Fill}
            width={size}
            height={size}
            color="blue.600"
        />
        <Heading
            textAlign="left"
            fontSize={size / 1.3}
            mb="1"
        >OTPVault</Heading>
    </Stack>
)