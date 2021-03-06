import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React, { useCallback, useState } from "react";
import { OtpField } from "../../@types/OtpField";
import { QrReadEvent } from "../../@types/QrReadEvent";
import { useQrReader } from "../../Hooks/qrReader";
import Issuers from "../../data/issuers.json";
import { useMutation } from "react-query";
import { ApiCreateOtp } from "../../Api/Otp";

import { Grid, GridItem } from "@chakra-ui/react";
import { useBoolean } from "@chakra-ui/hooks";
import { OTPForm } from "../Forms/OTPForm";

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

    const showKeyState = useState(true);

    const labelState = useState("");
    const issuerState = useState("");
    const secretKeyState = useState("");

    const digitsState = useState("6");
    const periodState = useState("30");
    const algorithmState = useState("");

    const fieldsState = useState<OtpField[]>([{ name: "URL", value:"" }]);

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
        labelState[1](e.label);
        secretKeyState[1](e.key);
        showKeyState[1](e.key ? false : true);

        digitsState[1](e.digits?.toString() || "6");
        algorithmState[1](e.algorithm?.toString() || "");

        if(e.algorithm || e.digits) {
            setAdvancedSettings.on();
        }

        if(e.issuer) {
            issuerState[1](e.issuer);
            const issuerIndex = Issuers.findIndex(issuer => issuer.name.toLowerCase() === e.issuer!.toLowerCase());
            if(issuerIndex > -1) {
                fieldsState[1]([{
                    name: "URL",
                    value: Issuers[issuerIndex].url
                }]);
            }
        } else {
            fieldsState[1]([]);
        }

    }, [labelState, secretKeyState, issuerState, showKeyState, digitsState, algorithmState, setAdvancedSettings, fieldsState]);

    const handleClose = useCallback(() => {
        if(isLoading && !isSuccess){ return; }
        showKeyState[1](true);
        labelState[1]("");
        issuerState[1]("");
        secretKeyState[1]("");
        digitsState[1]("6");
        periodState[1]("30");
        fieldsState[1]([{ name: "URL", value: ""}])
        onClose();
        setAdvancedSettings.off();
    }, [isLoading, isSuccess, setAdvancedSettings, showKeyState, fieldsState, labelState, issuerState, secretKeyState, digitsState, periodState, onClose]);

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
                            name: labelState[0],
                            key: secretKeyState[0],
                            fields: fieldsState[0],
                            issuer: issuerState[0],
                            digits: digitsState[0],
                            period: periodState[0],
                            algorithm: algorithmState[0]
                        })
                        e.preventDefault();
                    }}
                >
                    <ModalHeader>Add One Time Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <OTPForm 
                            hasError={isError}
                            isLoading={isLoading}
                            error={error as any}
                            showKey={showKeyState}
                            advancedSettings={advancedSettings}
                            issuer={issuerState}
                            label={labelState}
                            secretKey={secretKeyState}
                            fields={fieldsState}
                            digits={digitsState}
                            period={periodState}
                            algorithm={algorithmState}

                            selectQRFile={qrReader.selectFile}
                        />

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