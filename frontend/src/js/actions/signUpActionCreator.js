import * as actions from "../constants/ActionTypes"

export function signUp(payload){
    console.log("dispatching signUp action");
    return {
        type : actions.SIGN_UP,
        payload 
    };
}