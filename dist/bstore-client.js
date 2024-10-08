"use client";
import { put } from "./put";
import { get } from "./get";
import { del } from "./del";
import { list } from "./list";
export const BstoreHost = [
    process.env.PUBLIC_BSTORE_HOST,
    process.env.BSTORE_HOST,
    process.env.NEXT_PUBLIC_BSTORE_HOST,
    process.env.VITE_BSTORE_HOST,
    process.env.REACT_APP_BSTORE_HOST,
].find(key => key !== undefined) || '';
async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
async function base64ToFile(base64String, fileName, mimeType) {
    const base64Data = base64String.split(',')[1] || base64String;
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
}
export async function Put(path, file, access) {
    const file_name = file.name;
    const file_data = await fileToBase64(file);
    return await put(path, file_data, file_name, access);
}
export async function Get(path, access) {
    const res = await get(path, access);
    const file_type = res.file_type;
    const file_name = res.file_name;
    const file_data = res.file_data;
    if (file_type == '' || file_name == '' || file_data == '' || !file_type || !file_name || !file_data) {
        return {
            status: 400,
            message: 'No file provided Client',
            file: undefined
        };
    }
    const file = await base64ToFile(file_data, file_name, file_type);
    return {
        status: res.status,
        message: res.message,
        file: file
    };
}
export async function Del(path, access) {
    return await del(path, access);
}
export async function List(path, access) {
    const res = await list(path, access);
    return {
        status: res.status,
        message: res.message,
        files: res.files || []
    };
}
