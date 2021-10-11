import { combineReducers, createStore } from "redux";
import { InitialUserState, UserReducer } from "./Reducers/UserReducer";

const initialState = {
    user: InitialUserState
}

const allReducers = combineReducers({
    user: UserReducer
});

export const ApplicationStore = createStore(allReducers, initialState);