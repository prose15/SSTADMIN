import { createSlice } from "@reduxjs/toolkit";
const initialState={
    value:0,
}
export const state=createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment:(state)=>{
            console.log(state.value);
        }
    }
})
export const {increment} =state.actions
export default state.reducer