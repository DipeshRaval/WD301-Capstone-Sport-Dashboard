import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useMatchesState } from '../../context/matches/context'

export default function LiveMatchList() {
  const state: any = useMatchesState()
  const { matches, isLoading, isError, errorMessage } = state

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {matches.map((match : any)=>(
         <div className='border-2 rounded border-gray-400 p-2'>
         <div className=' flex justify-between w-48'>
           <h3 className='font-bold text-gray-800'>Cricket</h3>
           <ArrowPathIcon className="h-6 w-6" aria-hidden="true" />
         </div>
         <p className='text-sm text-gray-600'>IPL 2023 Delhi</p>
         <div className='flex flex-col my-2'>
           <div className='flex justify-between mt-1'>
             <p className='font-semibold'>CSK</p>
             <p><span className='text-gray-600 px-1'>(20 Overs)</span><span className='font-semibold'>200/3</span></p>
           </div>
           <div className='flex justify-between'>
             <p className='font-semibold'>GT</p>
             <p><span className='text-gray-600 px-1'>(20 Overs)</span><span className='font-semibold'>200/3</span></p>
           </div>
         </div>
       </div>
      ))}
    </>

  )
}
