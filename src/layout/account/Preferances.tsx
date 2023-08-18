import { Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Cog6ToothIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { useSportState } from "../../context/sport/context";
import { Sport } from "../../context/sport/reducer";
import { Team } from "../../context/teams/reducer";
import { useTeamState } from "../../context/teams/context";
import { FetchPreferences, SetPreferences } from "../../pages/Preferances";

export interface UserPreferances {
  sports: string[];
  teams: string[];
}

export default function Preferances() {
  const sportState: any = useSportState();
  const teamState: any = useTeamState();

  const [preferances, setPreferances] = useState<UserPreferances>({
    sports: [],
    teams: [],
  });

  const { sports, isLoading } = sportState;
  const { teams } = teamState;
  let [isOpen, setIsOpen] = useState(false);

  // Then we add the openModal function.
  const openModal = () => setIsOpen(true);

  // Then we add the closeModal function
  const closeModal = () => {
    SetPreferences(preferances);
    setIsOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem("userData");

  useEffect(() => {
    if (isLoggedIn) {
      FetchPreferences()
        .then((data: { preferences: UserPreferances }) => {
          console.log("From", data);

          setPreferances(data.preferences);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <Cog6ToothIcon
        className="h-6 w-6"
        onClick={openModal}
        aria-hidden="true"
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      Preferances
                    </Dialog.Title>
                    <XMarkIcon
                      className="h-6 w-6"
                      onClick={closeModal}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-8">
                    <h1 className="text-xl font-semibold px-2 border-b border-gray-600 pb-2">
                      Favourite Sports
                    </h1>
                    <div className="border-b border-gray-600 pb-2">
                      <div className="flex flex-wrap p-3">
                        {!isLoading &&
                          sports.map((sport: Sport) => (
                            <div
                              key={sport.id}
                              className="flex m-2 items-center justify-between w-36"
                            >
                              <label
                                className="cursor-pointer"
                                htmlFor={sport.name}
                              >
                                {sport.name}
                              </label>
                              <input
                                id={sport.name}
                                defaultChecked={preferances.sports.includes(
                                  sport.name
                                )}
                                className="mx-2 h-6 w-4"
                                type="checkbox"
                                value={sport.name}
                                onChange={(e) => {
                                  let arr = preferances.sports;
                                  if (e.target.checked) {
                                    arr.push(e.target.value);
                                  } else {
                                    const index = arr.indexOf(e.target.value);
                                    if (index > -1) {
                                      arr.splice(index, 1);
                                    }
                                  }
                                  setPreferances({
                                    ...preferances,
                                    sports: arr,
                                  });
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                    <h1 className="mt-8 text-xl font-semibold px-2 border-b border-gray-600 pb-2">
                      Favourite Teams
                    </h1>
                    <div className="border-b border-gray-600 pb-2">
                      <div className="flex flex-wrap p-3">
                        {!isLoading &&
                          teams.map((team: Team) => (
                            <div
                              key={team.id}
                              className="flex m-2 items-center justify-between w-36"
                            >
                              <label
                                className="cursor-pointer"
                                htmlFor={team.name}
                              >
                                {team.name}
                              </label>
                              <input
                                id={team.name}
                                defaultChecked={preferances.teams.includes(
                                  team.name
                                )}
                                className="mx-2 h-6 w-4"
                                type="checkbox"
                                value={team.name}
                                onChange={(e) => {
                                  let updateTeams = preferances.teams;
                                  if (e.target.checked) {
                                    updateTeams.push(e.target.value);
                                  } else {
                                    const index = updateTeams.indexOf(
                                      e.target.value
                                    );
                                    index > -1
                                      ? updateTeams.splice(index, 1)
                                      : "";
                                  }
                                  setPreferances({
                                    ...preferances,
                                    teams: updateTeams,
                                  });
                                }}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
