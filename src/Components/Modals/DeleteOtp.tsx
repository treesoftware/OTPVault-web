import { Button } from "@chakra-ui/button";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React from "react";
import { useMutation } from "react-query";
import {  ApiDeleteOtp } from "../../Api/Otp";

import { Grid, GridItem } from "@chakra-ui/react";
import { useHistory } from "react-router";

interface DeleteModalProps {
    id: string;
    isOpen: boolean;
    onClose: () => void
}
export const DeleteOtpModal: React.FC<DeleteModalProps> = ({
    id,
    isOpen,
    onClose
}) => {

    const history = useHistory();

    const { mutate, isError, error, isLoading } = useMutation(
        "otp-delete",
        () => ApiDeleteOtp(id),
        {
            onSuccess() {
                history.push("/codes");
            }
        }
    );
    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <form
                    action=""
                    method="POST"
                    onSubmit={e => {
                        mutate()
                        e.preventDefault();
                    }}
                >
                    <ModalHeader>Remove</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            isError &&
                            <Alert color="red">
                                <AlertIcon />
                                {(error as any).msg}
                            </Alert>
                        }
                        <p>Are you sure you would like to remove this one time password? Once your password has been deleted it cannot be recovered, this also does not disable two factor authentication on your account.</p>

                    </ModalBody>
                    <ModalFooter>
                        <Grid w="full" alignItems="center" templateColumns="repeat(2, 1fr)">
                            <GridItem>
                            </GridItem>
                            <GridItem d="flex" justifyContent="end">
                                <Button colorScheme="gray" mr={3} disabled={isLoading} onClick={onClose}>Close</Button>
                                <Button type="submit" colorScheme="red" isLoading={isLoading}>Delete</Button>
                            </GridItem>
                        </Grid>
                    </ModalFooter>
                </form>
            </ModalContent>

        </Modal>
    )
}