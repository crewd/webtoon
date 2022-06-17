import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { webtoonData } from "../interfaces/webtoonData";

const WebtoonDetail: React.FC<{
  onModal: () => void;
  webtoonInfomation: webtoonData | undefined;
}> = (props) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <div>
      <div
        className="bg-black/30 w-[100vw] h-[100vh] fixed top-0 left-0 z-10"
        onClick={props.onModal}
      ></div>

      <div className="w-fit h-fit p-[20px] bg-white fixed m-auto top-[50%] max-w-[90%] bottom-[50%] left-0 right-0 z-20 rounded-2xl">
        <button
          className="absolute -top-3 -right-2 w-[30px] h-[30px] rounded-full bg-white/70 hover:bg-white"
          onClick={props.onModal}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div className="flex sm:flex-row flex-col sm:items-center">
          <div className="sm:mr-10 w-full">
            <img
              src={props.webtoonInfomation?.img}
              alt={props.webtoonInfomation?._id}
              className="rounded-xl"
            />
          </div>
          <div className="h-full p-[15px] w-full flex flex-col">
            <div>
              <p className="h-[44px] leading-[44px] text-[16px] mr-4 text-gray-400 float-left">
                제목 :
              </p>
              <h1 className="leading-[normal] md:text-lg text-[18px] py-2 float-left">
                {props.webtoonInfomation?.title}
              </h1>
            </div>
            <div>
              <p className="h-[44px] leading-[44px] text-[16px] mr-4 text-gray-400 float-left">
                작가 :
              </p>
              <p className=" leading-[normal] md:text-lg text-[18px] py-2  float-left">
                {props.webtoonInfomation?.author}
              </p>
            </div>
            <div>
              <p className="h-[44px] leading-[44px] text-[16px] mr-4 text-gray-400 float-left">
                플랫폼 :
              </p>
              <p className="md:text-lg text-[18px] py-2 leading-[normal] float-left">
                {props.webtoonInfomation?.service}
              </p>
            </div>
            <div>
              <p className="h-[44px] leading-[44px] text-[16px] mr-4 text-gray-400 float-left">
                연재 요일 :
              </p>
              <p className="md:text-lg text-[18px] py-2 leading-[normal] float-left">
                {props.webtoonInfomation?.week.map((week) => {
                  if (week === 0) {
                    return "월 ";
                  }
                  if (week === 1) {
                    return "화 ";
                  }
                  if (week === 2) {
                    return "수 ";
                  }
                  if (week === 3) {
                    return "목 ";
                  }
                  if (week === 4) {
                    return "금 ";
                  }
                  if (week === 5) {
                    return "토 ";
                  }
                  return "일 ";
                })}
              </p>
            </div>
            <a
              href={props.webtoonInfomation?.url}
              target="_blank"
              rel="noreferrer"
              className="p-2 w-full bg-zinc-800 text-white hover:bg-zinc-800/70 text-center mt-[20px]"
            >
              바로 가기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonDetail;
