import { FormControl } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Grid, GridItem } from "@chakra-ui/layout";
import { HiOutlineMail, HiOutlineLockClosed, HiUser } from 'react-icons/hi';
import React, { useState } from "react";
import Icon from "@chakra-ui/icon";
import { Button } from "@chakra-ui/button";
import { useMutation } from "react-query";
import { ApiSignUp } from "../../Api/Auth";
import { Stack } from "../../Components/Stack";
import { AuthLayout } from "../../Components/AuthLayout";
import { Link, useHistory } from "react-router-dom";

export const SignUp: React.FC<{}> = () => {

    const history = useHistory();
    
    const {
        mutate,
        isLoading,
        isError,
        error
    } = useMutation(
        "user-signup", 
        ({ email, name, password, confirmPassword }: { email: string, name: string, confirmPassword: string, password: string }) => ApiSignUp(email, password, confirmPassword, name),
        {
            onSuccess() {
                (window as any)._sign_up_success = true;
                history.push("/login");
            }
        });

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    return (
        <AuthLayout
            isError={isError}
            error={error}
        >
            <form
                action=""
                method="POST"
                onSubmit={e => {
                    mutate({
                        email,
                        password,
                        name,
                        confirmPassword: confPassword
                    });
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
                                children={<Icon as={HiUser} color="gray.600" />}
                            />
                            <Input
                                type="text"
                                placeholder="Name (optional)"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                disabled={isLoading}
                            />
                        </InputGroup>
                    </FormControl>
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
                    <FormControl isInvalid={isError}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Icon as={HiOutlineLockClosed} color="gray.600" />}
                            />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                onChange={e => setConfPassword(e.target.value)}
                                value={confPassword}
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
                                Create Account
                            </Button>
                        </GridItem>

                        <GridItem>
                            <Button
                                as={Link}
                                to="/login"
                                display="inline-flex"
                                w="full"
                                disabled={isLoading}
                            >
                                Sign In
                            </Button>
                        </GridItem>
                    </Grid>
                </Stack>
            </form>
        </AuthLayout>
    )

}