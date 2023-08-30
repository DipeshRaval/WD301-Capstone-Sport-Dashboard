import React, { Fragment, useContext, useEffect, useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import ArticleList from "./ArticleList";
import { useSportState } from "../../context/sport/context";
import { Sport } from "../../context/sport/reducer";
import Favourites from "./Favourites";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CustomizeContext } from "../../context/customizeState";
import { FetchPreferences } from "../Preferances";

export default function ListNews() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("Sort By: ");

  const [changeSortBy, setChangeSortBy] = useState("");

  const state: any = useSportState();

  const { sports, isLoading } = state;

  const chnageFilter = (e: any) => {
    setFilter(e.target.textContent);
  };

  const [sportOption, setOptionSport] = useState(
    sports.map((sport:Sport) => sport.name)
  )

  const items = [
    { id: 1, name: "Title" },
    { id: 2, name: "Date" },
    { id: 3, name: "Sport Type" },
  ];

  const isLoggedIn = !!localStorage.getItem("userData");

  const {isOpen} = useContext(CustomizeContext)

  const settingOptionSport = async () => {
    if(isLoggedIn){
      const data = await FetchPreferences()
      if(Object.keys(data.preferences).length)
      {
        data.preferences.SelectedSport.length !== 0 ? setOptionSport(data.preferences.SelectedSport) : setOptionSport(sports.map((sport:Sport) => sport.name))
      }
    }else{
      setOptionSport(sports.map((sport:Sport) => sport.name))
    }
  }  


  useEffect(()=>{
    settingOptionSport()
  }, [isLoading, isOpen])

  return (
    <div className="flex h-[85vh] w-full">
      <div className="w-9/12 rounded-md bg-gray-100 dark:bg-gray-700">
        <div className="flex justify-between">
          <div className="flex items-center text-gray-800 p-3 overflow-x-auto ">
            <p
              onClick={() => {
                setFilter("");
              }}
              className={`cursor-pointer px-4 py-1 text-center dark:text-gray-200 ${
                filter === ""
                  ? "border-gray-800 dark:border-gray-400 border-b-4 border-grey-900 font-bold dark:bg-gray-600 dark:text-gray-200 bg-white rounded"
                  : ""
              }`}
            >
              All news
            </p>
            {!isLoading &&
              sportOption.map((sport: string) => (
                <p
                  className={`cursor-pointer px-4 py-1 text-center dark:text-gray-200 ${
                    filter === sport
                      ? "border-gray-800 dark:border-gray-400 border-b-4 border-grey-900 font-bold dark:bg-gray-600 dark:text-gray-200 bg-white rounded"
                      : ""
                  }`}
                  key={sport}
                  onClick={chnageFilter}
                >
                  {sport}
                </p>
              ))}
          </div>
          <div className="flex justify-between mr-3 items-center">
            <Listbox value={sortBy} onChange={setSortBy}>
              <div className="relative mt-1 w-36">
                <Listbox.Button className="relative w-full rounded-md bg-gray-200 dark:bg-slate-600  dark:text-gray-100 text-gray-900 p-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                  <span className="block truncate px-1 font-bold">
                    {sortBy}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto dark:text-white rounded-md dark:bg-slate-500 bg-gray-100 py-1 text-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {items.map((item) => (
                      <Listbox.Option
                        key={item.id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-blue-600 text-blue-900"
                              : "text-gray-900"
                          }`
                        }
                        value={item.name}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate dark:text-gray-100 ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {item.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <CheckIcon
                                  className="h-5 w-5 dark:text-gray-200"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
            <div
              onClick={() => {
                setChangeSortBy(sortBy);
              }}
              className="bg-gray-200  dark:bg-slate-600 dark:text-white rounded mx-2 p-3 text-gray-600"
            >
              <FunnelIcon className="h-4 w-4" />
            </div>
          </div>
        </div>
        <div className="bg-gray-100 mt-3 dark:bg-gray-700">
          <ArticleList sortType={changeSortBy} filter={filter} />
        </div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 rounded-md mx-2 w-3/12 p-4">
        <Favourites />
      </div>
    </div>
  );
}
