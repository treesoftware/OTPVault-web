import { User } from "../../@types/UserResponse";

export const SET_LOGGED_IN_ACCOUNT = "auth:setLoggedInAccount";
export const setLoggedInAccount = (user: User, key?: CryptoJS.lib.WordArray) => {
    return {
        type: SET_LOGGED_IN_ACCOUNT,
        payload: {user, key}
    }
};
export const SET_DECODE_KEY = "auth:setUserDecodeKey";
export const setUserDecodeKey = (key: CryptoJS.lib.WordArray) => {
    return {
        type: SET_DECODE_KEY,
        payload: key
    }
};
export const LOCK_VAULT = "auth:lockUserVault";
export const lockUserVault = () => {
    return {
        type: LOCK_VAULT,
        payload: null
    }
};

export const SET_NOT_LOGGED_IN = "auth:setNotLoggedIn";
export const setNotLoggedIn = () => {
    return {
        type: SET_NOT_LOGGED_IN,
        payload: null
    }
};