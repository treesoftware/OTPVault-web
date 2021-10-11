import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { ApiCheckAuth } from "../Api/Auth";
import { useIsLoggedIn } from "../Hooks/isLoggedIn";
import { useIsVaultLocked } from "../Hooks/vaultIsLocked";
import { setLoggedInAccount } from "../Store/Actions/UserActions";
import { UnlockVaultModal } from "./Modals/UnlockVault";

export const AuthProvider: React.FC<{}> = ({
    children
}) => {

    const dispatch = useDispatch();
    const isVaultLocked = useIsVaultLocked();
    const isLoggedIn = useIsLoggedIn();

    const {
        isLoading
    } = useQuery(
        "user-check-auth", 
        () => ApiCheckAuth(),
        {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            refetchOnMount: false,
            staleTime: 1000 * 60 * 60 * 24,
            onSuccess(data) {
                dispatch(setLoggedInAccount(data.user));
            }
        }
    );

    if(isLoading) {
        return (
            <Flex h="100vh" flexDir="column" justifyContent="center" alignItems="center">
                <Spinner />
            </Flex>
        )
    }
    else if(isLoggedIn && isVaultLocked) {
        return (
            <Flex h="100vh" flexDir="column" justifyContent="center" alignItems="center">
                <Spinner />
                <UnlockVaultModal />
            </Flex>
        )
    }
    else {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    }

}