import { Spinner, Stack } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { useBoolean, useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { ApiListOtps } from "../Api/Otp";
import { DashLayout } from "../Components/DashLayout";
import { CreateModal } from "../Components/Modals/CreateOtp";
import { OneTimePasswordListItem } from "../Components/OneTimePasswordListItem";
import { decryptString } from "../Util/decryptString";

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

    const createModal = useDisclosure();
    const [isHidden, setIsHidden] = useBoolean();

    const [query, setQuery] = useState("");

    return (
        <React.Fragment>
            <CreateModal 
                isOpen={createModal.isOpen}
                onClose={createModal.onClose}
            />

            <DashLayout
                onCreateModalOpen={createModal.onOpen}

                codeHiddenStatus={isHidden}
                toggleCodesHidden={setIsHidden.toggle}

                searchQuery={query}
                setSearchQuery={setQuery}
            >
                    {
                        isLoading ? <Spinner /> :
                        isError ? <Alert status="error"><AlertIcon/>{ (error as any).msg }</Alert> :
                        !data || data.length < 1 ? <Alert status="info" borderRadius={5}><AlertIcon />You don't have any passwords saved</Alert> :
                        <Stack>
                            {
                                query !== "" ? 
                                data.filter(otp => decryptString(otp.name).indexOf(query) !== -1 || (otp.issuer && decryptString(otp.issuer).indexOf(query) !== -1) )
                                .map(otp => (
                                    <OneTimePasswordListItem 
                                        key={`otp-item-${otp.id}`}
                                        otp={otp}
                                        hidden={isHidden}
                                    />
                                ))
                                :
                                data.map(otp => (
                                    <OneTimePasswordListItem 
                                        key={`otp-item-${otp.id}`}
                                        otp={otp}
                                        hidden={isHidden}
                                    />
                                ))
                            }
                        </Stack>
                    }
            </DashLayout>
        </React.Fragment>
    )
}