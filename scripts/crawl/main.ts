import { db } from "@/lib/db";

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
  const userIdDict = await getUserIdDict();

  const articleList = data.map((item: Articele) => {
    const {
      title = "",
      user_info: { user_id },
      article_type,
      abstract,
    } = item;
    const authorId = userIdDict[user_id];
    return {
      title,
      authorId,
      type: article_type,
      abstract,
    };
  });

  const r = await db.article.createMany({
    data: articleList,
  });
  console.log(r.count);
};

const getUserIdDict = async () => {
  const userList = await db.user.findMany();
  return userList.reduce((acc, item) => {
    acc[item.user_id] = item.id;
    return acc;
  }, {} as Record<string, number>);
};

const news = async () => {
  try {
    const res = await fetch("https://lf.snssdk.com/api/news/feed/v88/");
    const { data = [] } = await res.json();
    const articleList = data
      .map(({ content }: { content: string }) => {
        return JSON.parse(content) || {};
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
