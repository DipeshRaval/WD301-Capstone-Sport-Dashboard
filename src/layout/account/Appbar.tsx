import { Fragment, useState, useContext, useEffect } from 'react'
import { Disclosure, Menu, Transition, Switch } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom"
import Logo from "../../assets/logo.png"
import { set } from 'react-hook-form'
// const isAuth = !!localStorage.getItem('authToken')
// console.log(isAuth);
// console.log(userNavigation);

const intial = [
    { name: 'Profile', href: '#' },
    { name: 'Sign out', href: '/logout' },
  ]

const classNames = (...classes: string[]): string => classes.filter(Boolean).join(' ');

const Appbar = () => {
  const [userNavigation,setUserNavigation] = useState(intial)
  // const userNavigation = props.isAuth ? [
  //   { name: 'Profile', href: '#' },
  //   { name: 'Sign out', href: '/logout' },
  // ] : [
  //   { name: 'Sign in', href: '/signin' },
  //   { name: 'Sign up', href: '/signup' },
  // ]

  useEffect(() => {
    const isAuth = !!localStorage.getItem('authToken')
    console.log(userNavigation);
    console.log(isAuth)
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
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="relative ml-3">
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
        )}
      </Disclosure>
    </>
  )
}

export default Appbar;
