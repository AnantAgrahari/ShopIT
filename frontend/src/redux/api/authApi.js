import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const authApi=createApi({
    reducerPath:"authApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder)=>({
                                                 //builder.query is used to fetch the data and builder.mutation is used to post,put the data//
       login: builder.mutation({
        query(body){
            return {
                url:"/login",
                method:"POST",
                body,
            };
        },
       }),
         }),
    })


export const {useLoginMutation}=authApi;      //this hook will fetch all the products from the backend//