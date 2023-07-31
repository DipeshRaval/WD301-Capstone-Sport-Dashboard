import { Fragment, useState, useContext, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Logo from "../../assets/logo.png"
import { fetchTeams } from '../../context/teams/action'
import { fetchSport } from '../../context/sport/action'
import { useSportDispatch, useSportState } from '../../context/sport/context'
import { Sport } from "../../context/sport/reducer"
import { Team } from "../../context/teams/reducer"
import { useTeamDispatch, useTeamState } from '../../context/teams/context'

const intial = [
    { name: 'Profile', href: '#' },
    { name: 'Sign out', href: '/logout' },
  ]

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
  const sportState: any = useSportState();
  const teamState: any = useTeamState()

  const { sports, isLoading  } = sportState
  const { teams } = teamState

  const [userNavigation,setUserNavigation] = useState(intial)

  let [isOpen, setIsOpen] = useState(false)

  // Then we add the openModal function.
  const openModal = () => setIsOpen(true)

  // Then we add the closeModal function
  const closeModal = () => setIsOpen(false)
  const sportDispatch = useSportDispatch()
  const teamDispatch = useTeamDispatch()

  useEffect(() => {
    const isAuth = !!localStorage.getItem('authToken')
    if(!isAuth)
    {
      setUserNavigation([
        { name: 'Sign in', href: '/signin' },
        { name: 'Sign up', href: '/signup' },
      ])
    }else{
      setUserNavigation([
        { name: 'Profile', href: '#' },
        { name: 'Sign out', href: '/logout' },
      ])
    }
    fetchSport(sportDispatch)
    fetchTeams(teamDispatch)
  },[])

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <img
                  className="h-20 w-24"
                  src={Logo}
                  alt="Smarter Tasks"
                />
              </div>
              <div>
                <h1 className='text-center font-bold text-2xl text-gray-800'>Sports Center</h1>
              </div>
              <div className="flex items-center">
                <div>
                  <Cog6ToothIcon className="h-6 w-6" onClick={openModal} aria-hidden="true" />
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
                              <div className='flex items-center justify-between'>
                                <Dialog.Title
                                  as="h3"
                                  className="text-2xl font-bold leading-6 text-gray-900"
                                >
                                  Preferances
                                </Dialog.Title>
                                <XMarkIcon className="h-6 w-6" onClick={closeModal} aria-hidden="true" />
                              </div>
                              <div className="mt-8">
                                <h1 className='text-xl font-semibold px-2 border-b border-gray-600 pb-2'>Favourite Sports</h1>
                                <div className='border-b border-gray-600 pb-2'>
                                  <div className='flex flex-wrap p-3'>
                                    { !isLoading && sports.map((sport : Sport)=>(
                                      <div className='flex m-2 items-center justify-between w-36'>
                                        <label className='cursor-pointer' htmlFor={sport.name}>{sport.name}</label>
                                        <input id={sport.name} className='mx-2 h-6 w-4' type="checkbox" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <h1 className='mt-8 text-xl font-semibold px-2 border-b border-gray-600 pb-2'>Favourite Teams</h1>
                                <div className='border-b border-gray-600 pb-2'>
                                  <div className='flex flex-wrap p-3'>
                                    { !isLoading && teams.map((team : Team)=>(
                                      <div className='flex m-2 items-center justify-between w-36'>
                                        <label className='cursor-pointer' htmlFor={team.name}>{team.name}</label>
                                        <input id={team.name} className='mx-2 h-6 w-4' type="checkbox" />
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
                <div className="hidden md:block">
                  <div className="ml-1 flex items-center md:ml-2">
                    <Menu as="div" className="relative ml-1">
                      <div>
                        <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                          <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item: any) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Disclosure>
    </>
  )
}

export default Appbar;
