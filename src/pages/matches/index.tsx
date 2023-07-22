import React, { useEffect } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useMatchesDispatch } from '../../context/matches/context'
import { fetchMatches } from '../../context/matches/action'
import LiveMatchList from './LiveMatchList'
import News from '../News'

export default function LiveMatch() {
  const matcheDispatch = useMatchesDispatch()

  useEffect(()=>{
    fetchMatches(matcheDispatch)
  },[matcheDispatch])

  return (
    <div>
      <h1 className='text-gray-900 font-bold text-xl'>Live Games</h1>
      <div className='overflow-x-auto mt-2 flex items-center w-full'>
        <LiveMatchList />
      </div>
      <News />
    </div>
  )
}
