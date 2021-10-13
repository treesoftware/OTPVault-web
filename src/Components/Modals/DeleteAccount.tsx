import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React from "react";

import { Grid, GridItem } from "@chakra-ui/react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}
export const DeleteAccountModal: React.FC<DeleteModalProps> = ({
    onConfirm,
    isOpen,
    onClose
}) => {

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                    <ModalHeader>Are you sure?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Are you sure you would like to delete your account? <b>ALL</b> your data will be removed and cannot be recovered once you confirm - this action does not turn off two factor authentication on your accounts. If you understand and wish to continue please click the button below.</p>

                        <p>We're sorry to see you go!</p>
                    </ModalBody>
                    <ModalFooter>
                        <Grid w="full" alignItems="center" templateColumns="repeat(2, 1fr)">
                            <GridItem>
                            </GridItem>
                            <GridItem d="flex" justifyContent="end">
                                <Button colorScheme="gray" mr={3} onClick={onClose}>Close</Button>
                                <Button colorScheme="red" onClick={onConfirm}>Delete Account</Button>
                            </GridItem>
                        </Grid>
                    </ModalFooter>
            </ModalContent>

        </Modal>
    )
}