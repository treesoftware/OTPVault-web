import { ColorModeScript, ChakraProvider, theme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import { AuthProvider } from "./Components/AuthProvider";
import { GuestRoute } from "./Components/GuestRoute";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { Login } from "./Pages/Auth/Login";
import { SignUp } from "./Pages/Auth/SignUp";
import { Dash } from "./Pages/Dash";
import { ApplicationStore } from "./Store/Store";
import { Settings } from "./Pages/Settings";

export const QueryProvider = new QueryClient({});


export const App = () => {
    return (
        <QueryClientProvider client={QueryProvider}>
            <ColorModeScript />
            <ChakraProvider theme={theme}>
                <Provider store={ApplicationStore}>
                    <AuthProvider>
                        <BrowserRouter>
                            <Switch>

                                <ProtectedRoute path="/codes" component={Dash}/>
                                <ProtectedRoute path="/settings" exact component={Settings}/>
                                <ProtectedRoute path="/" exact render={() => <Redirect to="/codes" />}/>

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