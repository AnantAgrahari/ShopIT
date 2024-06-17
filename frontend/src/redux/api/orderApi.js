import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const orderApi=createApi({
    reducerPath:"orderApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    tagTypes: ['Order','AdminOrders'],
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
                    providesTags: ['Order']
                      }),

                getDashboardSales: builder.query({
                        query:({startDate,endDate})=>`/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
                          }), 
                          
                          getAdminOrders: builder.query({
                            query:()=>`/admin/orders`,
                            providesTags: ['AdminOrders']
                              }), 
                              updateOrder: builder.mutation({
                                query({id,body}){
                                    return {
                                        url:`/admin/orders/${id}`,
                                        method:"PUT",
                                        body,
                                    };
                                },
                                invalidatesTags:["Order"],
                                }),   
                                
                                deleteOrder: builder.mutation({
                                  query(id){
                                      return {
                                          url:`/admin/orders/${id}`,
                                          method:"DELETE",
                                      
                                      };
                                  },
                                  invalidatesTags:["AdminOrders"],
                                  }), 
        }),            //builder.query is used to fetch the data and builder.mutation is used to post,put the data//   
           });

export const {useCreateNewOrderMutation,useMyOrdersQuery,useOrderDetailsQuery,useLazyGetDashboardSalesQuery,useGetAdminOrdersQuery,useUpdateOrderMutation,useDeleteOrderMutation}=orderApi;      //this hook will fetch all the products from the backend//