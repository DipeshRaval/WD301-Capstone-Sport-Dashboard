import React, { useContext, useState } from 'react'
import { News } from "../../context/news/reducer";
import { useNewsState } from "../../context/news/context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { CustomizeContext } from "../../context/customizeState";
import { FetchPreferences } from '../Preferances';

interface Props {
  filter: string;
  sortType: string;
}

export default function ArticleList(props: Props) {
  const state: any = useNewsState();
  
  const { isLoading, isError, errorMessage } = state;
  let { news } = state;

  const [newsState, setNewsState] = useState(news)

  // if (props.filter) {
  //   news = news.filter((newsItem: any) => {
  //     return newsItem.sport.name === props.filter;
  //   });
  // }

  if (props.sortType && props.sortType !== "Sort By: ") {
    if (props.sortType === "Date") {
      news = news.sort((a: News, b: News) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if (props.sortType === "Title") {
      news = news.sort((a: News, b: News) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (props.sortType === "Sport Type") {
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

  const { isOpen } = useContext(CustomizeContext);
  const isLoggedIn = !!localStorage.getItem("userData");

  const settingNewsState = async () => {
    if(isLoggedIn){
      const data = await FetchPreferences()
      if(Object.keys(data.preferences).length)
      {
        if (props.filter) {
          setNewsState(news.filter((newsItem: any) => {
            return newsItem.sport.name === props.filter;
          }))
        }else{
          if(data?.preferences.SelectedSport.length)
          {
            setNewsState(news.filter((newsItem: any) => {
              return data?.preferences.SelectedSport.includes(newsItem.sport.name);
            }))
          }else{
            setNewsState(news)
          }
        }
      }
    }else{
      if (props.filter) {
        setNewsState(news.filter((newsItem: any) => {
          return newsItem.sport.name === props.filter;
        }))
      }else{
        setNewsState(news)
      }
    }
  }

  useEffect(()=>{
   settingNewsState()
  }, [isOpen, isLoading, props])

  const getFormatedDate = (date: string) => {
    const newDate = new Date(date);
    const formatDate = newDate.toDateString();
    return `${formatDate}`;
  };

  if (news.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (newsState.length === 0) {
    return (
      <span className="ml-8 dark:text-white dark:bg-gray-700">
        No articles for this sport{" "}
      </span>
    );
  }

  return (
    <div className="overflow-y-auto dark:bg-gray-700 h-[70vh] relative bottom-0">
      {!isLoading &&
        newsState.map((newsItem: News) => {
          return (
            <div key={newsItem.id} className="flex justify-between w-full px-4 my-2">
              <div className="border rounded-md w-full dark:bg-gray-800 bg-white flex justify-between items-center">
                <div className="px-4">
                  <p className="text-gray-700 dark:text-white">
                    {newsItem.sport.name}
                  </p>
                  <h2 className="my-1 dark:text-white text-gray-800 text-2xl font-bold">
                    {newsItem.title}
                  </h2>
                  <div className="flex">
                    {newsItem.teams.length !== 0 ? (
                      <span className="font-bold mr-2">Team : </span>
                    ) : (
                      ""
                    )}
                    <span>
                      {newsItem.teams
                        .map((item : any) => {
                          return ` ${item.name} `;
                        })
                        .join(" Vs ")}
                    </span>
                  </div>
                  <p className="text-gray-900 dark:text-gray-100">
                    {newsItem.summary.substring(0, 200)}...
                  </p>
                  <div className="flex justify-between my-1">
                    <p className="font-bold text-gray-500">
                      {getFormatedDate(newsItem.date?.substring(0, 10))}
                    </p>
                    <Link to={`/articles/${newsItem.id}`}>
                      <p className="underline hover:text-blue-600 transiton duration-400">
                        Read more...
                      </p>
                    </Link>{" "}
                  </div>
                </div>

                <div className="w-4/12">
                  <img
                    src={newsItem.thumbnail}
                    alt="thumbnail"
                    className="ml-auto h-48 w-48"
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
