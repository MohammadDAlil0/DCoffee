import IError from "../interfaces/ErrorInterface";

class AppError extends Error implements IError {
    statusCode: number;
    status: string;
    isOperational: boolean;
    code: number | string;
    keyValue: Object;
    
    constructor(message: string, statusCode: number, codeNumber: number = 0, keyValue: Object = {}) {
        super(message);
        this.statusCode = statusCode;
        this.status = (statusCode * 1 < 500 ? 'falil' : 'error');
        this.isOperational = true;
        this.code = codeNumber;
        this.keyValue = keyValue;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;