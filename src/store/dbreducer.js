import * as types from './actionType'
const initialState ={
  contacts:{},
  error:null,
  loading:false,
}
const contactReducer=(state=initialState,action)=>{
    switch (action.type) {
      case types.GET_CONTACT_START:
        return {
          ...state,
          loading:true,
        }
      case types.GET_CONTACT_SUCCESS:
        return {
          ...state,
          contacts:action.payload,
          loading:false,
        }
        case types.GET_CONTACT_FAIL:
          return{
            ...state,
            error:action.payload,
            loading:false,
          }
          default:
            return state;
      }
  }
  export default contactReducer