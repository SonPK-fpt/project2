export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function handleUserLogin(userID, pw) {
    return (dispatch, getState) => {
        const { users } = getState();

        const authenUser = Object.values(users).find((u) => 
            u.id === userID.toLowerCase() 
            && 
            u.password === pw);
        
        if(!authenUser) {
            window.alert("Wrong username or password!");
        }

        if (!!authenUser) {
            return dispatch(setAuthedUser(authenUser));
        }
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
    };
}

export function handleUserLogout() {
    return (dispatch) => {
        return dispatch(logoutUser());
    }
}