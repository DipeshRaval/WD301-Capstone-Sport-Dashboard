import React, {useEffect, useState} from 'react'
import { News } from "../../context/news/reducer";
import Article from "./Article";
import { fetchNews } from "../../context/news/action";
import { useNewsDispatch, useNewsState } from "../../context/news/context";

interface Props {
    filter : string;
}

export default function ArticleList(props: Props) {
  const state: any = useNewsState();

  const { news, isLoading, isError, errorMessage } = state

  const [article, setArticle] = useState([]);

  const newsDispatch = useNewsDispatch();

  useEffect(() => {
    fetchNews(newsDispatch);
  }, []);

  const filteredNews = (e: any) => {

    const filteredData = news.filter((newsItem: any) => {
      if (newsItem.sport.name === filterWith) return newsItem;
    });
  };

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }


  return (
    <div className="overflow-y-auto w-10/12 h-[65vh] relative bottom-0">
        {news.map((news: News) => {
            return <Article key={news.id} news={news} />;
        })}
    </div>
  )
}
