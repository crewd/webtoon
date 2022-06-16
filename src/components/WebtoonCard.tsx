import React from "react";
import { webtoonData } from "../interfaces/webtoonData";

const WebtoonCard: React.FC<{ webtoonInfo: webtoonData }> = ({
  webtoonInfo,
}) => {
  return (
    <div className="w-1/2 sm:w-1/3 p-3 md:w-1/4 rounded-md cursor-pointer ">
      <div className="hover:shadow-2xl hover:scale-110 z-99">
        <div>
          <img
            src={webtoonInfo.img}
            alt={webtoonInfo.title}
            className="w-full rounded-t-md"
          />
        </div>
        <div className="text-md text-center rounded-b-md bg-zinc-800 text-white p-1">
          <p>{webtoonInfo.title}</p>
        </div>
      </div>
    </div>
  );
};

export default WebtoonCard;
