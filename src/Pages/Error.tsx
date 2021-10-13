import Icon from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";

export const ErrorPage: React.FC<{ message?: string }> = ({
    message
}) => (
    <Flex
        h="full"
        direction="column"
        justifyContent="center"
        alignItems="center"
    >
        <Icon 
            as={BiErrorCircle}
            fontSize={50}
            color="red.400"
        />
        <Text
            mt={5}
            fontWeight="bold"
        >{message || "An error occured, please try again."}</Text>
    </Flex>
)