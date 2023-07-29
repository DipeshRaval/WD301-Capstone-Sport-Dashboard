import React, { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { fetchNews } from "../../context/news/action";
import { useNewsDispatch, useNewsState } from "../../context/news/context";
import ArticleList from "./ArticleList";


export default function NewsContainer() {
  const state: any = useNewsState();

  const { news, isLoading, isError, errorMessage } = state;

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const newsDispatch = useNewsDispatch();

  useEffect(() => {
    fetchNews(newsDispatch);
  }, []);

  // const filteredNews = (e: any) => {
  //   const filterWith = e.target.textContent;

  //   const filteredData = news.filter((newsItem: any) => {
  //     if (newsItem.sport.name === filterWith) return newsItem;
  //   });
  //   setArticle(filteredData);
  // };

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 my-2">Treading News</h1>
      <div className="w-10/12">
        <div className="flex justify-between">
          <div className="flex text-gray-800 p-3">
            <p className="px-10 py-2 border-gray-800 border-b-4 border-grey-900 font-bold bg-gray-100 rounded">
              All news
            </p>
            <p className="px-10 py-2">Cricket</p>
            <p className="px-10 py-2">Basketball</p>
          </div>
          <div className="flex justify-between items-center">
            <select
              name=""
              id=""
              className="py-2 px-3 text-gray-600 bg-gray-100"
            >
              <option value="">Sort By : Date</option>
              <option value="date">Date</option>
              <option value="name">Title</option>
            </select>
            <div className="bg-gray-100 rounded mx-2 p-3 text-gray-600">
              <FunnelIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <ArticleList news={news}/>
    </div>
  );
}
