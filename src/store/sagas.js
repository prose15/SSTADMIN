import { all, call, fork,put,takeLatest} from "redux-saga/effects";
import * as types from './actionType'
//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
// import ecommerceSaga from "./e-commerce/saga";
import ecommerceSaga from "./e-commerce/saga";
import calendarSaga from "./calendar/saga";
import chatSaga from "./chat/saga";
import cryptoSaga from "./crypto/saga";
import invoiceSaga from "./invoices/saga";
import jobsSaga from "./jobs/saga";
import projectsSaga from "./projects/saga";
import tasksSaga from "./tasks/saga";
import mailsSaga from "./mails/saga";
import contactsSaga from "./contacts/saga";
import dashboardSaga from "./dashboard/saga";
import dashboardSaasSaga from "./dashboard-saas/saga";
import dashboardCryptoSaga from "./dashboard-crypto/saga";
import dashboardBlogSaga from "./dashboard-blog/saga";
import dashboardJobSaga from "./dashboard-jobs/saga";
import { getContactFail, getContactSuccess } from "./actions";
import { db } from "firebase-config";
import { collection, doc, getDoc } from "firebase/firestore";
function*  onLoadContactAsync() {
  try{
    
    const contacts = yield call(async()=> await getDoc(collection(db,'users',sessionStorage.getItem('uid'))) )
  const docSnap = contacts.data() 
    if(docSnap){
      yield put(getContactSuccess(docSnap))
    }
    else{
      yield put(getContactSuccess("no data"))
    }
    

    
  }
  catch(error){
    yield put(getContactFail())
  }
}

export function *onLoadContact(){
  yield takeLatest(types.GET_CONTACT_START,onLoadContactAsync)
}

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(onLoadContact),
    fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(jobsSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(contactsSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(dashboardCryptoSaga),
    fork(dashboardBlogSaga),
    fork(dashboardJobSaga)
  ]);
}

