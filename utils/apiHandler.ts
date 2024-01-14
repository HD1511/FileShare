import axios from "axios";
import { responseHandler } from "./responseHandler";

export const UpdatePassword = async (email: string, docId: string, password: string) => {
    try {
        const { data } = await axios.post(`/api/updatePassword`, {
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
        const { data } = await axios.post(`/api/previewFile`, {
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
        const { data } = await axios.post(`/api/deleteFile`, {
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
        const { data } = await axios.post(`/api/previewAllFiles`, {
            email
        });
        return data;
    } catch (e) {
        responseHandler("Failed", "Internal server error", e);
    }
}