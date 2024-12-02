import { db } from "@/lib/db";
import jsonbig from "json-bigint";
interface userInfo {
  name: string;
  description: string;
  verified_content: string;
  follow: boolean;
  follower_count: number;
  schema: string;
  avatar_url: string;
  user_id: string;
  user_verified: boolean;
  user_auth_info: string;
  live_info_type: number;
}
interface Articele {
  title: string;
  source: string;
  authorId: number;
  article_type: number;
  abstract: string;
  item_id: string;
  user_info: userInfo;

  has_image: boolean;
  has_m3u8_video: boolean;
  has_mp4_video: boolean;
  has_video: boolean;

  image_type: string;
  like_count: number;
  digg_count: number;
  bury_count: number;
  comment_count: number;
  read_count: number;
  repin_count: number;
  share_count: number;

  publish_time: number;
}

const insertUserList = async (data: Articele[]) => {
  const userList = data.map((item) => {
    const { user_info }: Articele = item;
    return user_info;
  });

  // 插入用户信息
  const { count } = await db.user.createMany({
    data: userList
      .filter((item: userInfo) => item)
      .map((item: userInfo) => {
        return {
          user_id: `${item.user_id}`,
          name: item.name,
          description: item.description,
          verified_content: item.verified_content,
          user_verified: item.user_verified,
          follower_count: item.follower_count,
          avatar_url: item.avatar_url,
          password: "securepassword123",
          email: null,
        };
      }),
    skipDuplicates: true,
  });
  console.log(count);
};

const insertArticleList = async (data: Articele[]) => {
  const userList = await db.user.findMany();
  const userIdDict = userList.reduce((acc, item) => {
    acc[item.user_id] = item.id;
    return acc;
  }, {} as Record<string, number>);

  // 插入文章
  const articleList = data.map((item: Articele) => {
    const {
      title = "",
      user_info: { user_id },
      article_type,
      abstract,
      item_id: article_id,

      has_image = false,
      has_m3u8_video = false,
      has_mp4_video = false,
      has_video = false,

      image_type = "",
      like_count = 0,
      digg_count = 0,
      bury_count = 0,
      comment_count = 0,
      read_count = 0,
      repin_count = 0,
      share_count = 0,
      publish_time,

    } = item;
    const authorId = userIdDict[user_id];
    return {
      title,
      authorId,
      type: article_type,
      abstract,
      published: true, // 爬取的文章直接发布
      source: "toutiao",
      is_crawled: true,
      article_id,
      json: jsonbig.stringify(item),

      has_image,
      has_m3u8_video,
      has_mp4_video: !!has_mp4_video,
      has_video,

      image_type,
      like_count,
      digg_count,
      bury_count,
      comment_count,
      read_count,
      repin_count,
      share_count,
      publish_time,
    };
  });

  const r = await db.article.createMany({
    data: articleList,
    skipDuplicates: true,
  });
  console.log(r.count);
};

export const news = async () => {
  try {
    const res = await fetch("https://lf.snssdk.com/api/news/feed/v88/");
    const { data = [] } = await res.json();
    const articleList = data
      .map(({ content }: { content: string }) => {
        const item = jsonbig.parse(content) || {};
        return item;
      })
      .filter(
        ({ user_info }: { user_info: userInfo }) => user_info
      ) as Articele[];
    await insertUserList(articleList);
    await insertArticleList(articleList);
  } catch (e) {
    console.log(e);
  }
};

news();
