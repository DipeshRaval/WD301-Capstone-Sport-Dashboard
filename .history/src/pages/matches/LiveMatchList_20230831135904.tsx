import React, { useContext, useState, useEffect } from 'react'
import { useMatchesState } from '../../context/matches/context'
import Match from './Match';
import { CustomizeContext } from '../../context/customizeState';
import { FetchPreferences } from '../Preferances';

export default function LiveMatchList() {
  const state: any = useMatchesState()
  const { matches, isLoading, isError, errorMessage } = state

  const [matchesList, setMatchesList] = useState(matches);

  const { isOpen } = useContext(CustomizeContext);
  const isLoggedIn = !!localStorage.getItem("userData");

  const settingMatchList = async () => {
    if(isLoggedIn){
      const data = await FetchPreferences()
        if(data && Object.keys(data?.preferences).length)
        {
          if(data.preferences.SelectedSport.length)
          {
            setMatchesList(matches.filter((match: any) => {
              return data.preferences.SelectedSport.includes(match.sportName);
            }))

            console.log(matches.filter((match: any) => {
              return data.preferences.SelectedSport.includes(match.sportName);
            }));
            
          }
        }
    }else{
      setMatchesList(matches)
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
      {matches.map((match : any) =>{
        return(
          <Match key={match.id} id={match.id} />
        )
      })}
    </>
  )
}
