import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const productApi=createApi({
    reducerPath:"productApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder)=>({
        getProducts: builder.query({
            query:(params)=>"/products",
        }),            //builder.query is used to fetch the data and builder.mutation is used to post,put the data//
           getProductDetails: builder.query({
            query:(id)=>`/products/${id}`,
           }),
    }),
});

export const { useGetProductsQuery,useGetProductDetailsQuery}=productApi;      //this hook will fetch all the products from the backend//