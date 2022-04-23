import * as actions from "../constants/ActionTypes"

export function updatecart(payload){
  console.log("dispatching update cart action");
    return {
        type : actions.UPDATE_CART,
        payload
    };
}