import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const orderApi=createApi({
    reducerPath:"orderApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder)=>({
        createNewOrder: builder.mutation({
            query(body){
                return {
                    url:"/orders/new",
                    method:"POST",
                    body,
                };
            },
            }),
            myOrders: builder.query({
              query:()=>`/my/orders`,
                }),
                orderDetails: builder.query({
                    query:(id)=>`/orders/${id}`,
                      }),
        }),            //builder.query is used to fetch the data and builder.mutation is used to post,put the data//   
           });

export const {useCreateNewOrderMutation,useMyOrdersQuery,useOrderDetailsQuery}=orderApi;      //this hook will fetch all the products from the backend//