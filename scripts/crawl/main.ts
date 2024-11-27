import { db } from "@/lib/db";

const news = async () => {
  try {
    const res = await fetch("https://lf.snssdk.com/api/news/feed/v88/");
    const { data = [] } = await res.json();
    console.log(`data length ${data.length}`);
    db.article.createMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data.map(({ content: item }: any) => {
        const { title } = JSON.parse(item) || {};
        return {
          title,
        };
      }),
    });
  } catch (e) {
    console.log(e);
  }
};
news();
