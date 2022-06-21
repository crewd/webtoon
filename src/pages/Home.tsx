import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import WebtoonCard from "../components/WebtoonCard";
import Skeleton from "../components/Skeleton";

import { getDayWebtoon, getSearchData } from "../api";
import { webtoonData } from "../interfaces/webtoonData";
import WebtoonDetail from "../components/WebtoonDetail";

const Home: React.FC = () => {
  const [tab, setTab] = useState<number | string>(0);
  const [tabMenu, setTabMenu] = useState<number | string>(0);
  const [platform, setPlatform] = useState<string>("all");
  const [selectPlatform, setSelectPlatform] = useState<string>("전체");

  const [searchParams] = useSearchParams();
  const searchResultValue = searchParams.get("search");

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [webtoonId, setWebtoonId] = useState<string>("");
  const [webtoonInfo, setWebtoonInfo] = useState<webtoonData>();
  const [modalOpend, setModalOpend] = useState<boolean>(false);

  const today: number = new Date().getDay();
  const week: string[] = ["월", "화", "수", "목", "금", "토", "일", "완결"];
  const platformList = ["전체", "네이버 웹툰", "카카오 웹툰", "카카오 페이지"];
  const list: number[] = new Array(16).fill(0);

  const webtoonList = useQuery<webtoonData[]>(
    ["webtoonList", platform, tab],
    () => getDayWebtoon(platform, tab),
    {
      refetchOnWindowFocus: false, // window focus 설정
    }
  );

  const searchResult = useMutation<webtoonData[]>(
    ["searchResult", searchResultValue],
    () => getSearchData(searchResultValue)
  );

  useEffect(() => {
    searchResult.mutate();
  }, [searchResultValue]);

  const selectMenuHandler = useCallback((index: number) => {
    if (index === 7) {
      return setTab("finished");
    }
    setTab(index);
  }, []);

  useEffect(() => {
    if (today - 1 === -1) {
      return setTab(6);
    }
    if (today === 7) {
      setTab("finished");
    }
    setTab(today - 1);
  }, [searchResult.data]);

  useEffect(() => {
    if (tab === "finished") {
      return setTabMenu(7);
    }
    setTabMenu(tab);
  }, [tab]);

  const selectFlatformHandler = useCallback((company: string) => {
    setSelectPlatform(company);
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

  const getWebtoonId = useCallback((id: string) => {
    setWebtoonId(id);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpend(false);
  }, []);

  useEffect(() => {
    if (!webtoonId) {
      return setModalOpend(false);
    }
    setModalOpend(true);

    const webtoon = searchResult.data
      ? searchResult.data?.filter((id) => id._id === webtoonId)
      : webtoonList.data?.filter((id) => id._id === webtoonId);
    setWebtoonInfo(webtoon?.[0]);
  }, [webtoonId]);

  useEffect(() => {
    if (!modalOpend) {
      setWebtoonId("");
    }
  }, [modalOpend]);

  return (
    <div>
      {modalOpend && (
        <WebtoonDetail onModal={closeModal} webtoonInfomation={webtoonInfo} />
      )}

      {!searchResult.data && (
        <ul className="flex flex-row justify-between text-xl text-center">
          {week.map((day, index) => (
            <li
              className={
                tabMenu === index
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
      )}
      <div className="flex flex-col items-end mt-[20px]">
        {!searchResult.data && (
          <div
            className="w-[140px] flex justify-center items-center p-3 cursor-pointer relative"
            onClick={() => setIsOpened(!isOpened)}
          >
            <p className="mr-3">{selectPlatform}</p>
            <FontAwesomeIcon icon={faAngleDown} />
            <ul
              className={
                isOpened === true
                  ? "rounded-md border border-gray-100 shadow-md w-[150px] text-center absolute top-10 z-1 bg-white"
                  : "hidden"
              }
            >
              {platformList.map((company, index) => (
                <li
                  key={company}
                  className={
                    index === 0 || index === 3
                      ? "p-4 cursor-pointer hover:bg-gray-100 rounded-md"
                      : "p-4 cursor-pointer hover:bg-gray-100"
                  }
                  onClick={() => selectFlatformHandler(company)}
                >
                  {company}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="w-full flex flex-wrap">
        {webtoonList.isLoading &&
          list.map((list, index) => <Skeleton key={index} />)}
        {searchResult.isLoading &&
          list.map((list, index) => <Skeleton key={index} />)}
        {!searchResult.data &&
          !searchResult.isLoading &&
          webtoonList.data?.map((webtoon) => (
            <WebtoonCard
              key={webtoon._id}
              webtoonInfo={webtoon}
              getId={() => getWebtoonId(webtoon._id)}
            />
          ))}
        {searchResult.data &&
          searchResult.data.map((webtoon) => (
            <WebtoonCard
              key={webtoon._id}
              webtoonInfo={webtoon}
              getId={() => getWebtoonId(webtoon._id)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
