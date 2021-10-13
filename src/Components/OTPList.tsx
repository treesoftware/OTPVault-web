import Icon from "@chakra-ui/icon";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { Otp } from "../@types/Otp";
import { OneTimePasswordListItem } from "./OneTimePasswordListItem";
import { FiKey, FiPlus } from 'react-icons/fi';
import { Button } from "@chakra-ui/button";
import { SearchBar } from "./SearchBar";
import { decryptString } from "../Util/decryptString";
import { BiImport } from "react-icons/bi";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { BiChevronDown } from "react-icons/bi";

interface OTPListProps {
    passwords?: Otp[];
    onNewClicked?: () => void;
    onImportClicked?: () => void;
}

export const OTPList: React.FC<OTPListProps> = ({
    passwords,
    onImportClicked,
    onNewClicked
}) => {

    const [query, setQuery] = useState("");

    const [displayList, setDisplayList] = useState(passwords);

    useEffect(() => {
        if(query === "" || !passwords) {
            setDisplayList(passwords);
        } else {
            const filteredPasswords = passwords.filter(otp => decryptString(otp.name).toLowerCase().indexOf(query.toLowerCase()) !== -1 || (otp.issuer && decryptString(otp.issuer).toLowerCase().indexOf(query.toLowerCase()) !== -1) );
            setDisplayList(filteredPasswords);
        }
    }, [passwords, query]);

    if (!passwords|| passwords.length < 1) {
        return (
            <Stack
                h="full"
                justifyContent="center"
                alignItems="center"
            >
                <Box textAlign="center">
                    <Icon
                        as={FiKey}
                        h={50}
                        w={50}
                        color="blue.500"
                    />
                    <Heading size="md" textAlign="center" my={5}>
                        You don't have any passwords
                    </Heading>
                    <Stack direction="column">
                        <Button 
                            colorScheme="gray" 
                            size="sm" 
                            w="full"
                            leftIcon={<BiImport />}
                            onClick={onImportClicked}
                        >Import from Authenticator</Button>
                        <Button 
                            colorScheme="green" 
                            size="sm" 
                            w="full"
                            onClick={onNewClicked}
                            leftIcon={<FiPlus />}
                        >Create one</Button>
                    </Stack>
                </Box>

            </Stack>
        )
    }

    return (
        <Stack minH="full">
            <Box>
                <Flex alignItems="center" justifyContent="space-between" mb={3}>
                    <Heading size="lg">Passwords</Heading>
                    <Text color="gray.400" fontSize="sm">{passwords.length} items</Text>
                </Flex>

                <Stack direction="row">
                        <SearchBar 
                            value={query}
                            onChange={setQuery}
                        />
                        <Menu>
                            <MenuButton as={Button} d="block" rightIcon={<BiChevronDown/>}>Manage</MenuButton>
                            <MenuList>
                                <MenuItem onClick={onNewClicked}>Add Code</MenuItem>
                                <MenuItem onClick={onImportClicked}>Import from Authenticator</MenuItem>
                            </MenuList>
                        </Menu>
                </Stack>
            </Box>
            <Stack pt={5} overflow="auto">
                {
                    !displayList || displayList.length < 1 ? 
                        <Heading size="md" textAlign="center" my={5}>
                            No passwords matched your search.
                        </Heading>
                    :
                    displayList.map(otp => (
                        <OneTimePasswordListItem
                            key={`otp-item-${otp.id}`}
                            otp={otp}
                        />
                    ))
                }
            </Stack>
        </Stack>
    )
}