import React, { useEffect, useContext, useState } from "react";
import { useNewsState } from "../../context/news/context";
import { News } from "../../context/news/reducer";
import { Link } from "react-router-dom";
import { CustomizeContext } from "../../context/customizeState";

interface Props {
  fevSport: string;
  fevTeam: string;
}

export default function FevArticles(props: Props) {
  const { fevSport, fevTeam } = props;

  const state: any = useNewsState();
  const { isLoading, isError, errorMessage } = state;
  let { news } = state;

  const [fevArticles, setFevArticles] = useState(news)
  const isLoggedIn = !!localStorage.getItem("userData");
  const {isOpen} = useContext(CustomizeContext)

  useEffect(()=>{
    (async () => {
      if(isLoggedIn)
      {

      }else{
        if(fevSport || fevTeam)
        {
          if (fevSport && fevSport !== "Favourite Sport") {
            setFevArticles(news.filter((newsItem: any) => {
              return newsItem.sport.name === fevSport;
            }))
          }
          if (fevTeam && fevTeam !== "Favourite Team") {
            setFevArticles(news.filter((newsItem: any) => {
              let teams: any = [];
              newsItem.teams?.forEach((team: any) => {
                teams.push(team.name);
              });
        
              for (let i = 0; i < teams.length; i++) {
                if (teams[i] === fevTeam) return newsItem;
              }
            }))
          }
        }else{

        }
      }
    })()
  },[isOpen, isLoading, props])

  // if (fevSport && fevSport !== "Favourite Sport") {
  //   news = news.filter((newsItem: any) => {
  //     return newsItem.sport.name === fevSport;
  //   });
  // }

  // if (fevTeam && fevTeam !== "Favourite Team") {
  //   news = news.filter((newsItem: any) => {
  //     let teams: any = [];
  //     newsItem.teams?.forEach((team: any) => {
  //       teams.push(team.name);
  //     });

  //     for (let i = 0; i < teams.length; i++) {
  //       if (teams[i] === fevTeam) return newsItem;
  //     }
  //   });
  // }

  if(isLoading)
  {
    return <span>Loading....</span>;
  }

  
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (news.length === 0) {
    return (
      <span className="ml-8 dark:text-gray-300">
        No articles for this selected team and sport
      </span>
    );
  }

  return (
    <>
      <div className="overflow-y-auto h-[55vh]">
        {news.map((newsItem: News) => {
          return (
            <div
              key={newsItem.id}
              className="bg-white dark:bg-slate-800 rounded-md my-3 p-3"
            >
              <h1 className="font-bold text-gray-900 dark:text-white text-xl">
                {newsItem.title.substring(0, 30)}...
              </h1>
              <p className="text-gray-800 dark:text-gray-300 my-2">
                {newsItem.summary.substring(0, 70)} ...
              </p>
              <Link
                to={`/articles/${newsItem.id}`}
                className="text-white dark:bg-gray-300 dark:text-slate-900 rounded font-bold tracking-wider text-center p-2 my-3  mx-auto block bg-slate-800"
              >
                Read more
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
