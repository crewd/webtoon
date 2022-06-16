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

      <div className="w-fit h-fit p-[30px] bg-white fixed m-auto top-[50%] bottom-[50%] left-0 right-0 z-20 ">
        <button
          className="absolute -top-7 -right-7 w-[30px] h-[30px] rounded-full bg-white/50"
          onClick={props.onModal}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div className="flex sm:flex-row flex-col">
          <img
            src={props.webtoonInfomation?.img}
            alt={props.webtoonInfomation?._id}
            className="md:mr-10 rounded-2xl"
          />
          <div className="p-[15px] h-full flex flex-col">
            <div className="flex">
              <p className="h-[40px] leading-[40px] text-base mr-5 text-gray-400">
                제목 :
              </p>
              <h1 className="text-xl h-[40px] leading-[40px]">
                {props.webtoonInfomation?.title}
              </h1>
            </div>
            <div className="flex leading-[40px]">
              <p className="h-[40px] leading-[40px] text-base mr-5 text-gray-400">
                작가 :
              </p>
              <h1 className="text-xl h-[40px] leading-[40px]">
                {props.webtoonInfomation?.author}
              </h1>
            </div>
            <div className="flex leading-[40px]">
              <p className="h-[40px] leading-[40px] text-base mr-5 text-gray-400">
                플랫폼 :
              </p>
              <h1 className="text-xl h-[40px] leading-[40px]">
                {props.webtoonInfomation?.service}
              </h1>
            </div>
            <div className="flex leading-[40px]">
              <p className="h-[40px] leading-[40px] text-base mr-5 text-gray-400">
                연재 요일 :
              </p>
              <h1 className="text-xl h-[40px] leading-[40px]">
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
              </h1>
            </div>
            <button className="p-2 w-full bg-black mt-[10px] text-white">
              바로 가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebtoonDetail;
