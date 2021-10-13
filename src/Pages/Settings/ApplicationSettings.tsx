import { Button } from "@chakra-ui/button";
import { Box, Grid, Text } from "@chakra-ui/layout"
import { BiLock } from "react-icons/bi";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { ApiLogoutUser } from "../../Api/Account";
import { LockVault } from "../../Api/Auth";
import { ColorSwitcher } from "../../Components/ColorSwitcher";

export const ApplicationSettings: React.FC<{}> = () => {

    const logoutAccount = useMutation("logout-account", () => ApiLogoutUser());
    const history = useHistory();

    return (
        <Box>
            <p>These settings do not save to your account and are tied to your current browser.</p>
            <Grid 
                my={5} 
                gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)"
                }}
                gridTemplateRows={{
                    base: "repeat(3, 1fr)",
                    md: "repeat(1, 1fr)"
                }}
                gap={5}
            >
                <Box>
                    <Text fontWeight="bold" mb={2}>Dark / Light Mode</Text>
                    <ColorSwitcher />
                </Box>
                <Box>
                    <Text fontWeight="bold" mb={2}>Lock your vault</Text>
                    <Button
                        colorScheme="yellow"
                        leftIcon={<BiLock />}
                        disabled={logoutAccount.isLoading}
                        onClick={() => {
                            history.push("/codes");
                            LockVault();
                        }}
                    >Lock</Button>
                </Box>
                <Box pt={8}>
                    <Button 
                        colorScheme="red" 
                        leftIcon={<BiLock />} 
                        onClick={() => logoutAccount.mutate()}
                        isLoading={logoutAccount.isLoading}
                    >Logout</Button>
                </Box>
            </Grid>

            <Text colorScheme="gray" fontSize="xs">&copy; {(new Date()).getFullYear()} OTPVault. OTPVault Web v{process.env.REACT_APP_VERSION || "1.0"}</Text>
        </Box>
    )

}