"use server";
import { bstore } from "./bstore";
import { Buffer } from 'buffer';
export async function convertBlobToBase64(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer.toString('base64');
}
export async function get(path, access) {
    const res = await bstore({
        method: 0,
        path: path,
        access: access
    });
    console.log(res);
    const file_name = res.file_name;
    const file_type = res.file_type;
    const file_data = res.file_data;
    if (file_type == '' || file_name == '' || file_data == '' || !file_type || !file_name || !file_data) {
        return {
            status: 400,
            message: 'No file provided Server',
            file_name: '',
            file_type: '',
            file_data: ''
        };
    }
    return {
        status: res.status,
        message: res.message,
        file_name: file_name || '',
        file_type: file_type || '',
        file_data: file_data || ''
    };
}
