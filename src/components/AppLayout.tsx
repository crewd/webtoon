import React from "react";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <header className="pt-[20px] pb-[20px] lg:w-[1024px] flex flex-col items-center">
        <span className="text-center mb-[30px] w-full">
          <h1 className="text-3xl font-bold">Webtoon</h1>
        </span>
        <input
          className="border border-slate-400 w-full outline-none p-2"
          placeholder="작가 / 작품을 입력하세요"
        />
      </header>
      <main className="lg:w-[1024px]">{children}</main>
    </div>
  );
};

export default AppLayout;
