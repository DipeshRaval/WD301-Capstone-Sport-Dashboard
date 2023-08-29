import React, { useEffect} from "react";
import ListNews from "./ListNews";
import { Outlet } from "react-router-dom";
import { useNewsDispatch } from "../../context/news/context";

export default function NewsContainer() {

  const newsDispatch = useNewsDispatch();

  useEffect(() => {
    fetchNews(newsDispatch);
  }, []);

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white my-2">
        Treading News
      </h1>
      <div>
        <ListNews />
        <Outlet />
      </div>
    </div>
  );
}
