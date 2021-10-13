import { Stack } from "@chakra-ui/react";
import React from "react";
import { Logo } from "../Logo";
import { BsList } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import { SideBarNavLink } from "./SideBarNavLink";

export const SideBarContent: React.FC<{}> = () => {
    return (
        <Stack py={3}>
            <Stack mb={5}>
                <Logo
                    size={35}
                />
            </Stack>
            <Stack>
                <SideBarNavLink
                    to="/codes"
                    Icon={<BsList size={23} />}
                    name="All"
                />
                <SideBarNavLink
                    to="/settings"
                    Icon={<BiCog size={23} />}
                    name="Settings"
                />
            </Stack>
        </Stack>
    )
}