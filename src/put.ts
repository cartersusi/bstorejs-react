"use server";
import { bstore } from "./bstore";

interface BstorePutServerResponse {
    status: number;
    message: string;
    url: string;
}

async function base64ToArrayBuffer(base64: string): Promise<ArrayBuffer> {
    const base64Content = base64.split(',')[1];
    const binaryString = atob(base64Content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer as ArrayBuffer;
}

export async function put(path: string, file_data: string, file_name: string, access: 'public' | 'private'): Promise<BstorePutServerResponse> {
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