import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/layout";
import React from "react";
import { OtpField } from "../@types/OtpField";
import { BsTrash2Fill } from 'react-icons/bs';

interface OtpFieldEditorProps {
    fields: OtpField[];
    disabled?: boolean;
    onFieldChange?: (index: number, name: "name" | "value", value: string) => void;
    onFieldRemove?: (index: number) => void;
    onAddField?: () => void;
}
export const OtpFieldEditor: React.FC<OtpFieldEditorProps> = ({
    fields,
    onFieldChange,
    onFieldRemove,
    disabled,
    onAddField
}) => {
    const boxColor = useColorModeValue("gray.100", "gray.800");
    const inputColor = useColorModeValue("white", "gray.900");
    return (
        <Box
            bgColor={boxColor}
            p={5}
            borderRadius={5}
        >
            <Heading size="sm" mb={5}>Custom Fields</Heading>

            {
                fields.map((field, index) => (
                    <Grid
                        key={`field-${index}`}
                        templateColumns={onFieldRemove === undefined ? "repeat(2, 1fr)" : "1fr 1fr 40px"}
                        alignItems="end"
                        gap={5}
                        mb={5}
                    >
                        <GridItem>
                            <FormControl
                                id={`field-${index}-name`}
                            >
                                <FormLabel size="sm">Field Name</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Field Name"
                                    bg={inputColor}
                                    disabled={disabled}
                                    value={field.name}
                                    readOnly={onFieldChange === undefined}
                                    onChange={e => onFieldChange && onFieldChange(index, "name", e.target.value)}
                                />
                            </FormControl>
                        </GridItem>
                        <GridItem>
                            <FormControl
                                id={`field-${index}-value`}
                            >
                                <FormLabel size="sm">Field Value</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Field Value"
                                    bg={inputColor}
                                    disabled={disabled}
                                    value={field.value}
                                    readOnly={onFieldChange === undefined}
                                    onChange={e => onFieldChange && onFieldChange(index, "value", e.target.value)}
                                />
                            </FormControl>
                        </GridItem>
                        {
                            onFieldRemove && 
                            <GridItem>
                                <IconButton 
                                    aria-label="Remove field"
                                    disabled={disabled}
                                    icon={<BsTrash2Fill />}
                                    colorScheme="red" 
                                    onClick={e => onFieldRemove && onFieldRemove(index)}
                                />
                            </GridItem>
                        }
                    </Grid>
                ))
            }

            {
                onAddField && <Button 
                    type="button" 
                    colorScheme="blue" 
                    onClick={onAddField}
                    size="sm"
                    display="block"
                    disabled={disabled}
                    w="full">Add Field</Button>
            }
        </Box>
    )
}