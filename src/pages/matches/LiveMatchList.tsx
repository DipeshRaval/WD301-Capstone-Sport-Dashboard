import React, { useContext, useState, useEffect } from "react";
import { useMatchesState } from "../../context/matches/context";
import Match from "./Match";
import { CustomizeContext } from "../../context/customizeState";
import { FetchPreferences } from "../Preferances";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTeamState } from "../../context/teams/context";
import { Team } from "../../context/teams/reducer";

export default function LiveMatchList() {
  const state: any = useMatchesState();
  const { isLoading, isError, errorMessage } = state;
  let { matches } = state;
  const [matchesList, setMatchesList] = useState(matches);
  const navigate = useNavigate();
  const { isOpen } = useContext(CustomizeContext);
  const isLoggedIn = !!localStorage.getItem("userData");
  const teamState: any = useTeamState();
  const { teams } = teamState;
  const settingMatchList = async () => {
    if (isLoggedIn) {
      try {
        const data = await FetchPreferences();
        if (data?.errors) {
          throw new Error(`${data.errors}`);
        }
        if (data && Object.keys(data?.preferences).length) {
          if (
            data.preferences.SelectedSport.length &&
            data.preferences.SelectedTeams.length
          ) {
            let filterMatches: any[] = [];

            data.preferences.SelectedSport.forEach((sport: string) => {
              let filterMatchesBySport = matches.filter((match: any) => {
                return match.sportName === sport && match.isRunning;
              });

              const teamsPlayGame = teams.filter((team: Team) => {
                return team.plays === sport;
              });

              if (
                teamsPlayGame.some((team: Team) => {
                  return data.preferences.SelectedTeams.includes(team.name);
                })
              ) {
                teamsPlayGame.forEach((team: Team) => {
                  if (data.preferences.SelectedTeams.includes(team.name)) {
                    filterMatchesBySport.forEach((match: any) => {
                      if (
                        match.teams.some((playingTeam: any) => {
                          return playingTeam.name === team.name;
                        })
                      ) {
                        filterMatches.push(match);
                      }
                    });
                  }
                });
              } else {
                filterMatches.push(...filterMatchesBySport);
              }
            });
            setMatchesList([...new Set(filterMatches)]);
          } else if (data.preferences.SelectedSport.length) {
            setMatchesList(
              matches.filter((match: any) => {
                return (
                  data.preferences.SelectedSport.includes(match.sportName) &&
                  match.isRunning
                );
              })
            );
          } else if (data.preferences.SelectedTeams.length) {
            let filterMatches: any[] = [];
            matches.forEach((match: any) => {
              match.teams.forEach((team: any) => {
                if (
                  data.preferences.SelectedTeams.includes(team.name) &&
                  match.isRunning
                ) {
                  filterMatches.push(match);
                }
              });
            });
            setMatchesList(filterMatches);
          } else {
            setMatchesList(
              matches?.filter((match: any) => {
                return match.isRunning;
              })
            );
          }
        } else {
          setMatchesList(
            matches?.filter((match: any) => {
              return match.isRunning;
            })
          );
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
      setMatchesList(
        matches?.filter((match: any) => {
          return match.isRunning;
        })
      );
    }
  };

  useEffect(() => {
    settingMatchList();
  }, [isOpen, isLoggedIn, isLoading]);

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
