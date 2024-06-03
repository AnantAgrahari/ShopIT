import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const orderApi=createApi({
    reducerPath:"productApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder)=>({
        createNewOrder: builder.mutation({
            query(body){
                return {
                    url:"/orders/new",
                    method:"POST",
                };
            },
            }),
        }),            //builder.query is used to fetch the data and builder.mutation is used to post,put the data//   
           });

export const {useCreateNewOrderMutation}=orderApi;      //this hook will fetch all the products from the backend//