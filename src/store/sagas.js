import { all, call, fork,put,takeLatest} from "redux-saga/effects";
import * as types from './actionType'
//public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
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
    fork(onLoadContact)
  ]);
}

