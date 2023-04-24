import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type loginType={
    //  user: any;
    tenbit: '';
  }

  // const usertoken = JSON.parse(localStorage.getItem('login') || "");
//   console.log(JSON.parse(localStorage["login"]).token)

  const initialState = {
    tenbit: localStorage["session"] ? JSON.parse(localStorage["session"]).tenbit : '',
    //  user: null
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
    setCredential(state, action){
        // state.user = action.payload.user
        state.tenbit = action.payload.tenbit
       
    },
    logOut: (state) =>{
        // state.user = null
        state.tenbit = ''
    }
  }
  })

  export const { setCredential, logOut }= authSlice.actions
  export default authSlice.reducer;

  