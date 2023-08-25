import React, { useEffect, useState } from "react";
import { News } from "../../context/news/reducer";
import Article from "./Article";
import { useNewsState } from "../../context/news/context";

interface Props {
  filter: string;
  sortBy: string;
}

export default function ArticleList(props: Props) {
  const state: any = useNewsState();

  const { isLoading, isError, errorMessage } = state;
  let { news } = state;

  if (props.filter) {
    news = news.filter((newsItem: any) => {
      return newsItem.sport.name === props.filter;
    });
  }

  if (props.sortBy && props.sortBy !== "Sort By: ") {
    if (props.sortBy === "Date") {
      news = news.sort((a: News, b: News) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if (props.sortBy === "Title") {
      news = news.sort((a: News, b: News) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (props.sortBy === "Sport Type") {
      news = news.sort((a: News, b: News) => {
        if (a.sport.name < b.sport.name) {
          return -1;
        }
        if (a.sport.name > b.sport.name) {
          return 1;
        }
        return 0;
      });
    }
  }

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (news.length === 0) {
    return (
      <span className="ml-8 dark:text-white dark:bg-gray-700">
        No articles for this sport{" "}
      </span>
    );
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="overflow-y-auto dark:bg-gray-700 h-[50vh] relative bottom-0">
      {!isLoading &&
        news.map((newsItem: News) => {
          return <Article key={newsItem.id} news={newsItem} />;
        })}
    </div>
  );
}
