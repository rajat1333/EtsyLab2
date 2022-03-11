import * as actions from "../constants/ActionTypes"

export function logout(payload){
  console.log("dispatching logout action");
    return {
        type : actions.LOGOUT,
        payload
    };
}