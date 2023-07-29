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
            return (
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
            )
        })}
    </div>
  )
}
