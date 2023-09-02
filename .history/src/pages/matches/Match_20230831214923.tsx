import React, { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { API_ENDPOINT } from "../../config/constants";

interface Props {
  id: number;
}

interface Team {
  id: number;
  name: string;
}

interface Score {
  [key: string]: string;
}

interface State {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  sportName: string;
  playingTeam: number;
  story: string;
  score: Score;
  teams: Team[];
}

export default function Match(props: Props, State: State) {
  const [match, setMatch] = useState<State>(State);

  const fetchMatch = async (id: number) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch matche");
      }

      const data = await response.json();

      setMatch(data);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  useEffect(() => {
    fetchMatch(props.id);
  }, [props.id]);

  return (
    <>
      {match.isRunning && (
        <div className="border-2 mx-2 mb-1 rounded border-gray-400 bg-gray-100 dark:bg-slate-600 p-2">
          <div className=" flex justify-between w-48">
            <h3 className="font-bold text-gray-800 dark:text-white">
              {match.sportName}
            </h3>
            <ArrowPathIcon
              className="h-6 w-6 hover:rotate-90 transition-all ease-in-out"
              aria-hidden="true"
              onClick={() => {
                fetchMatch(match.id);
              }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-200">
            {match.location}
          </p>
          <div className="flex flex-col my-2">
            <div className="flex justify-between mt-1">
              <p className="font-semibold">{match.teams[0].name}</p>
              <p className="font-semibold">
                {match.score[match.teams[0].name]}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">{match.teams[1].name}</p>
              <p className="font-semibold">
                {match.score[match.teams[1].name]}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}