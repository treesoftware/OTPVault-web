import { useBoolean } from "@chakra-ui/hooks";
import { Grid } from "@chakra-ui/layout";
import React from "react";
import { SideBar } from "../SideBar";

export const DashboardLayout: React.FC<{}> = ({
    children
}) => {

    const [isOpen, sidebarControl] = useBoolean(false);

    return (
        <Grid
            gridTemplateColumns={{
                base: "repeat(1, 1fr)",
                lg: "175px 1fr 1fr",
                xl: "250px 1fr 1fr"
            }}
            gridTemplateRows={{
                base: "70px 1fr",
                lg: "1fr"
            }}
            h="100vh"
        >
            <SideBar
                isOpen={isOpen}
                setState={sidebarControl}
            />
            {children}
        </Grid>
    )
}