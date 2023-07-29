import React, {useEffect, useState} from 'react'
import { News } from "../../context/news/reducer";
import Article from "./Article";
import { useNewsState } from "../../context/news/context";
import { Link } from 'react-router-dom';

interface Props {
    filter : string;
}

export default function ArticleList(props: Props) {
  const state: any = useNewsState();

  const { isLoading, isError, errorMessage } = state
  let {news} = state
  const [article, setArticle] = useState(news);

  const filterArticles = (filter : string) => {
    if(filter){ 
      news = news.filter((newsItem: any) => {
        return newsItem.sport.name === props.filter
      });
      setArticle(news)
    }else
      setArticle(news)
  }

  useEffect(()=>{
    filterArticles(props.filter)
  }, [props.filter])

  if (article.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if(news.length === 0)
  {
    return <span>No articles for this sport </span>
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  console.log(isLoading);

  const getFormatedDate = (date: string) => {
    const newDate = new Date(date);
    const formatDate = newDate.toDateString();
    return `${formatDate}`;
  };
  
  return (
    <div className="overflow-y-auto w-10/12 h-[65vh] relative bottom-0">
        {!isLoading && article.map((news: News) => {
            return (<Article key={news.id} news={news} />)
        })}
    </div>
  )
}
