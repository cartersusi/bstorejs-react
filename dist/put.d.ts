interface BstorePutServerResponse {
    status: number;
    message: string;
    url: string;
}
export declare function put(path: string, file_data: string, file_name: string, access: 'public' | 'private'): Promise<BstorePutServerResponse>;
export {};
