import { Stack, Container, Flex, GridItem } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { QueryProvider } from "../App";
import { lockUserVault } from "../Store/Actions/UserActions";
import { ApplicationStore } from "../Store/Store";
import { DashSideBar } from "./DashSidebar";

interface DashLayoutProps {
    onCreateModalOpen: () => void;
    codeHiddenStatus: boolean;
    toggleCodesHidden: () => void;

    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const DashLayout: React.FC<DashLayoutProps> = ({
    onCreateModalOpen,

    codeHiddenStatus,
    toggleCodesHidden,

    searchQuery,
    setSearchQuery,

    children
}) => {

    const onLockVault = useCallback(() => {
        ApplicationStore.dispatch(lockUserVault());
        QueryProvider.removeQueries("my-passwords");
    }, []);

    return (
        <Container
            minH="100vh"
            w="100%"
        >
            <Flex
                h="100vh"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    width={{ base: "80%", md: "768px" }}
                >

                    <Grid
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            md: "200px 1fr"
                        }}
                        gap={{
                            base: 0,
                            md: 10,
                            lg: 25,
                            xl: 50
                        }}
                        maxH="100vh"
                        alignItems="center"
                    >
                        <GridItem>
                            <DashSideBar
                                onCreateModalOpen={onCreateModalOpen}
                                codeHiddenStatus={codeHiddenStatus}
                                toggleCodesHidden={toggleCodesHidden}

                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}

                                onLockVault={onLockVault}
                            />
                        </GridItem>
                        <GridItem overflow="auto" height="100%" py={10}>
                            {children}
                        </GridItem>
                    </Grid>

                </Stack>
            </Flex>
        </Container>
    )

}