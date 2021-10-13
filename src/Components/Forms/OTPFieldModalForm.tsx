import { Alert, AlertIcon } from "@chakra-ui/alert";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import React from "react";

interface OtpFieldModalFormProps {
    isError?: boolean;
    error?: { msg: string; param: string; };
    isLoading?: boolean;

    nameState: [string, React.Dispatch<React.SetStateAction<string>>];
    valueState: [string, React.Dispatch<React.SetStateAction<string>>];

}
export const OtpFieldModalForm: React.FC<OtpFieldModalFormProps> = ({
    isError,
    error,
    isLoading,
    nameState,
    valueState
}) => {
    return (
        <React.Fragment>
            {
                isError &&
                <Alert status="error" mb={5}>
                    <AlertIcon />
                    {error!.msg}
                </Alert>
            }

            <FormControl isRequired mb={5}>
                <FormLabel>Field Name</FormLabel>
                <Input
                    type="text"
                    placeholder="Field Name"
                    disabled={isLoading}
                    value={nameState[0]}
                    onChange={e => nameState[1](e.target.value)}
                />
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Field Value</FormLabel>
                <Input
                    type="text"
                    placeholder="Field Value"
                    disabled={isLoading}
                    value={valueState[0]}
                    onChange={e => valueState[1](e.target.value)}
                />
            </FormControl>
        </React.Fragment>
    )
}