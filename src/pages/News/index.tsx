import React, { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import ArticleList from "./ArticleList";
import { fetchNews } from "../../context/news/action";
import { useNewsDispatch } from "../../context/news/context";
import { useSportState } from "../../context/sport/context";
import { Sport } from "../../context/sport/reducer";
import FevArticles from "./FevArticles";
import { useTeamState } from "../../context/teams/context";
import { Team } from "../../context/teams/reducer";

export default function NewsContainer() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [fevSport, setFevSport] = useState("");
  const [fevTeam, setFevTeam] = useState("");

  const newsDispatch = useNewsDispatch();

  const state: any = useSportState();

  const { sports, isLoading } = state;

  const chnageFilter = (e: any) => {
    setFilter(e.target.textContent);
  };

  const teamState: any = useTeamState();
  let { teams } = teamState;

  if (fevSport) {
    teams = teams.filter((team: Team) => {
      return team.plays === fevSport;
    });
  }

  useEffect(() => {
    fetchNews(newsDispatch);
  }, []);

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 my-2">Treading News</h1>
      <div className="flex h-[60vh] w-full">
        <div className="w-9/12 h- rounded-md bg-gray-100">
          <div className="flex justify-between">
            <div className="flex items-center text-gray-800 p-3 overflow-x-auto ">
              <p
                onClick={() => {
                  setFilter("");
                }}
                className={`cursor-pointer px-4 py-1 text-center ${
                  filter === ""
                    ? "border-gray-800 border-b-4 border-grey-900 font-bold bg-white rounded"
                    : ""
                }`}
              >
                All news
              </p>
              {!isLoading &&
                sports.map((sport: Sport) => (
                  <p
                    className={`cursor-pointer px-4 py-1 text-center ${
                      filter === sport.name
                        ? "border-gray-800 border-b-4 border-grey-900 font-bold bg-white rounded"
                        : ""
                    }`}
                    key={sport.id}
                    onClick={chnageFilter}
                  >
                    {sport.name}
                  </p>
                ))}
            </div>
            <div className="flex justify-between mr-3 items-center">
              <select
                name=""
                id=""
                className="py-2 px-3 text-gray-600 bg-gray-200"
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
              >
                <option value="">Sort By :</option>
                <option value="date">Date</option>
                <option value="name">Title</option>
                <option value="sports">Sports</option>
              </select>
              <div className="bg-gray-200 rounded mx-2 p-3 text-gray-600">
                <FunnelIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="bg-gray-100">
            <ArticleList sortBy={sortBy} filter={filter} />
          </div>
        </div>
        <div className="bg-gray-300 rounded-md mx-2 w-3/12 p-4">
          <h1 className="text-lg mt-1 font-bold">Favourites</h1>
          <div className="flex flex-col my-4">
            <select
              className="px-4 py-3 mb-2 text-gray-900 rounded "
              onChange={(e) => {
                if (e.target.value === "Favourite Sport") {
                  setFevSport("");
                } else {
                  setFevSport(e.target.value);
                }
              }}
            >
              <option>Favourite Sport</option>
              {!isLoading &&
                sports.map((sport: Sport) => (
                  <option key={sport.id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
            </select>
            <select
              className="px-4 py-3 mb-2 text-gray-900 rounded "
              onChange={(e) => {
                if (e.target.value === "Favourite Team") {
                  setFevTeam("");
                } else {
                  setFevTeam(e.target.value);
                }
              }}
            >
              <option value={""}>Favourite Team</option>
              {teams.map((team: Team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* FAVOURITE ARTICLES */}
          <FevArticles fevSport={fevSport} fevTeam={fevTeam} />
        </div>
      </div>
    </div>
  );
}
