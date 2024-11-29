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
    };
  });

  const r = await db.article.createMany({
    data: articleList,
    skipDuplicates: true,
  });
  console.log(r.count);
};

const news = async () => {
  try {
    const res = await fetch("https://lf.snssdk.com/api/news/feed/v88/");
    const { data = [] } = await res.json();
    const articleList = data
      .map(({ content }: { content: string }) => {
        return jsonbig.parse(content) || {};
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
