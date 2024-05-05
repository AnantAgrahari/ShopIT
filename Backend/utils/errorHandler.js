class ErrorHandler extends Error{
    constructor(message,statusCode)
    {
        super(message)    //super is a constructor//
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor)
    }
}
export default  ErrorHandler