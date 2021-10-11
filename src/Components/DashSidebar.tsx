import { Button } from "@chakra-ui/button";
import { FormControl } from "@chakra-ui/form-control";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Divider, Grid, GridItem, Stack } from "@chakra-ui/layout";
import React from "react";
import { HiSearch } from "react-icons/hi";
import { Logo } from "./Logo";

interface DashSideBarProps {
    onCreateModalOpen: () => void;

    codeHiddenStatus: boolean;
    toggleCodesHidden: () => void;

    searchQuery: string;
    setSearchQuery: (query: string) => void;
    
    onLockVault: () => void;
}
export const DashSideBar: React.FC<DashSideBarProps> = ({
    onCreateModalOpen,

    codeHiddenStatus,
    toggleCodesHidden,

    searchQuery,
    setSearchQuery,

    onLockVault
}) => (
        <Stack>
            <Logo size={35}/>
            <Divider my={20}/>

            <FormControl py={2}>
                <InputGroup
                    size="sm"
                >
                    <Input 
                        type="text"
                        name="q"
                        placeholder="Search codes..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <InputRightElement 
                        pointerEvents="none"
                        children={<Icon as={HiSearch} color="gray.600"/>}
                    />
                </InputGroup>
            </FormControl>
            <Grid
                gridTemplateColumns="repeat(2, 1fr)"
                gap={5}
            >
                <GridItem>
                    <Button display="block" w="full" colorScheme="gray" size="sm" onClick={toggleCodesHidden}>{ codeHiddenStatus ? "Show" : "Hide" } Codes</Button>
                </GridItem>
                <GridItem>
                    <Button onClick={onCreateModalOpen} display="block" w="full" colorScheme="green" size="sm">New</Button>
                </GridItem>
            </Grid>
            <Button display="block" w="full" colorScheme="gray" size="sm" onClick={onLockVault}>Lock Vault</Button>
            <Button display="block" w="full" colorScheme="yellow" size="sm">Logout</Button>

        </Stack>
    )
