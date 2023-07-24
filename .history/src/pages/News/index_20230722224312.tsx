import React from 'react'
import { FunnelIcon } from '@heroicons/react/24/outline'
import News from './Article'
import Article from './Article'

export default function NewsContainer() {
  return (
    <div className='mt-4'>
      <h1 className='text-xl font-bold text-gray-900 my-2'>Treading News</h1>
      <div>
        <div className='flex justify-between'>
          <div className='flex text-gray-800 p-3'>
            <p className='px-10 py-2 border-gray-800 border-b-4 border-grey-900 font-bold bg-gray-100 rounded'>Your news</p>
            <p className='px-10 py-2'>Cricket</p>
            <p className='px-10 py-2'>Football</p>
          </div>
          <div className='flex justify-between items-center'>
            <select name="" id="" className='py-2 px-3 text-gray-600 bg-gray-100'>
              <option value="">Sort By : Date</option>
              <option value="date">Date</option>
              <option value="name">Name</option>
            </select>
            <div className='bg-gray-100 rounded mx-2 p-3 text-gray-600'>
              <FunnelIcon className='h-4 w-4' />
            </div>
          </div>
        </div>
      </div>

      <div className='overflow-y'>
        <Article />
      </div>
    </div>
  )
}
