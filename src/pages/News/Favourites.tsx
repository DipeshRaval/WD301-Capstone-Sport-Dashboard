import React, { useState } from "react";
import FevArticles from "./FevArticles";
import { useTeamState } from "../../context/teams/context";
import { Team } from "../../context/teams/reducer";
import { useSportState } from "../../context/sport/context";
import { Sport } from "../../context/sport/reducer";

export default function Favourites() {
  const [fevSport, setFevSport] = useState("");
  const [fevTeam, setFevTeam] = useState("");

  const state: any = useSportState();

  const { sports, isLoading } = state;

  const teamState: any = useTeamState();
  let { teams } = teamState;

  if (fevSport) {
    teams = teams.filter((team: Team) => {
      return team.plays === fevSport;
    });
  }

  return (
    <>
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
    </>
  );
}
