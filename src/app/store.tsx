import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice";



 const store = configureStore({
    reducer: { 
      [apiSlice.reducerPath]: apiSlice.reducer,
      // user: userReducer,
      auth: authReducer,
      
    },
    middleware: (getDefaultMiddleware) =>{
      return  getDefaultMiddleware().concat(
        apiSlice.middleware,
        );
     },
  });

  export default store;

  export type RootState = ReturnType<typeof store.getState>;
  // export const selectUserData = (state:RootState) => state.user.userData;
  // export const selectCurrentUser = (state:RootState) => state.auth.user;
  export const selectCurrentToken = (state:RootState) => state.auth.token;
  