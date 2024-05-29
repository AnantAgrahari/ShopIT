import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { setIsAuthenticated, setUser } from "../features/userSlice";
export const userApi=createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    endpoints:(builder)=>({
                                                 //builder.query is used to fetch the data and builder.mutation is used to post,put the data//
       getMe: builder.query({
       query:()=>`/me`,
       transformResponse: (result)=>result.user,
       async onQueryStarted(args,{dispatch,queryFulfilled}){
        try{
            const {data}=await queryFulfilled;
            dispatch(setUser(data));
            dispatch(setIsAuthenticated(true));
        }
        catch(error)
        {
            console.log(error);
        }
       },
       }),
         }),
    });


export const {useGetMeQuery}=userApi;      //this hook will fetch all the products from the backend//