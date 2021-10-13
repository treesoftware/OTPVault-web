import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import React from "react";

export const SectionBox: React.FC<{ title: string; }> = ({
    title,
    children
}) => {
    const borderColor = useColorModeValue("gray.200", "gray.700");
    const titleBgColor = useColorModeValue("white", "gray.800");
    return (
        <Box mt={-5}>
            <Heading
                size="sm"
                fontWeight="normal"
                bg={titleBgColor}
                display="inline-block"
                position="relative"
                top={5}
                left={3}
                px={2}
            >{title}</Heading>
            <Stack
                borderColor={borderColor}
                borderRadius={5}
                borderWidth={1}
                p={4}
                pt={6}
                mt={2}
            >
                {
                    children
                }
            </Stack>
        </Box>
    )
}