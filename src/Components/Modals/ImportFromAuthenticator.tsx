import { Button } from "@chakra-ui/button";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React, { useCallback, useState } from "react";
import { HiQrcode } from "react-icons/hi";
import { Box, Divider, Heading, Text } from "@chakra-ui/layout";
import { Otp } from "../../@types/Otp";
import { useAuthenticatorQRReader } from "../../Hooks/authenticatorQrReader";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useMutation } from "react-query";
import { ApiCreateMassOtp } from "../../Api/Otp";
import { QueryProvider } from "../../App";
import { Alert, AlertIcon } from "@chakra-ui/alert";

interface ImportFromAuthenticatorModalProps {
    isOpen: boolean;
    onClose: () => void
}
export const ImportFromAuthenticatorModal: React.FC<ImportFromAuthenticatorModalProps> = ({
    isOpen,
    onClose
}) => {

    const [passwordsToImport, setPasswordsToImport] = useState<Otp[]>([]);
    const onQrCodeRead = useCallback((accounts: any) => {
        const formattedAccounts = accounts.map((acc: any) => ({
            algorithm: acc.algorithm.split("ALGO_")[1],
            name: acc.name,
            key: acc.secret,
            issuer: acc.issuer,
        }));

        const newPasswords = [...passwordsToImport, ...formattedAccounts];
        setPasswordsToImport(newPasswords);

    }, [passwordsToImport, setPasswordsToImport]);
    const qrReader = useAuthenticatorQRReader(onQrCodeRead);

    const handleClose = useCallback(() => {
        setPasswordsToImport([]);
        onClose();
    }, [onClose, setPasswordsToImport]);

    const importMass = useMutation(
        "import-mass-keys", 
        (keys: any[]) => ApiCreateMassOtp(keys),
        {
            onSuccess() {
                QueryProvider.invalidateQueries("my-passwords");
                handleClose();
            }
        }
    )

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                    <ModalHeader>Import from Authenticator</ModalHeader>
                    <ModalCloseButton disabled={importMass.isLoading || qrReader.isLoading}/>
                    <ModalBody>

                        {
                            importMass.isError &&
                            <Alert status="error">
                                <AlertIcon />
                                {(importMass.error as any).msg}
                            </Alert>
                        }

                        <Text mb={3}>Import your codes from your existing Google Authenticator app, attach all your export QR Codes and begin the import.</Text>
                        <Button 
                            colorScheme="blue" 
                            leftIcon={<HiQrcode />} 
                            onClick={qrReader.selectFile}
                            isLoading={qrReader.isLoading}
                            disabled={importMass.isLoading}
                        >Read { passwordsToImport.length > 0 ? "Another ": "" }QR Code</Button>

                        {
                            passwordsToImport.length > 0 &&
                            <Box mt={5}>
                                <Divider />
                                <Heading size="sm" my={5}>Passwords to be imported</Heading>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Issuer</Th>
                                            <Th>Label</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            passwordsToImport.map((pwd: any, index) => (
                                                <Tr key={`import-password-${index}`}>
                                                    <Td>{pwd.issuer || ""}</Td>
                                                    <Td>{pwd.name}</Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </Box>
                        }

                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            colorScheme="gray" 
                            mr={3} 
                            disabled={qrReader.isLoading || importMass.isLoading} 
                            onClick={handleClose}
                        >Cancel</Button>
                        <Button 
                            colorScheme="green" 
                            disabled={passwordsToImport.length < 1 || qrReader.isLoading}
                            isLoading={importMass.isLoading}
                            onClick={() => importMass.mutate(passwordsToImport)}
                        >Import</Button>
                    </ModalFooter>
            </ModalContent>

        </Modal>
    )
}