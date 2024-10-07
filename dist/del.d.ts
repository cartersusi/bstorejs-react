interface BstoreDelResponse {
    status: number;
    message: string;
}
export declare function del(path: string, access: 'public' | 'private'): Promise<BstoreDelResponse>;
export {};
