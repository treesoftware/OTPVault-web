import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Grid, GridItem, Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React from "react";
import { HiQrcode } from "react-icons/hi";
import { OtpField } from "../../@types/OtpField";
import { supportedAlgos } from "../../Util/generateAlgos";
import { OtpFieldEditor } from "../OtpFieldEditor";

interface OTPFormProps {
    hasError?: boolean;
    isLoading?: boolean;
    error?: { msg: string; param: string; };
    showKey: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    advancedSettings: boolean;

    issuer: [string, React.Dispatch<React.SetStateAction<string>>];
    label: [string, React.Dispatch<React.SetStateAction<string>>];
    secretKey: [string, React.Dispatch<React.SetStateAction<string>>];
    fields?: [OtpField[], React.Dispatch<React.SetStateAction<OtpField[]>>];

    digits: [string, React.Dispatch<React.SetStateAction<string>>];
    period: [string, React.Dispatch<React.SetStateAction<string>>];
    algorithm: [string, React.Dispatch<React.SetStateAction<string>>];

    selectQRFile?: () => void;
}
export const OTPForm: React.FC<OTPFormProps> = ({
    hasError,
    error,
    isLoading,
    advancedSettings,
    selectQRFile,

    issuer,
    label,
    secretKey,
    showKey,

    fields,
    digits,
    period,
    algorithm

}) => (
    <React.Fragment>
        {
            hasError && <Alert status="error" mb={5}><AlertIcon />{error!.msg}</Alert>
        }

        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
            <GridItem>
                <FormControl id="issuer" mb={5}>
                    <FormLabel>Password Issuer</FormLabel>
                    <Input
                        type="text"
                        placeholder="Issuer (Not Required)"
                        disabled={isLoading}
                        value={issuer[0]}
                        onChange={e => issuer[1](e.target.value)}
                    />
                </FormControl>
            </GridItem>
            <GridItem>
                <FormControl id="name" isRequired mb={5}>
                    <FormLabel>Password Label</FormLabel>
                    <Input
                        type="text"
                        placeholder="Password Label"
                        disabled={isLoading}
                        value={label[0]}
                        onChange={e => label[1](e.target.value)}
                    />
                </FormControl>
            </GridItem>
        </Grid>

        <FormControl id="key" mb={5} isRequired>
            <FormLabel>Secret Key</FormLabel>
            <InputGroup>
                <Input
                    type={showKey[0] ? "text" : "password"}
                    placeholder="Secret Key"
                    value={secretKey[0]}
                    disabled={isLoading}
                    onChange={e => secretKey[1](e.target.value)}
                />
                <InputRightElement width={secretKey[0] === "" ? "8rem" : "4.5rem"}>
                    <Button h="1.75rem" size="sm" onClick={() => showKey[1](!showKey[0])}>
                        {showKey[0] ? "Hide" : "Show"}
                    </Button>
                    {
                        secretKey[0] === "" && selectQRFile !== undefined &&
                        <IconButton
                            ml={3}
                            aria-label="Open QR Code"
                            colorScheme="blue"
                            size="sm"
                            h="1.75rem"
                            onClick={selectQRFile}
                            icon={<HiQrcode />}
                        />
                    }
                </InputRightElement>
            </InputGroup>
        </FormControl>


        {
            fields &&
            <OtpFieldEditor
                disabled={isLoading}
                fields={fields[0]}
                onAddField={() => {
                    fields[1]([...fields[0], { value: "", name: "" }])
                }}
                onFieldChange={(index, name, value) => {
                    const oldFields = [...fields[0]];
                    oldFields[index][name] = value;
                    fields[1](oldFields);
                }}
                onFieldRemove={i => {
                    const oldFields = [...fields[0]];
                    oldFields.splice(i, 1);
                    fields[1](oldFields);
                }}
            />
        }


        {
            advancedSettings &&
            <Stack mt={5}>
                <FormControl id="digits">
                    <FormLabel>Digits to generate</FormLabel>
                    <Input
                        type="number"
                        placeholder="Digits to generate"
                        disabled={isLoading}
                        value={digits[0]}
                        onChange={e => {
                            if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
                                digits[1](e.target.value)
                            }
                        }}
                    />
                </FormControl>
                <FormControl id="period">
                    <FormLabel>Generate period (sec.)</FormLabel>
                    <Input
                        type="number"
                        placeholder="Generation period in seconds"
                        disabled={isLoading}
                        value={period[0]}
                        onChange={e => {
                            if (e.target.value === "" || !isNaN(parseInt(e.target.value))) {
                                period[1](e.target.value)
                            }
                        }}
                    />
                </FormControl>
                <FormControl id="algorithm">
                    <FormLabel>Algorithm</FormLabel>
                    <Select placeholder="Select an algorithm" value={algorithm[0]} onChange={e => algorithm[1](e.target.value)}>
                        {
                            supportedAlgos.map(algo => (
                                <option key={algo} value={algo}>{algo}</option>
                            ))
                        }
                    </Select>
                </FormControl>
            </Stack>
        }
    </React.Fragment>
)