import React, { useEffect, useContext, useState } from "react";
import { useNewsState } from "../../context/news/context";
import { News } from "../../context/news/reducer";
import { Link } from "react-router-dom";
import { CustomizeContext } from "../../context/customizeState";
import { FetchPreferences } from "../Preferances";
import { Team } from "../../context/teams/reducer";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  fevSport: string;
  fevTeam: string;
}

export default function FevArticles(props: Props) {
  const { fevSport, fevTeam } = props;

  const state: any = useNewsState();
  const { isLoading, isError, errorMessage } = state;
  let { news } = state;

  const [fevArticles, setFevArticles] = useState(news);

  const isLoggedIn = !!localStorage.getItem("userData");
  const { isOpen } = useContext(CustomizeContext);

  const settingFevArticles = async () => {
    let filteredArticles = [...news];

    if (fevSport && fevSport !== "Favourite Sport") {
      filteredArticles = filteredArticles.filter((newsItem: any) => {
        return newsItem.sport.name === fevSport;
      });
    }

    if (fevTeam && fevTeam !== "Favourite Team") {
      filteredArticles = filteredArticles.filter((newsItem: any) => {
        return newsItem.teams.some((team: Team) => team.name === fevTeam);
      });
    }

    if (isLoggedIn) {
      const data = await FetchPreferences();
      if (data && !data.errors) {
        if (Object.keys(data?.preferences).length) {
          if (
            data?.preferences?.SelectedSport.length ||
            data?.preferences?.SelectedTeams.length
          ) {
            const preferanceNews: News[] = [];
            if (data?.preferences?.SelectedSport.length) {
              filteredArticles.forEach((newsItem: any) => {
                if (
                  data.preferences.SelectedSport.includes(newsItem.sport.name)
                ) {
                  preferanceNews.push(newsItem);
                }
              });
            }
            if (data?.preferences?.SelectedTeams.length) {
              filteredArticles.forEach((newsItem: News) => {
                newsItem.teams.forEach((team: any) => {
                  if (data.preferences.SelectedTeams.includes(team.name)) {
                    preferanceNews.push(newsItem);
                  }
                });
              });
            }

            setFevArticles([...new Set(preferanceNews)]);
          } else {
            setFevArticles(filteredArticles);
          }
        } else {
          setFevArticles(filteredArticles);
        }
      }
    } else {
      setFevArticles(filteredArticles);
    }
  };

  useEffect(() => {
    settingFevArticles();
  }, [isOpen, isLoggedIn, isLoading, fevSport, fevTeam]);

  if (isLoading) {
    return (
      <SkeletonTheme baseColor="#d1cdcd" highlightColor="#adacac">
        <div className="overflow-y-auto h-[60vh]">
          {Array(4)
            .fill(0)
            .map((ele, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white dark:hover:bg-slate-600 hover:bg-slate-200 dark:bg-slate-800 rounded-md mt-3 p-3"
                >
                  <h1 className="font-bold text-gray-900 dark:text-white">
                    <Skeleton height={30} />
                  </h1>
                  <p className="text-gray-800 mt-4 dark:text-gray-300">
                    <Skeleton count={4} />
                  </p>
                  <Skeleton
                    width={200}
                    height={35}
                    className="mt-3 block mx-auto"
                  />
                </div>
              );
            })}
        </div>
      </SkeletonTheme>
    );
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (fevArticles.length === 0) {
    return (
      <p className="text-center dark:text-gray-300">
        No articles for this selected team and sport
      </p>
    );
  }

  return (
    <>
      <div className="overflow-y-auto h-[60vh]">
        {fevArticles.map((newsItem: News) => {
          return (
            <div
              key={newsItem.id}
              className="bg-white dark:hover:bg-slate-600 hover:bg-slate-200 dark:bg-slate-800 rounded-md my-3 p-3"
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
