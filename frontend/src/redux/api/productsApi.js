import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const productApi=createApi({
    reducerPath:"productApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder)=>({
        getProducts: builder.query({
            query:(params)=>({
                url:"/products",
                params:{
                    page:params?.page,
                    keyword:params?.keyword,
                    category: params?.category,
                    "price[gte]":params.min,
                    "price[lte]":params.max,
                    "ratings[gte]":params?.ratings
                },
            }),
        }),            //builder.query is used to fetch the data and builder.mutation is used to post,put the data//
           getProductDetails: builder.query({
            query:(id)=>`/products/${id}`,
           }),
    }),
});

export const { useGetProductsQuery,useGetProductDetailsQuery}=productApi;      //this hook will fetch all the products from the backend//