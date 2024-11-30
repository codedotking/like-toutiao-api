import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jsonbig from "json-bigint";
import { toSearchParams } from "@/lib/request";

export const GET = async (req:NextRequest) => {
  const {pageNo = 1,pageSize = 10} = toSearchParams(req);
  const take = Number(pageSize) || 10;
  const skip = (Number(pageNo) - 1) * take;
  const res = await db.article.findMany({
    take,
    skip,
    include: {
      author: {
        select: {
          name: true,
          avatar_url: true,
          description: true,
          user_verified: true,
          verified_content: true,
        },
      },
    },
    where: {
      published: true,
    },
  });


  return NextResponse.json({
    code: 200,
    msg: "api",
    data: jsonbig.parse(jsonbig.stringify(res)),
  });
};
