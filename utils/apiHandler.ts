import axios from "axios";
import { responseHandler } from "./responseHandler";

export const UploadFile = async (email: string, file: object) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URI}/api/uploadFile`, {
            email,
            file
        })
        return data;
    } catch (e) {
        responseHandler("Failed", "Internal server error", e);
    }
}

export const UpdatePassword = async (email: string, docId: string, password: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URI}/api/updatePassword`, {
            email,
            docId,
            password
        })
        return data;
    } catch (e) {
        responseHandler("Failed", "Internal server error", e);
    }
}

export const PreviewFile = async (email: string, docId: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URI}/api/previewFile`, {
            email,
            docId
        });
        return data;
    } catch (e) {
        responseHandler("Failed", "Internal server error", e);
    }
}

export const DeleteFile = async (email: string, docId: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URI}/api/deleteFile`, {
            email,
            docId
        });
        return data;
    } catch (e) {
        responseHandler("Failed", "Internal server error", e);
    }
}

export const PreviewAllFiles = async (email: string) => {
    try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_URI}/api/previewAllFiles`, {
            email
        });
        return data;
    } catch (e) {
        responseHandler("Failed", "Internal server error", e);
    }
}