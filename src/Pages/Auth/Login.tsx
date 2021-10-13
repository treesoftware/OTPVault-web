import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Grid, GridItem } from "@chakra-ui/layout";
import { HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import Icon from "@chakra-ui/icon";
import { Button } from "@chakra-ui/button";
import { useMutation } from "react-query";
import { ApiLogin, UnlockVault } from "../../Api/Auth";
import { Stack } from "../../Components/Stack";
import { AuthLayout } from "../../Components/AuthLayout";
import { Link } from "react-router-dom";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useDispatch } from "react-redux";
import { setLoggedInAccount } from "../../Store/Actions/UserActions";

export const Login: React.FC<{}> = () => {

    const dispatch = useDispatch();

    const {
        mutate,
        isLoading,
        isError,
        error
    } = useMutation(
        "user-login", 
        ({ email, password }: { email: string, password: string }) => ApiLogin(email, password),
        {
            onSuccess(data, params) {
                UnlockVault(params.password, data.user.key)
                .then(key => {
                    dispatch(setLoggedInAccount(data.user, key));
                });
            }
        });

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signUpSuccess = (window as any)._sign_up_success;

    useEffect(() => {
        if((window as any)._sign_up_success) {
            (window as any)._sign_up_success = undefined;
        }
        document.title = "OTPVault | Login";
    }, []);

    return (
        <AuthLayout
            isError={isError}
            error={error}
        >
            { !isError && signUpSuccess && 
                <Alert status="success" borderRadius={5} mb={5}>
                    <AlertIcon />
                    Your account has been created successfully, you can now sign in!
                </Alert>
            }

            <form
                action=""
                method="POST"
                onSubmit={e => {
                    mutate({ email, password });
                    e.preventDefault();
                }}
            >
                <Stack
                    spacing={5}
                    padding="1rem"
                    borderRadius={5}
                >
                    <FormControl isInvalid={isError}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Icon as={HiOutlineMail} color="gray.600" />}
                            />
                            <Input
                                type="email"
                                placeholder="Email Address"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                disabled={isLoading}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl isInvalid={isError}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Icon as={HiOutlineLockClosed} color="gray.600" />}
                            />
                            <Input
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                disabled={isLoading}
                            />
                        </InputGroup>
                    </FormControl>

                    <Grid
                        templateColumns="repeat(2, 1fr)"
                        gap={10}
                    >
                        <GridItem>
                            <Button
                                type="submit"
                                display="block"
                                w="full"
                                colorScheme="blue"
                                isLoading={isLoading}
                            >
                                Login
                            </Button>
                        </GridItem>

                        <GridItem>
                            <Button
                                as={Link}
                                to="/signup"
                                display="inline-flex"
                                w="full"
                                disabled={isLoading}
                            >
                                Create Account
                            </Button>
                        </GridItem>
                    </Grid>
                </Stack>
            </form>
        </AuthLayout>
    )

}