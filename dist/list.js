import { bstore } from "./bstore";
export async function list(path, access) {
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
