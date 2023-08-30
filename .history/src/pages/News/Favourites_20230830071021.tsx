import React, { useEffect, useState } from "react";
import FevArticles from "./FevArticles";
import { useTeamState } from "../../context/teams/context";
import { Team } from "../../context/teams/reducer";
import { useSportState } from "../../context/sport/context";
import { Sport } from "../../context/sport/reducer";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function Favourites() {
  const [fevSport, setFevSport] = useState("Favourite Sport");
  const [fevTeam, setFevTeam] = useState("Favourite Team");

  const state: any = useSportState();

  const { sports } = state;

  const teamState: any = useTeamState();
  let { teams } = teamState;

  const [optionFevSport, setOPtionFevSport] = useState(
    sports.map((sport:Sport) => sport.name)
  )

  const [optionFevTeam, SetOptionFevTeam] = useState(
    teams.map((team:Team) => team.name)
  )

  const isLoggedIn = !!localStorage.getItem("userData");


  if (fevSport && fevSport !== "Favourite Sport") {
    teams = teams.filter((team: Team) => {
      return team.plays === fevSport;
    });
  }


  useEffect(()=>{

  }, [])
  

  return (
    <>
      <h1 className="text-lg mt-1 font-bold dark:text-white">Favourites</h1>
      <div className="flex flex-col my-4">
        <div className="mb-2">
          <Listbox value={fevSport} onChange={setFevSport}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-slate-600 p-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                <span className="block truncate">{fevSport}</span>
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
                <Listbox.Options className="z-20 absolute mt-1 max-h-60 w-full overflow-auto rounded-md dark:bg-slate-600 bg-white py-1 text-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sports.map((sport: Sport) => (
                    <Listbox.Option
                      key={sport.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-blue-100 dark:bg-blue-500 text-blue-900 dark:text-white"
                            : "text-gray-900 dark:text-gray-300"
                        }`
                      }
                      value={sport?.name}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate  ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {sport?.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 dark:text-white text-blue-600">
                              <CheckIcon
                                className="h-5 w-5"
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
        </div>
        <div>
          <Listbox value={fevTeam} onChange={setFevTeam}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default dark:bg-slate-600 rounded-md bg-white p-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                <span className="block truncate">{fevTeam}</span>
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
                <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md dark:bg-slate-600 bg-white py-1 text-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {teams.map((team: Team) => (
                    <Listbox.Option
                      key={team.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-blue-100 dark:bg-blue-600 text-blue-900 dark:text-white"
                            : "text-gray-900 dark:text-gray-300"
                        }`
                      }
                      value={team?.name}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {team?.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 dark:text-white flex items-center pl-3 text-blue-600">
                              <CheckIcon
                                className="h-5 w-5"
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
        </div>
      </div>

      {/* FAVOURITE ARTICLES */}
      <FevArticles fevSport={fevSport} fevTeam={fevTeam} />
    </>
  );
}
