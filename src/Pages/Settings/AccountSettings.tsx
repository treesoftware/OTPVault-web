import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Flex, Stack, Text } from "@chakra-ui/layout"
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../@types/ApplicationState";
import { ApiUpdateAccount } from "../../Api/Account";
import { SectionBox } from "../../Components/SectionBox";

export const AccountSettings: React.FC<{}> = () => {

    const user = useSelector((state: ApplicationState) => state.user.user!);
    const settingsBgColor = useColorModeValue("gray.200", "gray.900");

    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);

    const updateAccount = useMutation("update-account", ({ email, name }: { email: string, name?: string }) => ApiUpdateAccount(email, name));

    return (
        <Stack>
            <Text>You can update your basic account settings.</Text>
            <SectionBox title="Basic Settings">
                {
                    updateAccount.isError &&
                    <Alert status="error">
                        <AlertIcon />
                        { (updateAccount.error as any).msg }
                    </Alert>
                }
                {
                    updateAccount.isSuccess &&
                    <Alert status="success">
                        <AlertIcon />
                        Your account settings have been updated!
                    </Alert>
                }
                <form
                    action=""
                    method="POST"
                    onSubmit={e => {
                        updateAccount.mutate({ email, name });
                        e.preventDefault();
                    }}
                >
                        <FormControl isInvalid={updateAccount.isError && name !== ""} mb={5}>
                            <FormLabel>Your Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Name"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                disabled={updateAccount.isLoading}
                            />
                        </FormControl>

                        <FormControl isRequired isInvalid={updateAccount.isError} mb={5}>
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                disabled={updateAccount.isLoading}
                            />
                        </FormControl>
                        <Flex justifyContent="flex-end" bg={settingsBgColor} p={3} borderRadius={5}>
                            <Button 
                                type="submit" 
                                colorScheme="blue"
                                display="inline-block"
                                isLoading={updateAccount.isLoading}
                            >
                                Save Settings
                            </Button>
                        </Flex>
                </form>
            </SectionBox>
        </Stack>
    )

}