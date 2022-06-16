import React from "react";

const Skeleton: React.FC = () => {
  return (
    <div className="w-1/2 sm:w-1/3 md:w-1/4 p-3 md:h-[210.25px] sm:h-[229.83px] h-[229.06px] animate-pulse ">
      <div className="w-full bg-gray-300 rounded-t-md h-[calc(100%-25px)]"></div>
      <div className="text-md text-center rounded-b-md bg-white border border-gray-300 text-white p-1 flex justify-center">
        <div className="w-4/5 bg-gray-300 h-[15px]"></div>
      </div>
    </div>
  );
};

export default Skeleton;
