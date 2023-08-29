import React from 'react'

export default function ListNews() {
  return (
    <div>
      <h1 className="text-gray-900 dark:text-white font-bold text-xl">
        Live Games
      </h1>
      <div className="overflow-x-auto mt-2 flex items-center w-full">
        <LiveMatchList />
      </div>
    </div>
  )
}
