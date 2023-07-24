import React, { useEffect } from "react";
import { fetchNews } from "../../context/news/action";
import { useNewsDispatch, useNewsState } from "../../context/news/context";
import { News } from "../../context/news/reducer"

export default function Article() {
  const newsDispatch = useNewsDispatch();
  useEffect(() => {
    fetchNews(newsDispatch);
  }, []);

  const state: any = useNewsState();

  const { news, isLoading, isError, errorMessage } = state;

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const getFormatedDate = (date:string) => {
    const newDate = new Date(date)
    const formatDate = newDate.toDateString();

    return `${formatDate}`
  }

  return (
    <>
      {news.map((news: News) => {
        return (
          <div className="flex px-4 my-2">
            <div className="border rounded-md flex items-center">
              <div className="px-4">
                <p className="text-gray-700">{news.sport.name}</p>
                <h2 className="my-1 text-gray-800 text-2xl font-bold">
                  {news.title}
                </h2>
                <p className="text-gray-900">
                  {news.summary.substring(0,200)}...
                </p>
                <div className="flex justify-between my-1">
                  <p className="font-bold text-gray-500">{getFormatedDate(news.date?.substring(0,10))}</p>
                  <p className="underline">Read more...</p>
                </div>
              </div>

              <div className="w-4/12">
                <img
                  src={news.thumbnail}
                  alt="thumbnail"
                  className="ml-auto h-48 w-48"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
