import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Box, Container, Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { ColorSwitcher } from "./ColorSwitcher";
import { Logo } from "./Logo";

export const AuthLayout: React.FC<{ isError: boolean; error: any; }> = ({
    isError,
    error,
    children
}) => (
    <Container
        minH="100vh"
        w="100%"
    >
        <ColorSwitcher authPage/>
        <Flex
            h="100vh"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
        >
            <Logo size={54} />
            <Text mb="5" color="gray.600">
                Login to your vault or create an account
            </Text>

            <Box width={{ base: "85%", md: "469px" }}>

                {isError &&
                    <Alert status="error" borderRadius="5px" mb={5}>
                        <AlertIcon /> {error.msg}
                    </Alert>}

                {children}
            </Box>

            <Text
                color="gray.400"
                fontSize="sm"
                mt="5"
                fontWeight="medium"
            >&copy; {(new Date()).getFullYear()} OTPVault</Text>
        </Flex>
    </Container>
);