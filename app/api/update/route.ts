import { news } from "@/scripts/crawl/main";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await news();
  } catch (e) {
    return NextResponse.json({
      msg: `error ${e}`,
    });
  }
  return NextResponse.json({
    msg: "success",
  });
};
