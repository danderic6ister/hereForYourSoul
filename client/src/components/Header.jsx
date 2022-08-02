import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useLocation, Link } from "react-router-dom";
import Bell from "../utilities/icons/Bell";
import Ship from "../utilities/icons/Ship";
import TwitterIcon from "../utilities/icons/Twitter";
import { useEffect } from "react";
import EtherScanLogo from "../utilities/icons/EtherScanLogo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [openButton, setOpenButton] = useState(false);
  const location = useLocation();
  const navigation = [
    {
      name: "Home",
      href: "/",
      current: location.pathname === "/" ? true : false,
    },
    {
      name: "About us",
      href: "/about-us",
      current: location.pathname === "/about-us" ? true : false,
    },
    {
      name: "Faq",
      href: "/faq",
      current: location.pathname === "/faq" ? true : false,
    },
    {
      name: "Team",
      href: "/team",
      current: location.pathname === "/team" ? true : false,
    },
  ];

  useEffect(() => {
    if (openButton) {
      document.body.className = "overflow-y-hidden";
    }
  }, [openButton]);

  return (
    <>
      <Disclosure
        as="nav"
        className="z-20 w-screen fadeIn overflow-hidden bg-black"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto py-2 sm:py-4 px-2 ">
              <div className="relative flex z-10 items-center justify-between h-16">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <div className="flex flex-row">
                    <div className="mr-6">
                      <EtherScanLogo />
                    </div>
                    <div className="mr-8">
                      <Ship />
                    </div>
                  </div>
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white mr-4 hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon
                        className=" block h-8 w-8"
                        aria-hidden="true"
                        onClick={() => setOpenButton(false)}
                      />
                    ) : (
                      <MenuIcon
                        className=" block h-6 w-6"
                        aria-hidden="true"
                        onClick={() => setOpenButton(true)}
                      />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex w-full">
                  <div className="flex-shrink-0 flex md:w-1/6 lg:w-1/12 md:items-center">
                    <div className="px-9 ">
                      <Bell />
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-row sm:justify-between my-auto md:w-5/6 lg:w-11/12 md:mr-10 lg:mr-12 lg:items-center lg:space-x-12">
                    <div className="flex items-center space-x-4">
                      {navigation.map((item) => (
                        <Link
                          to={item.href}
                          key={item.name}
                          className={classNames(
                            item.current && "decoration-blue-600 decoration-2",
                            "px-3 py-2 rounded-md text-white text-sm font-medium uppercase"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-row items-center">
                      <div className="md:mr-16 lg:mr-20">
                        <EtherScanLogo />
                      </div>
                      <div className="mr-10">
                        <Ship />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden h-screen bg-menu fadeIn">
              <div className="px-2 animate-slideUp-header pb-3 flex flex-col pt-32">
                {navigation.map((item) => (
                  <Link
                    to={item.href}
                    key={item.name}
                    className={classNames(
                      item.current && "",
                      " px-3 mx-auto self-start py-2 rounded-md uppercase text-white text-2xl font-bold"
                    )}
                  >
                    <Disclosure.Button
                      as="div"
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
                <div className="flex flex-row justify-center mt-6">
                  <div className="mr-6">
                    <TwitterIcon />
                  </div>
                  <div className="mr-6">
                    <Ship />
                  </div>
                  <div className="">
                    <EtherScanLogo />
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Header;
