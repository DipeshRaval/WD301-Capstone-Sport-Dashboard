import React, { useEffect, Suspense } from "react";
const ListNews = React.lazy(() => import("./ListNews"));

import { Outlet } from "react-router-dom";
import { useNewsDispatch } from "../../context/news/context";
import { fetchNews } from "../../context/news/action";
import { fetchSport } from "../../context/sport/action";
import { useSportDispatch } from "../../context/sport/context";
import { useTeamDispatch } from "../../context/teams/context";
import { fetchTeams } from "../../context/teams/action";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function NewsContainer() {
  const newsDispatch = useNewsDispatch();
  const sportDispatch = useSportDispatch();
  const teamDispatch = useTeamDispatch();

  useEffect(() => {
    fetchNews(newsDispatch);
    fetchSport(sportDispatch);
    fetchTeams(teamDispatch);
  }, []);

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white my-2">
        Treading News
      </h1>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ListNews />
        </Suspense>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}
