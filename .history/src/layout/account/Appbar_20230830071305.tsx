import { Fragment, useState, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition, Switch } from "@headlessui/react";
import {
  UserCircleIcon,
  MoonIcon,
  SunIcon
} from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.png";
import { fetchTeams } from "../../context/teams/action";
import { fetchSport } from "../../context/sport/action";
import { useSportDispatch } from "../../context/sport/context";
import { useTeamDispatch } from "../../context/teams/context";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { CustomizeContext } from "../../context/customizeState";


const intial = [{ name: "Sign out", href: "/logout" }];

const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const Appbar = () => {
  const [userNavigation, setUserNavigation] = useState(intial);

  const sportDispatch = useSportDispatch();
  const teamDispatch = useTeamDispatch();

  const { theme, setTheme } = useContext(ThemeContext);

  const {isOpen, setIsOpen} = useContext(CustomizeContext)

  const [enabled, setEnabled] = useState(theme === "dark");

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  const isAuth = !!localStorage.getItem("authToken");
  useEffect(() => {
    if (!isAuth) {
      setUserNavigation([
        { name: "Sign in", href: "/signin" },
        { name: "Sign up", href: "/signup" },
      ]);
    } else {
      setUserNavigation([
        { name: "Sign out", href: "/logout" },
        { name: "Change Password", href: "/chnage_password" },
      ]);
    }
    fetchSport(sportDispatch);
    fetchTeams(teamDispatch);
  }, []);

  return (
    <>
      <Disclosure
        as="nav"
        className="border-b bg-gray-200 border-gray-200 dark:bg-gray-800"
      >
        {({ open }) => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <img
                  className="h-20 w-24 dark:invert"
                  src={Logo}
                  alt="Smarter Tasks"
                />
              </div>
              <div>
                <h1 className="text-center font-bold text-2xl text-gray-800 dark:text-white">
                  Sports Center
                </h1>
              </div>
              <div className="flex items-center">
                <div onClick={toggleTheme} className="mr-3">
                  {theme === "dark" ? (
                    <SunIcon className="h-8 w-8" />
                  ) : (
                    <MoonIcon className="h-6 w-6" />
                  )}
                </div>
                {isAuth && (
                  <Link to={"/preferances"}>
                    <Cog6ToothIcon onClick={()=>{ setIsOpen(true)} } className="h-8 w-6" aria-hidden="true" />
                  </Link>
                )}
                <div className="hidden md:block">
                  <div className="ml-1 flex items-center md:ml-2">
                    <Menu as="div" className="relative ml-1">
                      <div>
                        <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                          <UserCircleIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
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
                                <Link
                                  to={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
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
  );
};

export default Appbar;
