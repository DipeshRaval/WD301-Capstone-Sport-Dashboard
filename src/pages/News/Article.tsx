import React from "react";
import { News } from "../../context/news/reducer";
import { Link } from "react-router-dom";

interface Props {
  key: number;
  news: News;
}

export default function Article(props: Props) {
  const news = props.news;
  const getFormatedDate = (date: string) => {
    const newDate = new Date(date);
    const formatDate = newDate.toDateString();
    return `${formatDate}`;
  };

  return (
    <>
      <Link to={`/abc/dashboard/articles/${news.id}`}>
        <div className="flex justify-between w-full px-4 my-2">
          <div className="border rounded-md w-full dark:bg-gray-800 bg-white flex justify-between items-center">
            <div className="px-4">
              <p className="text-gray-700 dark:text-white">{news.sport.name}</p>
              <h2 className="my-1 dark:text-white text-gray-800 text-2xl font-bold">
                {news.title}
              </h2>
              <div className="flex">
                {news.teams.length !== 0 ? (
                  <span className="font-bold mr-2">Team : </span>
                ) : (
                  ""
                )}
                <span>
                  {news.teams
                    .map((item) => {
                      return ` ${item.name} `;
                    })
                    .join(" Vs ")}
                </span>
              </div>
              <p className="text-gray-900 dark:text-gray-100">
                {news.summary.substring(0, 200)}...
              </p>
              <div className="flex justify-between my-1">
                <p className="font-bold text-gray-500">
                  {getFormatedDate(news.date?.substring(0, 10))}
                </p>
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
      </Link>
    </>
  );
}
