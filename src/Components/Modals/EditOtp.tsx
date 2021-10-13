import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { ApiUpdateOtp } from "../../Api/Otp";

import { Grid, GridItem } from "@chakra-ui/react";
import { OTPForm } from "../Forms/OTPForm";
import { Otp } from "../../@types/Otp";
import { decryptString } from "../../Util/decryptString";

interface EditModalProps {
    otp: Otp;
    isOpen: boolean;
    onClose: () => void
}
interface EditOtpMutationProps {
    name: string;
    key: string;
    issuer: string;
    digits: string;
    period: string;
    algorithm?: string;
}
export const EditOtpModal: React.FC<EditModalProps> = ({
    otp,
    isOpen,
    onClose
}) => {

    const showKeyState = useState(false);

    const labelState = useState(decryptString(otp.name));
    const issuerState = useState(otp.issuer ? decryptString(otp.issuer) : "");
    const secretKeyState = useState(decryptString(otp.key));

    const digitsState = useState(otp.digits ? decryptString(otp.digits) : "6");
    const periodState = useState(otp.period ? decryptString(otp.period) : "30");
    const algorithmState = useState(otp.algorithm ? decryptString(otp.algorithm) : "");

    const { mutate, isError, error, isLoading, isSuccess } = useMutation(
        ["otp-edit", otp.id],
        ({ name, key, issuer, digits, period, algorithm }: EditOtpMutationProps) => ApiUpdateOtp(otp.id, name, key, issuer, digits, period, algorithm),
        {
            onSuccess() {
                handleClose();
            }
        }
    );


    const handleClose = useCallback(() => {
        if(isLoading && !isSuccess){ return; }
        showKeyState[1](true);
        labelState[1]("");
        issuerState[1]("");
        secretKeyState[1]("");
        digitsState[1]("6");
        periodState[1]("30");
        onClose();
    }, [isLoading, isSuccess, showKeyState, labelState, issuerState, secretKeyState, digitsState, periodState, onClose]);


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
                            advancedSettings={true}
                            issuer={issuerState}
                            label={labelState}
                            secretKey={secretKeyState}
                            digits={digitsState}
                            period={periodState}
                            algorithm={algorithmState}

                        />

                    </ModalBody>
                    <ModalFooter>
                        <Grid w="full" alignItems="center" templateColumns="repeat(2, 1fr)">
                            <GridItem>
                            </GridItem>
                            <GridItem d="flex" justifyContent="end">
                                <Button colorScheme="gray" mr={3} disabled={isLoading} onClick={handleClose}>Close</Button>
                                <Button type="submit" colorScheme="green" isLoading={isLoading}>Save</Button>
                            </GridItem>
                        </Grid>
                    </ModalFooter>
                </form>
            </ModalContent>

        </Modal>
    )
}