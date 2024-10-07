"use server";
import { bstore } from "./bstore";
async function base64ToArrayBuffer(base64) {
    const base64Content = base64.split(',')[1];
    const binaryString = atob(base64Content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
export async function put(path, file_data, file_name, access) {
    const arrayBuffer = await base64ToArrayBuffer(file_data);
    const file = new File([arrayBuffer], file_name);
    if (!file) {
        return {
            status: 400,
            message: 'No file provided',
            url: ''
        };
    }
    const res = await bstore({ method: 1,
        path: path,
        access: access,
        file: file
    });
    return {
        status: res.status,
        message: res.message,
        url: res.url || ''
    };
}
