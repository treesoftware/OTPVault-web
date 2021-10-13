import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import React from "react";
import { HiSearch } from "react-icons/hi";

interface SearchBarProps {
    value: string;
    onChange: (val: string) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange
}) => (

    <InputGroup
        size="md"
    >
        <Input
            type="text"
            name="q"
            placeholder="Search codes..."
            value={value}
            onChange={e => onChange(e.target.value)}
        />
        <InputRightElement
            pointerEvents="none"
            children={<Icon as={HiSearch} color="gray.600" />}
        />
    </InputGroup>
)