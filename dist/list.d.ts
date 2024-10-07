interface BstoreListResponse {
    status: number;
    message: string;
    files?: string[];
}
export declare function list(path: string, access: 'public' | 'private'): Promise<BstoreListResponse>;
export {};
