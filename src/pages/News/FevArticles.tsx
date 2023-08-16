import React from "react";
import { useNewsState } from "../../context/news/context";
import { News } from "../../context/news/reducer";
import { Link } from "react-router-dom";

interface Props {
  fevSport: string;
  fevTeam: string;
}

export default function FevArticles(props: Props) {
  const { fevSport, fevTeam } = props;

  const state: any = useNewsState();

  let { news } = state;

  if (fevSport) {
    news = news.filter((newsItem: any) => {
      return newsItem.sport.name === fevSport;
    });
  }

  if (fevTeam) {
    news = news.filter((newsItem: any) => {
      // if (newsItem?.teams[0]?.name === fevTeam) return newsItem;
      let teams: any = [];
      newsItem.teams?.forEach((team: any) => {
        teams.push(team.name);
      });

      for (let i = 0; i < teams.length; i++) {
        if (teams[i] === fevTeam) return newsItem;
      }
    });
  }

  return (
    <>
      <div className="overflow-y-auto h-[65%]">
        {news.map((newsItem: News) => {
          return (
            <div key={newsItem.id} className="bg-white rounded-md my-3 p-3">
              <h1 className="font-bold text-gray-900 text-xl">
                {newsItem.title.substring(0, 30)}...
              </h1>
              <p className="text-gray-800 my-2">
                {newsItem.summary.substring(0, 70)} ...
              </p>
              <Link
                to={`/articles/${newsItem.id}`}
                className="text-white rounded font-bold tracking-wider text-center p-2 my-3  mx-auto block bg-slate-800"
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
