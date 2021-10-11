import { useColorModeValue } from "@chakra-ui/color-mode";
import { StackProps, Stack as ChakStack } from "@chakra-ui/layout";
import React from "react";

export const Stack: React.FC<StackProps> = (props) => {
    const stackColor = useColorModeValue("white", "gray.700");
    const borderColor = useColorModeValue("gray.100", "gray.700");
    return <ChakStack 
            bgColor={stackColor} 
            borderColor={borderColor}
            borderWidth={1}
            {...props}>{props.children}</ChakStack>
}