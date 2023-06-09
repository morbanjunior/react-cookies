import { apiSlice } from "../../app/api/apiSlice";
export const AuthApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
            query: credentials =>({
                url: '/auth/local/signin',
                method: 'POST',
                body: {...credentials}
            })
        }),
        logout: builder.mutation({
            query: () =>({
                url: '/auth/logout',
                method: 'POST',
            
            })
        }),
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
} = AuthApiSlice