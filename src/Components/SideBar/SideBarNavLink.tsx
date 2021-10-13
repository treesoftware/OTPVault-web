import { Button } from "@chakra-ui/button";
import React from "react";
import { NavLink } from "react-router-dom";

import { useRouteMatch } from 'react-router';
import { useColorModeValue } from "@chakra-ui/color-mode";

interface SideBarNavLinkProps {
    to: string;
    Icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    name: string;
}
export const SideBarNavLink: React.FC<SideBarNavLinkProps> = ({
    to,
    Icon,
    name
}) => {
    const router = useRouteMatch();
    const isActive = router.path === to;
    const selectedBackground = useColorModeValue("gray.200", "gray.900");

    return (
        <Button
            as={NavLink}
            to={to}
            leftIcon={Icon}
            justifyContent="start"
            alignItems="center"
            fontWeight="normal"
            backgroundColor={isActive ? selectedBackground : "transparent"}
            borderRadius={0}
            _focus={{
                boxShadow: 0
            }}
        >
            {name}
        </Button>
    )
}