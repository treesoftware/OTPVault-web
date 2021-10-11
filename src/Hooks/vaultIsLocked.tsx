import { useSelector } from "react-redux";
import { ApplicationState } from "../@types/ApplicationState";

export const useIsVaultLocked = () => {
    return useSelector((store: ApplicationState) => store.user.key === undefined);
}