import { NextRequest } from "next/server";

export const toSearchParams = (req: NextRequest) => {
    const { searchParams } = req.nextUrl;
    // 转换 searchParams 为普通对象
    return Object.fromEntries(searchParams.entries());
};