import { useSelector } from "react-redux";
import { ApplicationState } from "../@types/ApplicationState";

export const useIsLoggedIn = () => {
    return useSelector((store: ApplicationState) => store.user.state === "logged in" && store.user.user);
}