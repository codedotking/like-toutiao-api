import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jsonbig from "json-bigint";
import { toSearchParams } from "@/lib/request";

export const GET = async (req: NextRequest) => {
  const { pageNo = 1, pageSize = 10 } = toSearchParams(req);
  const take = Number(pageSize) || 10;
  const skip = (Number(pageNo) - 1) * take;
  const res = await db.article.findMany({
    take,
    skip,
    select: {
      id: true,
      title: true,
      abstract: true,
      content: true,
      type: true,
      published: true,
      authorId: true,
      like_count: true,
      digg_count: true,
      bury_count: true,
      comment_count: true,
      read_count: true,
      repin_count: true,
      share_count: true,
      is_crawled: true,
      source: true,
      article_id: true,
      has_image: true,
      has_m3u8_video: true,
      has_mp4_video: true,
      has_video: true,
      image_type: true,
      publish_time: true,
      images: {
        select: { width: true, height: true, url: true, uri: true },
      },
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
