import { bstore } from "./bstore";

interface BstoreListResponse {
  status: number;
  message: string;
  files?: string[];
}

export async function list(path: string, access: 'public' | 'private'): Promise<BstoreListResponse> {
  const res = await bstore({ 
      method: 3, 
      path: path, 
      access: access
  });
  return {
    status: res.status,
    message: res.message,
    files: res.files
  };
}
