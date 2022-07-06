import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("expireTime");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authSucess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCESS,
    idToken: token,
    userId: userId,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const auth = (email, password, isSignUP) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGUUmij96igchk8h9uE-6T-Jlk-gGW93U";
    if (!isSignUP) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGUUmij96igchk8h9uE-6T-Jlk-gGW93U";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expireDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("user", response.data.localId);
        localStorage.setItem("expireTime", expireDate);
        dispatch(authSucess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiryDate = new Date(localStorage.getItem("expireTime"));
      if (expiryDate < new Date()) {
        dispatch(logout());
      } else {
        const user = localStorage.getItem("user");
        dispatch(authSucess(token, user));
        dispatch(
          checkAuthTimeout((expiryDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
