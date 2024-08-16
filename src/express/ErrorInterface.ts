interface IError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    code: number | string;
    keyValue: Object;
}

export default IError;