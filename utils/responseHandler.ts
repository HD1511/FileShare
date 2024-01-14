import { NextApiResponse } from "next";

export const responseAPIHandler = (res: NextApiResponse,StatusCode: number, status: string,message: string, data: any=null) => {
    return res.status(StatusCode).json({
        status,
        message,
        data
    })
}

export const responseHandler = (status: string,message: string, data: any=null) => {
    const res = {
        status,
        message,
        data
    }
    return JSON.stringify(res);
}