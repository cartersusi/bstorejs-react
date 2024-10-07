"use server";
import { bstore } from "./bstore";
export async function del(path, access) {
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
