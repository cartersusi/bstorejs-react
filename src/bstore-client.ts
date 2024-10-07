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

export interface BstorePutResponse {
    status: number;
    message: string;
    url?: string;
}

export interface BstoreDelResponse {
    status: number;
    message: string;
}

export interface BstoreListResponse {
    status: number;
    message: string;
    files: string[];
}

export interface BstoreGetResponse{
    status: number;
    message: string;
    file?: File;
}

async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
}

async function base64ToFile(base64String: string, fileName: string, mimeType: string): Promise<File> {
    const base64Data = base64String.split(',')[1] || base64String;
    
    const binaryString = atob(base64Data);
    
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const blob = new Blob([bytes], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
  }
  
export async function Put(path: string, file: File, access: 'public' | 'private'): Promise<BstorePutResponse> {
    const file_name = file.name;
    const file_data = await fileToBase64(file);
    
    return await put(path, file_data, file_name, access);
}

export async function Get(path: string, access: 'public' | 'private'): Promise<BstoreGetResponse> {
    const res = await get(path, access);
    console.log(res)

    const file_type = res.file_type;
    const file_name = res.file_name;
    const file_data = res.file_data;

    if (file_type == '' || file_name == '' || file_data == '' || !file_type || !file_name || !file_data) {
        console.log(file_name)
        console.log(file_type)
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
export async function Del(path: string, access: 'public' | 'private'): Promise<BstoreDelResponse> {
    return await del(path, access);
}

export async function List(path: string, access: 'public' | 'private'): Promise<BstoreListResponse> {
    const res = await list(path, access);
    return {
        status: res.status,
        message: res.message,
        files: res.files || []
    };
}

