const news = async () => {
  try {
    const res = await fetch("https://lf.snssdk.com/api/news/feed/v88/");
    const { data = [] } = await res.json();
    console.log(`data length ${data.length}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.forEach(({content: item}) => {
      const { title } = item;
      console.log(item);
    });
  } catch (e) {
    console.log(e);
  }
};
news();
