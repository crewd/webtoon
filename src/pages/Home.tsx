import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { getDayWebtoon } from "../api";
import { webtoonData } from "../models/webtoonData";

const Home: React.FC = () => {
  const [tab, setTab] = useState<number>(0);
  const [platform, setPlatform] = useState<string>("all");
  const [selectPlatform, setSelectPlatform] = useState<string>("전체");
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const today: number = new Date().getDay();
  const week: string[] = ["월", "화", "수", "목", "금", "토", "일"];
  const platformList = ["전체", "네이버 웹툰", "카카오 웹툰", "카카오 페이지"];

  const webtoonList = useQuery<any, AxiosError>(
    ["webtoonList", platform, tab],
    () => getDayWebtoon(platform, tab)
  );

  const selectMenuHandler = (index: number) => {
    setTab(index);
  };

  const selectFlatformHandler = (company: string) => {
    setSelectPlatform(company);
    setIsOpened(false);
  };

  console.log(webtoonList.data);

  useEffect(() => {
    if (today - 1 === -1) {
      return setTab(6);
    }
    return setTab(today - 1);
  }, []);

  useEffect(() => {
    if (selectPlatform === "네이버 웹툰") {
      return setPlatform("naver");
    }

    if (selectPlatform === "카카오 웹툰") {
      return setPlatform("kakao");
    }

    if (selectPlatform === "카카오 페이지") {
      return setPlatform("kakao-page");
    }
    return setPlatform("all");
  }, [selectPlatform]);

  useEffect(() => {
    setIsOpened(false);
  }, [platform]);

  return (
    <div>
      <ul className="flex flex-row justify-between text-xl text-center">
        {week.map((day, index) => (
          <li
            className={
              tab === index
                ? "w-20 pb-4 border-b-2 border-black font-bold cursor-pointer"
                : "w-20 pb-4 cursor-pointer"
            }
            key={day}
            onClick={() => selectMenuHandler(index)}
          >
            {day}
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-end mt-[20px]">
        <div
          className="w-[140px] flex justify-center items-center p-3 cursor-pointer"
          onClick={() => setIsOpened(!isOpened)}
        >
          <p className="mr-3">{selectPlatform}</p>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>

        <ul
          className={
            isOpened === true
              ? "rounded-md shadow-md w-[150px] text-center"
              : "hidden"
          }
        >
          {platformList.map((company) => (
            <li
              key={company}
              className="p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => selectFlatformHandler(company)}
            >
              {company}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
