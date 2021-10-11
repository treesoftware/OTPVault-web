import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useIsLoggedIn } from "../Hooks/isLoggedIn";

export const GuestRoute: React.FC<RouteProps> = (props) => {

    const loggedIn = useIsLoggedIn();

    if(loggedIn) {
        return <Route path={props.path} render={() => <Redirect to="/" />} />
    }

    return (<Route {...props} />)

}