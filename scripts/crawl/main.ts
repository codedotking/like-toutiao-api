import { db } from "@/lib/db";

interface userInfo {
  name: string;
  description: string;
  verified_content: string;
  follow: boolean;
  follower_count: number;
  schema: string;
  avatar_url: string;
  user_id: number;
  user_verified: boolean;
  user_auth_info: string;
  live_info_type: number;
}
interface Articele {
  title: string;
  source: string;
  user_info: userInfo;
}

const insertUserList = async (data: { content: string }[]) => {
  const userList = data
    .map(({ content }: { content: string }) => {
      const { user_info }: Articele = JSON.parse(content) || {};
      return user_info;
    })
    .filter((item: userInfo) => item);

  // 插入用户信息
  const u = await db.user.createMany({
    data: userList
      .filter((item: userInfo) => item)
      .map((item: userInfo) => {
        return {
          name: item.name,
          description: item.description,
          verified_content: item.verified_content,
          user_verified: item.user_verified,
          follower_count: item.follower_count,
          avatar_url: item.avatar_url,
          password: "securepassword123",
          email: `${item.user_id}@example.com`,
        };
      }),
  });
  console.log(u.count);
};

const news = async () => {
  try {
    const res = await fetch("https://lf.snssdk.com/api/news/feed/v88/");
    const { data = [] } = await res.json();
    console.log(`data length ${data.length}`);
    try {
      await insertUserList(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.log("出错");
    }

    const r = await db.article.createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data.map(({ content: item }: any) => {
        const { title = "" } = JSON.parse(item) || {};
        return {
          title,
        };
      }),
    });
    console.log(r.count);
  } catch (e) {
    console.log(e);
  }
};
news();
