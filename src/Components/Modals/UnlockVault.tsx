import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../@types/ApplicationState";
import { UnlockVault } from "../../Api/Auth";
import { setUserDecodeKey } from "../../Store/Actions/UserActions";

export const UnlockVaultModal: React.FC<{}> = () => {

    const dispatch = useDispatch();
    const user = useSelector((state: ApplicationState) => state.user.user!);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <Modal 
            isOpen={true}
            onClose={() => {}} 
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <form
                    action=""
                    method="POST"
                    onSubmit={e => {
                        setIsLoading(true);
                        setError("");
                        UnlockVault(password, user.key)
                        .then(key => {
                            dispatch(setUserDecodeKey(key));
                        })
                        .catch(e => {
                            setIsLoading(false);
                            setError(e.msg);
                        });

                        e.preventDefault();
                    }}
                >
                    <ModalHeader>Unlock Vault</ModalHeader>
                    <ModalBody>
                        {
                            error === "" ?
                            <p>Your vault is currently locked, please re-enter your password to unlock it.</p>
                            :
                            <Alert status="error">
                                <AlertIcon />
                                {error}
                            </Alert>
                        }

                        <FormControl id="password" my={5} isRequired>
                            <FormLabel>Password</FormLabel>
                                <Input
                                    type={"password"}
                                    placeholder="Password"
                                    value={password}
                                    disabled={isLoading}
                                    onChange={e => setPassword(e.target.value)}
                                />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" colorScheme="blue" isLoading={isLoading}>Unlock</Button>
                    </ModalFooter>
                </form>
            </ModalContent>

        </Modal>
    )
}