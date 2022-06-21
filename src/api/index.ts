import axios from "axios";

const host = "https://korea-webtoon-api.herokuapp.com";

export const getDayWebtoon = async (platform: string, day: number | string) => {
  if (day === "finished") {
    const { data } = await axios.get(
      `${host}/${encodeURIComponent(platform)}/${day}`
    );
    return data;
  }
  const { data } = await axios.get(
    `${host}/${encodeURIComponent(platform)}/week?day=${day}`
  );
  return data;
};

export const getSearchData = async (searchData: string | null) => {
  if (!searchData) {
    return;
  }
  const { data } = await axios.get(`${host}/search?keyword=${searchData}`);
  if (data.statusCode) {
    return;
  }
  return data;
};
