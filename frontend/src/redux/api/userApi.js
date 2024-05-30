import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { setIsAuthenticated, setUser,setLoading } from "../features/userSlice";
export const userApi=createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    tagTypes:["User"],
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
            dispatch(setLoading(false));
        }
        catch(error)
        {
            dispatch(setLoading(false));
            console.log(error);
        }
       },
       providesTags:["User"],              //helps in refetching the data//
       }),
       updateProfile: builder.mutation({
        query(body){
            return{
                url:"/me/update",
                method:"PUT",
                body,
            };
        },
        invalidatesTags:["User"],          //refresh the data once we have updated the profile//
       }),
       updatePassword: builder.mutation({
        query(body){
            return{
                url:"/password/update",
                method:"PUT",
                body,
            };
        },
       }),
       forgotPassword: builder.mutation({
        query(body){
            return{
                url:"/password/forgot",
                method:"POST",
                body,
            };
        },
       }),
         }),
    });


export const {useGetMeQuery,useUpdateProfileMutation,useUpdatePasswordMutation,useForgotPasswordMutation}=userApi;      //this hook will fetch all the products from the backend//