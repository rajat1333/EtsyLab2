import * as actions from "../constants/ActionTypes";

const initialLoginState = {
    loggedIn: false,
    userName : "",
    newUserName : "",
    newUserEmailId : "",
    newUserPassword : ""
}


const reducer =  (state = initialLoginState, action) => {

  switch (action.type) {

    case actions.LOGIN:
      console.log("inside LOGIN reducer");
      console.log({ ...state, loggedIn : true });
      return { ...state, loggedIn : true,                                                                                                 userName : "rajat@gmail.com"};
    case actions.SIGN_UP:
        console.log("inside SIGN_UP reducer");
        console.log({ ...state, loggedIn : true });
        return { ...state, loggedIn : false,                                                                                               newUserName : "r1", newUserEmailId : "r1@gmail.com", newUserPassword : "r1" };
      case actions.LOGOUT:
        console.log("inside LOGOUT reducer");
        console.log({ ...state, loggedIn : false });
        return { ...state, loggedIn : false, userName : ""};
    default:
      return state;
  }
}
export default reducer;
