import { User } from "../../@types/UserResponse";
import { LOCK_VAULT, SET_DECODE_KEY, SET_LOGGED_IN_ACCOUNT, SET_NOT_LOGGED_IN } from "../Actions/UserActions";

export interface UserState {
    state: "logged in" | "not logged in";
    user?: User;
    key?: CryptoJS.lib.WordArray;
}

export const UserReducer = (
    state: UserState = InitialUserState,
    { type, payload }: { type: string, payload: any }
): UserState => {
    switch (type) {
        case SET_LOGGED_IN_ACCOUNT:
            return {
                state: "logged in",
                user: (payload.user as User),
                key: payload.key
            } as UserState;

        case SET_DECODE_KEY:
            return { ...state, key: payload };
            
        case LOCK_VAULT:
            return { ...state, key: undefined };

        case SET_NOT_LOGGED_IN:
            return { state: "not logged in" } as UserState;

        default:
            return state;
    }
}

export const InitialUserState: UserState = {
    state: "not logged in",
}