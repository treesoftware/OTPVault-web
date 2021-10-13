import { GridItem, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";
import React, { useEffect } from "react";
import { DashboardLayout } from "../Components/Layouts/DashboardLayout";
import { AccountSettings } from "./Settings/AccountSettings";
import { ApplicationSettings } from "./Settings/ApplicationSettings";
import { DangerZoneSettings } from "./Settings/DangerZoneSettings";

export const Settings: React.FC<{}> = () => {

    useEffect(() => {
        document.title = "OTPVault | Settings";
    }, []);

    return (
        <DashboardLayout>
            <GridItem colSpan={{ base: 1, lg: 2 }} p={5}>
                <Heading mb={3}>Settings</Heading>

                <Tabs>
                    <TabList>
                        <Tab>Application</Tab>
                        <Tab>Account Settings</Tab>
                        <Tab>Danger Zone</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <ApplicationSettings />
                        </TabPanel>
                        <TabPanel>
                            <AccountSettings />
                        </TabPanel>
                        <TabPanel>
                            <DangerZoneSettings />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </GridItem>
        </DashboardLayout>
    )
}