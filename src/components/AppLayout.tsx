import React from "react";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <header className="pt-[20px] pb-[20px] md:w-[768px] w-full flex flex-col items-center bg-white">
        <span className="text-center mb-[30px] w-full">
          <h1 className="text-3xl font-bold">Webtoon</h1>
        </span>
        <input
          className="border border-gray-400 w-full outline-none p-2"
          placeholder="작가 / 작품을 입력하세요"
        />
      </header>
      <main className="w-full flex justify-center">
        <div className="md:w-[768px] w-full">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
