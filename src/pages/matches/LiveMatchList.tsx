import React, { useContext, useState, useEffect } from "react";
import { useMatchesState } from "../../context/matches/context";
import Match from "./Match";
import { CustomizeContext } from "../../context/customizeState";
import { FetchPreferences } from "../Preferances";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Team {
  id: number;
  name: string;
}

export default function LiveMatchList() {
  const state: any = useMatchesState();
  const { isLoading, isError, errorMessage } = state;
  let { matches } = state;
  const [matchesList, setMatchesList] = useState(matches);
  const navigate = useNavigate();
  const { isOpen } = useContext(CustomizeContext);
  const isLoggedIn = !!localStorage.getItem("userData");

  const settingMatchList = async () => {
    if (isLoggedIn) {
      try {
        const data = await FetchPreferences();
        if (data?.errors) {
          throw new Error(`${data.errors}`);
        }
        if (data && Object.keys(data?.preferences).length) {
          let filterMatches: any[] = [];
          if (
            data.preferences.SelectedSport.length ||
            data.preferences.SelectedTeams.length
          ) {
            if (data.preferences.SelectedSport.length) {
              matches.forEach((match: any) => {
                if (
                  data.preferences.SelectedSport.includes(match.sportName) &&
                  match.isRunning
                ) {
                  filterMatches.push(match);
                }
              });
            }

            if (data.preferences.SelectedTeams.length) {
              matches.forEach((match: any) => {
                match.teams.forEach((team: Team) => {
                  if (
                    data.preferences.SelectedTeams.includes(team.name) &&
                    match.isRunning
                  ) {
                    filterMatches.push(match);
                  }
                });
              });
            }
            setMatchesList([...new Set(filterMatches)]);
          } else {
            matches = matches?.filter((match: any) => {
              return match.isRunning;
            });
            setMatchesList(matches);
          }
        }
      } catch (error) {
        toast.error(`${error}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/signin");
      }
    } else {
      matches = matches?.filter((match: any) => {
        return match.isRunning;
      });
      setMatchesList(matches);
    }
  };

  useEffect(() => {
    settingMatchList();
  }, [isOpen, isLoggedIn, isLoading]);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if (matchesList.length === 0) {
    return <span>There is currently no live match.</span>;
  }

  return (
    <>
      {matchesList.map((match: any) => {
        return <Match key={match.id} id={match.id} />;
      })}
    </>
  );
}
