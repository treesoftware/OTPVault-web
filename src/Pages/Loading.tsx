import { Flex, Text} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";

export const LoadingPage: React.FC<{ message?: string }> = ({ message }) => (
    <Flex
        h="full"
        direction="column"
        justifyContent="center"
        alignItems="center"
    >
        <Spinner size="xl" />
        {
            message &&
            <Text
                mt={5}
                fontWeight="bold"
            >{message}</Text>
        }
    </Flex>
)