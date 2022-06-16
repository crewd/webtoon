export interface webtoonData {
  _id: string;
  title: string;
  author: string;
  url: string;
  img: string;
  service: string;
  week: number[];
  additional: {
    new: boolean;
    adult: boolean;
    rest: boolean;
    up: boolean;
  };
}
