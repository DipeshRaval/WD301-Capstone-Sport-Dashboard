import React, { useEffect} from "react";
import ListNews from "./ListNews";
import { Outlet } from "react-router-dom";
import { useNewsDispatch } from "../../context/news/context";
import { fetchNews } from "../../context/news/action";
import { fetchSport } from "../../context/sport/action";
import { useSportDispatch } from "../../context/sport/context";
import { useTeamDispatch } from "../../context/teams/context";
import { fetchTeams } from "../../context/teams/action";

export default function NewsContainer() {

  const newsDispatch = useNewsDispatch();
  const sportDispatch = useSportDispatch()
  const teamDispatch = useTeamDispatch()

  useEffect(() => {
    fetchNews(newsDispatch);
    fetchSport(sportDispatch)
    fetchTeams(teamDispatch)
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
