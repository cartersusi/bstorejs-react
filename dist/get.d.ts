interface BstoreGetServerResponse {
    status: number;
    message: string;
    file_name: string;
    file_type: string;
    file_data: string;
}
export declare function convertBlobToBase64(blob: Blob): Promise<string>;
export declare function get(path: string, access: 'public' | 'private'): Promise<BstoreGetServerResponse>;
export {};
