import { GridItem } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useBreakpointValue } from "@chakra-ui/media-query";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Route } from "react-router";
import { ApiListOtps } from "../Api/Otp";
import { DashboardLayout } from "../Components/Layouts/DashboardLayout";
import { OTPList } from "../Components/OTPList";
import { SingleCode } from "./Code";
import { ErrorPage } from "./Error";
import { LoadingPage } from "./Loading";
import { CreateModal } from "../Components/Modals/CreateOtp";
import { ImportFromAuthenticatorModal } from "../Components/Modals/ImportFromAuthenticator";

export const Dash: React.FC<{}> = () => {

    const {
        data,
        isLoading,
        isError,
        error
    } = useQuery("my-passwords", ApiListOtps, {
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,
    });

    const dashHomeExact = useBreakpointValue({
        base: true,
        lg: false
    });

    const createCode = useDisclosure();
    const importCodes = useDisclosure();

    useEffect(() => {
        document.title = "OTPVault | My Vault";
    }, []);

    return (
        <DashboardLayout>

            <CreateModal
                isOpen={createCode.isOpen}
                onClose={createCode.onClose}
            />

            <ImportFromAuthenticatorModal
                isOpen={importCodes.isOpen}
                onClose={importCodes.onClose}
            />

            <Route
                path="/codes"
                exact={dashHomeExact}
                render={() =>
                    <GridItem p={5} h="full" overflow="auto">
                        {
                            isLoading ? <LoadingPage /> :
                                isError ? <ErrorPage message={(error as any).msg} /> :
                                    <OTPList
                                        onNewClicked={createCode.onOpen}
                                        onImportClicked={importCodes.onOpen}
                                        passwords={data}
                                    />
                        }
                    </GridItem>
                } />
            <Route path="/codes/:id" exact component={SingleCode} />
        </DashboardLayout>
    )
}