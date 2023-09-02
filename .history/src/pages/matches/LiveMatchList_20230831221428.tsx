import React, { useContext, useState, useEffect } from 'react'
import { useMatchesState } from '../../context/matches/context'
import Match from './Match';
import { CustomizeContext } from '../../context/customizeState';
import { FetchPreferences } from '../Preferances';

interface Team { 
  id : number;
  name : string;
}

export default function LiveMatchList() {
  const state: any = useMatchesState()
  const { isLoading, isError, errorMessage } = state
  let  { matches } = state
  const [matchesList, setMatchesList] = useState(matches);

  const { isOpen } = useContext(CustomizeContext);
  const isLoggedIn = !!localStorage.getItem("userData");

  const settingMatchList = async () => {
    if(isLoggedIn){
      const data = await FetchPreferences()
        if(data && Object.keys(data?.preferences).length)
        {
          let match_ids : number[] = []
          if(data.preferences.SelectedSport.length || data.preferences.SelectedTeams.length)
          {
            console.log("hm");
            
            if(data.preferences.SelectedSport.length)
            {
              matches.forEach((match : any) => {
                if(data.preferences.SelectedSport.includes(match.sportName) && match.isRunning)
                {
                  match_ids.push(match.id)
                }
              });
            }

            if(data.preferences.SelectedTeams.length){
              matches.forEach((match : any) => {
                match.team.forEach((team : Team)=>{
                  if(data.preferences.SelectedTeams.includes(team.name) && match.isRunning)
                  {
                    match_ids.push(match.id)
                  }
                })
              });
            }

            setMatchesList(match_ids)
          }else{
            matches = matches?.filter((match : any)=>{
              return match.isRunning
            })
            setMatchesList(matches?.map((match : any)=> match.id))
          }
        }
    }else{
      matches = matches?.filter((match : any)=>{
        return match.isRunning
      })
      setMatchesList(matches?.map((match : any)=> match.id))
    }
  }


  useEffect(()=>{    
    settingMatchList()
  },[isOpen, isLoading])

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  if(matchesList.length === 0)
  {
    return <span>There is currently no live match.</span>;
  }

  return (
    <>
      {matchesList.map((id : number) =>{
        return(
          <Match key={id} id={id} />
        )
      })}
    </>
  )
}
