"use server";
import { bstore } from "./bstore";

interface BstoreDelResponse {
  status: number;
  message: string;
}

export async function del(path: string, access: 'public' | 'private'): Promise<BstoreDelResponse> {
  const res = await bstore({ 
      method: 2, 
      path: path, 
      access: access
  });
  return {
    status: res.status,
    message: res.message
  };
}