import React, { useState } from "react";

const WeekList: React.FC = () => {
  const [tab, setTab] = useState<number>(0);
  const week: string[] = ["일", "월", "화", "수", "목", "금", "토"];

  const selectMenuHandler = (index: number) => {
    setTab(index);
  };

  return (
    <ul className="flex flex-row justify-around text-xl text-center">
      {week.map((day, index) => (
        <li
          className={
            tab === index
              ? "w-20 pb-4 border-b-2 border-black font-bold"
              : "w-20 pb-4"
          }
          key={day}
          onClick={() => selectMenuHandler(index)}
        >
          {day}
        </li>
      ))}
    </ul>
  );
};

export default WeekList;
