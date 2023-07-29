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
      <Link to={`/articles/${news.id}`}>
        <div className="flex px-4 my-2">
          <div className="border rounded-md flex items-center">
            <div className="px-4">
              <p className="text-gray-700">{news.sport.name}</p>
              <h2 className="my-1 text-gray-800 text-2xl font-bold">
                {news.title}
              </h2>
              <p className="text-gray-900">
                {news.summary.substring(0, 200)}...
              </p>
              <div className="flex justify-between my-1">
                <p className="font-bold text-gray-500">
                  {getFormatedDate(news.date?.substring(0, 10))}
                </p>
                {/* <Link to={`/articles/${news.id}`}>
                  <p className="underline">Read more...</p>
                </Link> */}
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
