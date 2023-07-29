import React, { useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline"; 
import ArticleList from "./ArticleList";
import { fetchNews } from "../../context/news/action";
import { useNewsDispatch } from "../../context/news/context";
import { useSportDispatch, useSportState } from "../../context/sport/context";
import { fetchSport } from "../../context/sport/action";
import { Sport } from "../../context/sport/reducer"

export default function NewsContainer() {
  const [filter,setFilter] = useState("")

  const newsDispatch = useNewsDispatch();
  const sportDispatch = useSportDispatch();

  const state: any = useSportState();

  const { sports, isLoading, isError, errorMessage } = state

  const chnageFilter = (e : any) => {
    setFilter(e.target.textContent)
  }

  useEffect(() => {
    fetchNews(newsDispatch);
    fetchSport(sportDispatch)
  }, []);

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold text-gray-900 my-2">Treading News</h1>
      <div className="w-10/12">
        <div className="flex justify-between">
          <div className="flex text-gray-800 p-3">
            <p onClick={()=>{ setFilter("") }}  className="px-10 py-2 border-gray-800 border-b-4 border-grey-900 font-bold bg-gray-100 rounded">
              All news
            </p>
            <p className="px-10 py-2" onClick={chnageFilter}>Cricket</p>
            <p className="px-10 py-2">Basketball</p>
            {sports.map((sport : Sport )=>(
              <p className="px-10 py-2" onClick={chnageFilter}>{ sport.name }</p>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <select
              name=""
              id=""
              className="py-2 px-3 text-gray-600 bg-gray-100"
            >
              <option value="">Sort By : Date</option>
              <option value="date">Date</option>
              <option value="name">Title</option>
            </select>
            <div className="bg-gray-100 rounded mx-2 p-3 text-gray-600">
              <FunnelIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <ArticleList filter={filter}/>
    </div>
  );
}
