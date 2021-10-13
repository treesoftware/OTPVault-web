import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useBoolean } from "@chakra-ui/hooks";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { BsTrash2Fill, BsPencil } from "react-icons/bs";

interface SectionFieldProps {
    title: string;
    value: string;
    onClick?: () => void;
    onDelete?: () => void;
    onEdit?: () => void;
}
export const SectionField: React.FC<SectionFieldProps> = ({
    title,
    value,
    onDelete,
    onEdit,
    onClick
}) => {
    const titleColor = useColorModeValue("gray.600", "gray.400");
    const [mouseOver, setMouseOver] = useBoolean(false);
    return (
        <Flex
            p={1}
            onMouseEnter={() => setMouseOver.on()}
            onMouseLeave={() => setMouseOver.off()}
            alignItems="center"
        >
            <Text 
                d="block"
                color={titleColor} 
                border={0} 
                w="50%"
            >{title}</Text>
            <Text 
                d="block"
                w="50%"
                cursor={onClick ? "pointer" : undefined}
                onClick={onClick}
                _hover={{ textDecoration: onClick ? "underline" : undefined }} 
                border={0}
            >{value}</Text>
            <Stack direction="row">
                {
                    onEdit !== undefined &&
                    <IconButton 
                        aria-label="Edit field"
                        icon={<BsPencil />}
                        size="sm"
                        colorScheme="blue"
                        onClick={onEdit}
                        visibility={mouseOver ? "visible" : "hidden"}
                    />
                }
                {
                    onDelete !== undefined &&
                    <IconButton 
                        aria-label="Delete field"
                        icon={<BsTrash2Fill />}
                        size="sm"
                        colorScheme="red"
                        onClick={onDelete}
                        visibility={mouseOver ? "visible" : "hidden"}
                    />
                }
            </Stack>
        </Flex>
    )
}