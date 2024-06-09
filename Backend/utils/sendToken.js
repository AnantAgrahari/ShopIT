export default  (user,statusCode,res)=>{

    // create jwt token
    const token=user.getJwtToken();


     //options for cookie
     const options={                             //this cookie will expire in 7 days from the date the token is being assigned
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRES_TIME *24*60*60*1000
            ),
            httpOnly: true          //if http only cookie is true then it can only be accessed by the backend and if it is written false then it can be accessed by front end also
     };


     res.status(statusCode).cookie("token",token,options).json({            //res is used to send back the response
        token,                                                        //.cookie is used to create the cookie and syntax written after that will store the token into the cookie//
     });
};



// the token that is created for every user is now stored in cookie//