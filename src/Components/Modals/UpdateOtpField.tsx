import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { OtpField } from "../../@types/OtpField";
import { ApiUpdateOtpField } from "../../Api/OtpField";
import { QueryProvider } from "../../App";
import { decryptString } from "../../Util/decryptString";
import { OtpFieldModalForm } from "../Forms/OTPFieldModalForm";

interface UpdateOtpFieldModalProps {
    otpField: OtpField
    otpId: string;
    isOpen: boolean;
    onClose: () => void;
}
export const UpdateOtpFieldModal: React.FC<UpdateOtpFieldModalProps> = ({
    otpId,
    otpField,
    isOpen,
    onClose
}) => {
    const { mutate, isLoading, isError, error } = useMutation(
        ["update-otp-field", otpField.id], 
        ({ name, value }: { name: string, value: string }) => ApiUpdateOtpField(otpId, otpField.id!, name, value),
        {
            onSuccess() {
                QueryProvider.invalidateQueries(["single-password", otpId])
                handleClose();
            }
        });

    const nameState = useState(decryptString(otpField.name));
    const valueState = useState(decryptString(otpField.value));

    const handleClose = useCallback(() => {
        nameState[1]("");
        valueState[1]("");
        onClose();
    }, [nameState, valueState, onClose]);

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
                            name: nameState[0],
                            value: valueState[0]
                        })
                        e.preventDefault();
                    }}
                >
                    <ModalHeader>Update Field</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <OtpFieldModalForm 
                            isError={isError}
                            error={error as any}
                            isLoading={isLoading}
                            nameState={nameState}
                            valueState={valueState}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="gray" mr={3} disabled={isLoading} onClick={handleClose}>Close</Button>
                        <Button type="submit" colorScheme="green" isLoading={isLoading}>Update Field</Button>
                    </ModalFooter>
                </form>
            </ModalContent>

        </Modal>
    )
}