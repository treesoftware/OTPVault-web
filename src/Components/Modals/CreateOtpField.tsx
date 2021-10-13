import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React, { useCallback, useState } from "react";
import { useMutation } from "react-query";
import { ApiCreateOtpField } from "../../Api/OtpField";
import { QueryProvider } from "../../App";
import { OtpFieldModalForm } from "../Forms/OTPFieldModalForm";

interface CreateOtpFieldModalProps {
    otpId: string;
    isOpen: boolean;
    onClose: () => void;
}
export const CreateOtpFieldModal: React.FC<CreateOtpFieldModalProps> = ({
    otpId,
    isOpen,
    onClose
}) => {
    const { mutate, isLoading, isError, error } = useMutation(
        ["create-otp-field", otpId], 
        ({ name, value }: { name: string, value: string }) => ApiCreateOtpField(otpId, name, value),
        {
            onSuccess() {
                QueryProvider.invalidateQueries(["single-password", otpId])
                handleClose();
            }
        });

    const nameState = useState("");
    const valueState = useState("");

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
                    <ModalHeader>Add Field</ModalHeader>
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
                        <Button type="submit" colorScheme="green" isLoading={isLoading}>Add Field</Button>
                    </ModalFooter>
                </form>
            </ModalContent>

        </Modal>
    )
}