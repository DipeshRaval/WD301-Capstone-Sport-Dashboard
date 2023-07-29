import React, {useEffect, useState} from 'react'
import { News } from "../../context/news/reducer";
import Article from "./Article";
import { useNewsState } from "../../context/news/context";

interface Props {
    filter : string;
}

export default function ArticleList(props: Props) {
  const state: any = useNewsState();

  const { news, isLoading, isError, errorMessage } = state

  const [article, setArticle] = useState([]);

  const filterArticles = (filter : string) => {
    if(filter === ""){
      setArticle(news)
    }else{
      const filteredData = news.filter((newsItem: any) => {
        if (newsItem.sport.name === props.filter) return newsItem;
      });
      setArticle(filteredData)
    }
  }

  useEffect(()=>{
    filterArticles(props.filter)
  }, [props.filter])

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if(article.length === 0)
  {
    return <span>No articles for this sport </span>
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
  
  return (
    <div className=`overflow-y-auto w-10/12 h-[65vh] relative bottom-0` >
        {article.map((news: News) => {
            return <Article key={news.id} news={news} />;
        })}
    </div>
  )
}
