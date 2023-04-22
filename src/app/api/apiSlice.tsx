import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredential, logOut} from "../../features/auth/authSlice";
import { RootState } from "../store";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint}) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
          }
      
          return headers
    }
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
>  = async (args, api, extraOptions) => {
let result = await baseQuery(args, api, extraOptions)
if (result.error && result.error.status === 401) {
  // try to get a new token
  const refreshResult = await baseQuery('auth/refreshtoken', api, extraOptions)
  if (refreshResult.data) {
    // console.log(refreshResult.data)
    // store the new token
    api.dispatch(setCredential(refreshResult.data))
    
    // retry the initial query
    result = await baseQuery(args, api, extraOptions)
  } else {
    api.dispatch(logOut())
  }
}
return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder =>({

    })
})