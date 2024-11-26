import { NextResponse } from "next/server";
import { data } from "@/data/hotboard";

export const GET = () => {
    return NextResponse.json({
        code: 200,
        msg: "api",
        data: data
    });
};
