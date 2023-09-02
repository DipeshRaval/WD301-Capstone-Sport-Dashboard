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
            <div>
              {false ? (
                <button className="h-6 w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="heart"
                    className="h-7 w-7 mx-2  text-rose-500 duration-150 hover:-translate-y-1 cursor-pointer"
                  >
                    <path d="M48.6 85.4 15.7 52.8c-1.4-1.3-2.5-2.8-3.5-4.4-5.4-8.9-4-20.3 3.5-27.7C20 16.4 25.8 14 31.9 14c9.6 0 15.6 5.6 18.1 8.8 2.5-3.2 8.5-8.8 18.1-8.8 6.1 0 11.9 2.4 16.2 6.7 7.4 7.4 8.9 18.8 3.5 27.7-1 1.6-2.1 3.1-3.5 4.4L51.4 85.4c-.8.8-2 .8-2.8 0zM31.9 18c-5.1 0-9.8 2-13.4 5.5-6.1 6.1-7.3 15.5-2.9 22.8.8 1.3 1.8 2.6 2.9 3.7L50 81.2 81.5 50c1.1-1.1 2.1-2.3 2.9-3.7 4.4-7.4 3.3-16.8-2.9-22.8C77.9 20 73.1 18 68.1 18c-7.2 0-13.2 3.9-16.4 9.3-.8 1.3-2.7 1.3-3.5 0-3.1-5.4-9.1-9.3-16.3-9.3z"></path>
                    <path
                      fill="#00F"
                      d="M944-370v1684H-840V-370H944m8-8H-848v1700H952V-378z"
                    ></path>
                  </svg>
                </button>
              ) : (
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 47.5 47.5"
                    id="heart"
                    className="h-7 w-7 mx-2  text-rose-500 duration-150 hover:-translate-y-1 cursor-pointer"

                  >
                    <defs>
                      <clipPath id="a">
                        <path d="M0 38h38V0H0v38Z"></path>
                      </clipPath>
                    </defs>
                    <g
                      clip-path="url(#a)"
                      transform="matrix(1.25 0 0 -1.25 0 47.5)"
                    >
                      <path
                        fill="#dd2e44"
                        d="M3.067 25.68c0 8.799 12.184 12.06 15.933 1.874 3.749 10.186 15.933 6.925 15.933-1.874C34.933 16.12 19 3.999 19 3.999S3.067 16.12 3.067 25.68"
                      ></path>
                    </g>
                  </svg>
                </button>
              )}
              <ArrowPathIcon
                className="h-6 w-6 hover:rotate-90 transition-all ease-in-out"
                aria-hidden="true"
                onClick={() => {
                  fetchMatch(match.id);
                }}
              />
            </div>
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
