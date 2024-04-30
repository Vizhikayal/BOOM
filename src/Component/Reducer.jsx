import { createSlice } from "@reduxjs/toolkit"; 
import { loginAction, getAction,updateAction, deleteAction} from "../Component/Action"; 

const initialState = {
  logInData: '', 
  userData: '', 
  error: '', 
};


const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => { //extrareducer for asynchronous function
    builder
      .addCase(loginAction.pending, (state) => {
        console.log("login pending", loginAction);
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        console.log("login fulfilled", loginAction);
        state.logInData = payload; 
      })
      .addCase(getAction.pending, (state) => {
        console.log("fetch pending", getAction);
        state.error = null;
      })
      .addCase(getAction.fulfilled, (state, { payload }) => {
        console.log("fetch fulfilled", getAction);
        state.userData = payload; 
      })
      // // .addCase(updateAction.pending, (state) => {
      // //   console.log("update pending", updateAction);
      // //   state.error = null;
      // // })
      // // .addCase(updateAction.fulfilled, (state, { payload }) => {
      // //   console.log("update fulfilled", updateAction);
      // //   state.userData = payload; 
      // // })
      // // .addCase(deleteAction.pending, (state) => {
      // //   console.log("delete pending", deleteAction);
      // //   state.error = null;
      // // })
      // // .addCase(deleteAction.fulfilled, (state, { payload }) => {
      // //   console.log("delete fulfilled", deleteAction);
      // //   state.userData = payload; 
      // })
      .addCase(loginAction.rejected, (state, { payload }) => {
        console.log("login rejected", loginAction);
        state.error = payload;
      })
      .addCase(getAction.rejected, (state, { payload }) => {
        console.log("fetch rejected", getAction);
        state.error = payload;
      })
      .addCase(updateAction.rejected, (state, { payload }) => {
        console.log("update rejected", updateAction);
        state.error = payload;
      })
      .addCase(deleteAction.rejected, (state, { payload }) => {
        console.log("delete rejected", deleteAction);
        state.error = payload;
      })
  }
});

export default loginSlice.reducer; 
