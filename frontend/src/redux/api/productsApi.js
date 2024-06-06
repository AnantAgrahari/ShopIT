import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const productApi=createApi({
    reducerPath:"productApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    tagTypes: ["Product"],
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
            providesTags: ['Product']
           }),
           submitReview: builder.mutation({
              query(body){
                return{
                    url:"/reviews",
                    method:"PUT",
                    body,
                }; 
              },
              invalidatesTags: ["Product"],
           }),
    }),
});

export const { useGetProductsQuery,useGetProductDetailsQuery,useSubmitReviewMutation}=productApi;      //this hook will fetch all the products from the backend//