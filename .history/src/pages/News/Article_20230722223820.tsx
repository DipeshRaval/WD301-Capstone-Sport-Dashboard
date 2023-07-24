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

  const getFormatedTimeDate = (date:string) => {
    const newDate = new Date(date)
    const formatDate = newDate.toDateString();

    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
    const newformat = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formatedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${newformat}`

    return `${formatDate} ${formatedTime}`
  }

  return (
    <>
      <div className="flex px-4">
        <div className="border rounded-md flex items-center my-3">
          <div className="px-4">
            <p className="text-gray-700">Cricket</p>
            <h2 className="my-1 text-gray-800 text-2xl font-bold">
              The Heading{" "}
            </h2>
            <p className="text-gray-900">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
              ipsum non expedita perferendis aliquam quis? Obcaecati beatae
              doloremque possimus provident! Ut recusandae expedita accusantium,
              aperiam odit odio possimus, ab illum fugiat id consectetur.......
            </p>
            <div className="flex justify-between my-1">
              <p className="font-bold text-gray-500">Dec 12, 2023</p>
              <p className="underline">Read more...</p>
            </div>
          </div>

          <div className="w-4/12">
            <img
              src="https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/08/image-url-3.jpg"
              alt="hhh"
              className="ml-auto"
            />
          </div>
        </div>
      </div>
      <div className="flex px-4">
        <div className="border rounded-md flex items-center">
          <div className="px-4">
            <p className="text-gray-700">Cricket</p>
            <h2 className="my-1 text-gray-800 text-2xl font-bold">
              The Heading
            </h2>
            <p className="text-gray-900">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis
              ipsum non expedita perferendis aliquam quis? Obcaecati beatae
              doloremque possimus provident! Ut recusandae expedita accusantium,
              aperiam odit odio possimus, ab illum fugiat id consectetur.......
            </p>
            <div className="flex justify-between my-1">
              <p className="font-bold text-gray-500">Dec 12, 2023</p>
              <p className="underline">Read more...</p>
            </div>
          </div>

          <div className="w-4/12">
            <img
              src="https://i.pinimg.com/1200x/89/09/46/890946b91c1c665fd4cd7acfcbcc7df7.jpg"
              alt="hhh"
              className="ml-auto"
            />
          </div>
        </div>
      </div>

      {news.map((news: News) => {
        return (
          <div className="flex px-4">
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
                  <p className="font-bold text-gray-500"></p>
                  <p className="underline">Read more...</p>
                </div>
              </div>

              <div className="w-4/12">
                <img
                  src={news.thumbnail}
                  alt="thumbnail"
                  className="ml-auto"
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
