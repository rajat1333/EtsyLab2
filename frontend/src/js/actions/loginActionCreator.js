import * as actions from "../constants/ActionTypes"

export function login(payload){
  console.log("dispatching login action");
    return {
        type : actions.LOGIN,
        payload
    };
}