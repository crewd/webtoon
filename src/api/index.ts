import axios from "axios";

const host = "https://korea-webtoon-api.herokuapp.com";

export const getDayWebtoon = async (day: number, company: string) => {
  const data = await axios.post(`${host}/${company}/week?day=${day}`);
  return data;
};
