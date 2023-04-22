import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type loginType={
    //  user: any;
    token: '';
  }

  // const usertoken = JSON.parse(localStorage.getItem('login') || "");
//   console.log(JSON.parse(localStorage["login"]).token)

  const initialState = {
     token: localStorage["login"] ? JSON.parse(localStorage["login"]).token : '',
    //  user: null
  };

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
    setCredential(state, action){
        // state.user = action.payload.user
        state.token = action.payload.token
       
    },
    logOut: (state) =>{
        // state.user = null
        state.token = ''
    }
  }
  })

  export const { setCredential, logOut }= authSlice.actions
  export default authSlice.reducer;

  