import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Stack } from "@chakra-ui/layout"
import { useState } from "react";
import { useMutation } from "react-query";
import { ApiUpdatePassword } from "../../Api/Account";
import { SectionBox } from "../../Components/SectionBox";

export const UpdatePasswordSettings: React.FC<{}> = () => {

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmPassword] = useState("");
    const settingsBgColor = useColorModeValue("gray.200", "gray.900");
    const updatePassword = useMutation("update-password", ({ password, newPass, confNewPass }: { password: string; newPass: string; confNewPass: string }) => ApiUpdatePassword(password, newPass, confNewPass));

    return (
        <Stack>
            <SectionBox title="Delete your account">
                {
                    updatePassword.isError ?
                    <Alert status="error">
                        <AlertIcon />
                        { (updatePassword.error as any).msg }
                    </Alert>
                    :
                    <p>Here you can update your password. When you change your password your existing key will be decrypted then re-encrypted with your new password.</p>
                }
                <form
                    action=""
                    method="POST"
                    onSubmit={e => {
                        updatePassword.mutate({
                            password,
                            newPass: newPassword,
                            confNewPass: confirmNewPassword
                        });
                        e.preventDefault();
                    }}
                >
                        <FormControl isRequired isInvalid={updatePassword.isError} mb={5}>
                            <FormLabel>Your Current Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                disabled={updatePassword.isLoading}
                            />
                        </FormControl>
                        <FormControl isRequired isInvalid={updatePassword.isError} mb={5}>
                            <FormLabel>Create a new password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={e => setNewPassword(e.target.value)}
                                value={newPassword}
                                disabled={updatePassword.isLoading}
                            />
                        </FormControl>
                        <FormControl isRequired isInvalid={updatePassword.isError} mb={5}>
                            <FormLabel>Confirm new password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={e => setConfirmPassword(e.target.value)}
                                value={confirmNewPassword}
                                disabled={updatePassword.isLoading}
                            />
                        </FormControl>
                        
                        <Flex justifyContent="flex-end" bg={settingsBgColor} p={3} borderRadius={5}>
                            <Button 
                                type="submit" 
                                colorScheme="blue"
                                display="inline-block"
                                isLoading={updatePassword.isLoading}
                            >
                                Update Password
                            </Button>
                        </Flex>
                </form>
            </SectionBox>

        </Stack>
    )

}