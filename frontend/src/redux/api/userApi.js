import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { setIsAuthenticated, setUser,setLoading } from "../features/userSlice";
// eslint-disable-next-line
import UpdateUser from "../../components/admin/UpdateUser";
export const userApi=createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl:"/api/v1"}),
    tagTypes:["User","AdminUsers","AdminUser"],
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
       resetPassword: builder.mutation({
        query({token,body}){
            return{
                url:`/password/reset/${token}`,
                method:"PUT",
                body,
            };
        },
       }),

       getAdminUsers: builder.query({
        query:()=>`/admin/users`,
        providesTags: ['AdminUsers']
          }),

          getUserDetails: builder.query({
            query:(id)=>`/admin/users/${id}`,
            providesTags: ['AdminUser']
              }),

              updateUser: builder.mutation({
                query({id,body}){
                    return{
                        url:`/admin/users/${id}`,
                        method:"PUT",
                        body,
                    };
                },
                invalidatesTags: ["AdminUsers"],
               }),

               deleteUser: builder.mutation({
                query(id){
                    return{
                        url:`/admin/users/${id}`,
                        method:"DELETE",
                    };
                },
                invalidatesTags: ["AdminUsers"],
               }),
        
         }),
    });


export const {useGetMeQuery,useUpdateProfileMutation,useUpdatePasswordMutation,useForgotPasswordMutation,useResetPasswordMutation,useGetAdminUsersQuery,useGetUserDetailsQuery,useUpdateUserMutation,useDeleteUserMutation}=userApi;      //this hook will fetch all the products from the backend//