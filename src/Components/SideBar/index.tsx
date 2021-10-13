import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { GridItem, Flex } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import React from "react";
import { BsList } from "react-icons/bs";
import { Logo } from "../Logo";
import { SideBarContent } from "./Content";

interface SideBarProps {
    isOpen: boolean;
    setState: {
        readonly on: () => void;
        readonly off: () => void;
        readonly toggle: () => void;
    }
}

export const SideBar: React.FC<SideBarProps> = ({
    isOpen,
    setState
}) => {

    const bgColor = useColorModeValue("gray.100", "gray.700");
    const variant = useBreakpointValue({
        base: { navigation: "drawer", toggleButton: true },
        lg: { navigation: "sidebar", toggleButton: false }
    })

    if (variant?.navigation === "drawer") {
        return (
            <React.Fragment>
                <Flex 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center"
                    py={3}
                    px={5}
                    bg={bgColor}
                >
                    <Logo size={22}/>
                    <IconButton 
                        aria-label="Open Nav"
                        icon={<BsList />}
                        onClick={setState.toggle}
                    />
                </Flex>
                <Drawer isOpen={isOpen} placement="left" onClose={setState.off}>
                    <DrawerOverlay>
                        <DrawerContent>
                            <DrawerCloseButton />
                            <SideBarContent />
                        </DrawerContent>
                    </DrawerOverlay>
                </Drawer>
            </React.Fragment>
        )
    } else {
        return (
            <GridItem bg={bgColor}>
                <SideBarContent />
            </GridItem>
        )
    }
};