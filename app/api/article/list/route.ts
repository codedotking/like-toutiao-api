import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jsonbig from "json-bigint";

export const GET = async () => {
  const res = await db.article.findMany({
    take: 10,
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
