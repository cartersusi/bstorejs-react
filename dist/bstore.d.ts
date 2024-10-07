declare enum Method {
    GET = 0,
    PUT = 1,
    DELETE = 2,
    LIST = 3
}
interface BstoreRequest {
    method: Method;
    path: string;
    access: 'public' | 'private';
    file?: File;
}
interface BstoreResponse {
    status: number;
    message: string;
    url?: string;
    file_name?: string;
    file_type?: string;
    file_data?: string;
    files?: string[];
}
export declare function bstore({ method, path, access, file }: BstoreRequest): Promise<BstoreResponse>;
export {};
