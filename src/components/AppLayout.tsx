import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  useNavigate,
  createSearchParams,
  Link,
  useSearchParams,
} from "react-router-dom";
import { useMutation } from "react-query";
import { webtoonData } from "../interfaces/webtoonData";
import { getSearchData } from "../api";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchAutoCompleteRef = useRef<HTMLInputElement>(null);

  const [searchParams] = useSearchParams();
  const searchResultValue = searchParams.get("search");

  const searchResult = useMutation<webtoonData[]>(
    ["searchResult", searchValue],
    () => getSearchData(searchValue)
  );

  useEffect(() => {
    if (!searchResultValue) {
      return setSearchValue("");
    }
    setSearchValue(searchResultValue);
  }, [searchResultValue]);

  const searchEnterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!searchValue) {
        return;
      }
      navigate({
        pathname: "/",
        search: createSearchParams({
          search: searchValue,
        }).toString(),
      });
      searchInputRef.current?.blur();
    }
  };

  const searchClickHandler = (value: webtoonData) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        search: value.title,
      }).toString(),
    });
    searchInputRef.current?.blur();
  };

  const searchOnChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  useEffect(() => {
    const searchDebounce = setTimeout(() => {
      searchResult.mutate();
    }, 200);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [searchValue]);

  return (
    <div className="flex flex-col items-center">
      <header className="pt-[20px] pb-[20px] md:w-[768px] w-[90%] flex flex-col items-center bg-white">
        <span className="text-center mb-[30px] w-full">
          <Link to="/">
            <h1 className="text-3xl font-bold">Webtoon</h1>
          </Link>
        </span>
        <div className="w-full md:w-[95%] relative">
          <input
            className="border border-gray-400 w-full outline-none p-3"
            placeholder="작가 / 작품을 입력하세요"
            value={searchValue}
            onKeyPress={searchEnterKeyHandler}
            onChange={searchOnChangeHandler}
            ref={searchInputRef}
          />
          <div
            className={
              searchInputRef.current === document.activeElement && searchValue
                ? "w-full bg-white border border-gray-300 absolute z-10 max-h-[240px] overflow-hidden"
                : "hidden"
            }
          >
            {searchResult.data &&
              searchResult.data.map((searchList) => {
                return (
                  <div
                    key={searchList._id}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    ref={searchAutoCompleteRef}
                    onClick={() => searchClickHandler(searchList)}
                  >
                    <span className="text-gray-400 text-sm mr-1">작품명: </span>
                    <span className="text-md mr-2">{searchList.title}</span>
                    <span className="text-gray-400 text-sm mr-1">작가: </span>
                    <span className="text-sm">{searchList.author}</span>
                  </div>
                );
              })}
            {!searchResult.data && searchValue && (
              <div className="p-3">결과가 없습니다</div>
            )}
          </div>
        </div>
      </header>
      <main className="w-full flex justify-center">
        <div className="md:w-[768px] w-[90%]">{children}</div>
      </main>
    </div>
  );
};

export default AppLayout;
