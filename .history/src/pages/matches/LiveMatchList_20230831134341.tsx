import React, { useContext, useState, useEffect } from 'react'
import { useMatchesState } from '../../context/matches/context'
import Match from './Match';
import { CustomizeContext } from '../../context/customizeState';

export default function LiveMatchList() {
  const state: any = useMatchesState()
  const { matches, isLoading, isError, errorMessage } = state

  const [matchesList, setMatchesList] = useState(matches);

  const { isOpen } = useContext(CustomizeContext);
  const isLoggedIn = !!localStorage.getItem("userData");

  useEffect(()=>{

  },[isOpen, isLoading])

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
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
