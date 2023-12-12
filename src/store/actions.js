export * from "./layout/actions";
import * as types from './actionType'
// Authentication module
export * from "./auth/register/actions";
export * from "./auth/login/actions";
export * from "./auth/forgetpwd/actions";
export * from "./auth/profile/actions";
export const getContactStart=()=>({
    type: types.GET_CONTACT_START
});

export const getContactSuccess=()=>({
    type: types.GET_CONTACT_SUCCESS,
    payload:contact,
})
export const getContactFail=()=>({
    type: types.GET_CONTACT_FAIL,
    payload:error,
})


