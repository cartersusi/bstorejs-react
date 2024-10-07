export declare const BstoreHost: string;
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
export interface BstoreGetResponse {
    status: number;
    message: string;
    file?: File;
}
export declare function Put(path: string, file: File, access: 'public' | 'private'): Promise<BstorePutResponse>;
export declare function Get(path: string, access: 'public' | 'private'): Promise<BstoreGetResponse>;
export declare function Del(path: string, access: 'public' | 'private'): Promise<BstoreDelResponse>;
export declare function List(path: string, access: 'public' | 'private'): Promise<BstoreListResponse>;
