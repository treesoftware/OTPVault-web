import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React, { useCallback, useState } from "react";
import { HiQrcode } from "react-icons/hi";
import { OtpField } from "../../@types/OtpField";
import { QrReadEvent } from "../../@types/QrReadEvent";
import { useQrReader } from "../../Hooks/qrReader";
import { OtpFieldEditor } from "../OtpFieldEditor";
import Issuers from "../../data/issuers.json";
import { useMutation } from "react-query";
import { ApiCreateOtp } from "../../Api/Otp";
import { Alert, AlertIcon } from "@chakra-ui/alert";

import { Grid, GridItem, Select } from "@chakra-ui/react";
import { useBoolean } from "@chakra-ui/hooks";
import { Stack } from "@chakra-ui/layout";
import { supportedAlgos } from "../../Util/generateAlgos";

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void
}
interface CreateOtpMutationProps {
    name: string;
    key: string;
    fields: OtpField[];
    issuer: string;
    digits: string;
    period: string;
    algorithm?: string;
}
export const CreateModal: React.FC<CreateModalProps> = ({
    isOpen,
    onClose
}) => {

    const [showKey, setShowKey] = useState(true);

    const [name, setName] = useState("");
    const [issuer, setIssuer] = useState("");
    const [secretKey, setSecretKey] = useState("");

    const [digits, setDigits] = useState("6");
    const [period, setPeriod] = useState("30");
    const [algorithm, setAlgorithm] = useState("");

    const [fields, setFields] = useState<OtpField[]>([{ name: "URL", value:"" }]);

    const [advancedSettings, setAdvancedSettings] = useBoolean();

    const { mutate, isError, error, isLoading, isSuccess } = useMutation(
        "otp-create",
        ({ name, key, fields, issuer, digits, period, algorithm }: CreateOtpMutationProps) => ApiCreateOtp(name, key, fields, issuer, digits, period, algorithm),
        {
            onSuccess() {
                handleClose();
            }
        }
    );

    const onQrRead = useCallback((e: QrReadEvent) => {
        setName(e.label);
        setSecretKey(e.key);
        setShowKey(e.key ? false : true);

        setDigits(e.digits?.toString() || "6");
        setAlgorithm(e.algorithm?.toString() || "");

        if(e.algorithm || e.digits) {
            setAdvancedSettings.on();
        }

        if(e.issuer) {
            setIssuer(e.issuer);
            const issuerIndex = Issuers.findIndex(issuer => issuer.name.toLowerCase() === e.issuer!.toLowerCase());
            if(issuerIndex > -1) {
                setFields([{
                    name: "URL",
                    value: Issuers[issuerIndex].url
                }]);
            }
        } else {
            setFields([]);
        }

    }, [setName, setSecretKey, setIssuer, setShowKey, setDigits, setAlgorithm, setAdvancedSettings]);

    const handleClose = useCallback(() => {
        if(isLoading && !isSuccess){ return; }
        setShowKey(true);
        setName("");
        setIssuer("");
        setSecretKey("");
        setDigits("6");
        setPeriod("30");
        setFields([{ name: "URL", value: ""}])
        onClose();
        setAdvancedSettings.off();
    }, [isLoading, isSuccess, setAdvancedSettings, setShowKey, setFields, setName, setIssuer, setSecretKey, setDigits, setPeriod, onClose]);

    const qrReader = useQrReader(onQrRead);

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={handleClose} 
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <form
                    action=""
                    method="POST"
                    onSubmit={e => {
                        mutate({
                            name,
                            key: secretKey,
                            fields,
                            issuer,
                            digits,
                            period,
                            algorithm
                        })
                        e.preventDefault();
                    }}
                >
                    <ModalHeader>Add One Time Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        {
                            isError && <Alert status="error" mb={5}><AlertIcon />{(error as any).msg}</Alert>
                        }

                        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                            <GridItem>
                                <FormControl id="issuer" mb={5}>
                                    <FormLabel>Password Issuer</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Issuer (Not Required)"
                                        disabled={isLoading}
                                        value={issuer}
                                        onChange={e => setIssuer(e.target.value)}
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
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>
                        </Grid>
                        <FormControl id="key" mb={5} isRequired>
                            <FormLabel>Secret Key</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showKey ? "text" : "password"}
                                    placeholder="Secret Key"
                                    value={secretKey}
                                    disabled={isLoading}
                                    onChange={e => setSecretKey(e.target.value)}
                                />
                                <InputRightElement width={secretKey === "" ? "8rem" : "4.5rem"}>
                                    <Button h="1.75rem" size="sm" onClick={() => setShowKey(!showKey)}>
                                        {showKey ? "Hide" : "Show"}
                                    </Button>
                                    {
                                        secretKey === "" &&
                                        <IconButton 
                                            ml={3}
                                            aria-label="Open QR Code"
                                            colorScheme="blue" 
                                            size="sm" 
                                            h="1.75rem" 
                                            onClick={qrReader.selectFile}
                                            icon={<HiQrcode/>}
                                        />
                                    }
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        
                        <OtpFieldEditor 
                            disabled={isLoading}
                            fields={fields} 
                            onAddField={() => {
                                setFields([...fields, { value: "", name: ""}])
                            }}
                            onFieldChange={(index, name, value) => {
                                const oldFields = [...fields];
                                oldFields[index][name] = value;
                                setFields(oldFields);
                            }}
                            onFieldRemove={i => {
                                const oldFields = [...fields];
                                oldFields.splice(i, 1);
                                setFields(oldFields);
                            }}
                        />


                        {
                            advancedSettings &&
                            <Stack mt={5}>
                                <FormControl id="digits">
                                    <FormLabel>Digits to generate</FormLabel>
                                    <Input
                                        type="number"
                                        placeholder="Digits to generate"
                                        disabled={isLoading}
                                        value={digits}
                                        onChange={e => {
                                            if(e.target.value === "" || !isNaN(parseInt(e.target.value))) {
                                                setDigits(e.target.value)}
                                            }
                                        }
                                    />
                                </FormControl>
                                <FormControl id="period">
                                    <FormLabel>Generate period (sec.)</FormLabel>
                                    <Input
                                        type="number"
                                        placeholder="Generation period in seconds"
                                        disabled={isLoading}
                                        value={period}
                                        onChange={e => {
                                            if(e.target.value === "" || !isNaN(parseInt(e.target.value))) {
                                                setPeriod(e.target.value)}
                                            }
                                        }
                                    />
                                </FormControl>
                                <FormControl id="algorithm">
                                    <FormLabel>Algorithm</FormLabel>
                                    <Select placeholder="Select an algorithm" value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
                                        {
                                            supportedAlgos.map(algo => (
                                                <option key={algo} value={algo}>{algo}</option>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Stack>
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Grid w="full" alignItems="center" templateColumns="repeat(2, 1fr)">
                            <GridItem>
                                {
                                    !advancedSettings &&
                                    <Button size="sm" mr={3} isLoading={isLoading} onClick={setAdvancedSettings.toggle}>Advanced...</Button>
                                }
                            </GridItem>
                            <GridItem d="flex" justifyContent="end">
                                <Button colorScheme="gray" mr={3} disabled={isLoading} onClick={handleClose}>Close</Button>
                                <Button type="submit" colorScheme="green" isLoading={isLoading}>Add</Button>
                            </GridItem>
                        </Grid>
                    </ModalFooter>
                </form>
            </ModalContent>

        </Modal>
    )
}