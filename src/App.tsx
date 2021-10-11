import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { AuthProvider } from "./Components/AuthProvider";
import { ColorSwitcher } from "./Components/ColorSwitcher";
import { GuestRoute } from "./Components/GuestRoute";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { Login } from "./Pages/Auth/Login";
import { SignUp } from "./Pages/Auth/SignUp";
import { Dash } from "./Pages/Dash";
import { ApplicationStore } from "./Store/Store";

export const QueryProvider = new QueryClient({});


export const App = () => {
    return (
        <QueryClientProvider client={QueryProvider}>
            <ColorModeScript />
            <ChakraProvider theme={theme}>
                <Provider store={ApplicationStore}>
                    <AuthProvider>
                        <ColorSwitcher />
                        <BrowserRouter>
                            <Switch>

                                <ProtectedRoute path="/" exact component={Dash}/>

                                <GuestRoute path="/login" exact component={Login} />
                                <GuestRoute path="/signup" exact component={SignUp} />

                            </Switch>
                        </BrowserRouter>
                    </AuthProvider>
                </Provider>
            </ChakraProvider>
        </QueryClientProvider>
    )
}