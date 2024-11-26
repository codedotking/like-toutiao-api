import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    const users = await db.user.findMany();

    return NextResponse.json({
        code: 200,
        msg: "api",
        data: users,
    });
};
