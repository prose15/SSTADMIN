export * from "./layout/actions";
import * as types from './actionType'
// Authentication module
export * from "./auth/register/actions";
export * from "./auth/login/actions";
export * from "./auth/forgetpwd/actions";
export * from "./auth/profile/actions";


// newactionsforproject-grid

// export * from "./layout/actions";

// Authentication module
// export * from "./auth/register/actions";
// export * from "./auth/login/actions";
// export * from "./auth/forgetpwd/actions";
// export * from "./auth/profile/actions";

//Ecommerce
export * from "./e-commerce/actions";

//Calendar
export * from "./calendar/actions";

//chat
export * from "./chat/actions";

//crypto
export * from "./crypto/actions";

//invoices
export * from "./invoices/actions";

//jobs
export * from "./jobs/actions";

// projects
export * from "./projects/actions";

// tasks
export * from "./tasks/actions";

// contacts
export * from "./contacts/actions";

// contacts
export * from "./mails/actions";

//dashboard
export * from "./dashboard/actions";

//dashboard-crypto
export * from "./dashboard-crypto/actions";

//dashboard-saas
export * from "./dashboard-saas/actions";

//dashboard-blog
export * from "./dashboard-blog/actions";

//dashboard-jobs
export * from "./dashboard-jobs/actions";

// newnewactionsforproject-grid

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


