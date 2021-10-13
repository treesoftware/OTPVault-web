import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Flex, Stack } from "@chakra-ui/layout"
import { useState } from "react";
import { useMutation } from "react-query";
import { ApiDeleteAccount } from "../../Api/Account";
import { DeleteAccountModal } from "../../Components/Modals/DeleteAccount";
import { SectionBox } from "../../Components/SectionBox";

export const DangerZoneSettings: React.FC<{}> = () => {

    const [password, setPassword] = useState("");
    const settingsBgColor = useColorModeValue("gray.200", "gray.900");
    const deleteAccount = useMutation("delete-account", ({ password }: { password: string }) => ApiDeleteAccount(password));
    const deleteConfirm = useDisclosure();

    return (
        <Stack>
            <SectionBox title="Delete your account">
                {
                    deleteAccount.isError ?
                    <Alert status="error">
                        <AlertIcon />
                        { (deleteAccount.error as any).msg }
                    </Alert>
                    :
                    <p>Here you can delete your account, once you submit the form your account and all data we store related to it (including encrypted passwords and fields) are removed immediately. This action cannot be reversed!</p>
                }
                <form
                    action=""
                    method="POST"
                    onSubmit={e => {
                        deleteConfirm.onOpen();
                        e.preventDefault();
                    }}
                >
                        <FormControl isRequired isInvalid={deleteAccount.isError} mb={5}>
                            <FormLabel>Your Current Password</FormLabel>
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                disabled={deleteAccount.isLoading}
                            />
                        </FormControl>
                        
                        <Flex justifyContent="flex-end" bg={settingsBgColor} p={3} borderRadius={5}>
                            <Button 
                                type="submit" 
                                colorScheme="red"
                                display="inline-block"
                                isLoading={deleteAccount.isLoading}
                            >
                                Delete Account
                            </Button>
                        </Flex>
                </form>
            </SectionBox>

            <DeleteAccountModal 
                onConfirm={() => deleteAccount.mutate({ password }) }
                onClose={deleteConfirm.onClose}
                isOpen={deleteConfirm.isOpen}
            />
        </Stack>
    )

}