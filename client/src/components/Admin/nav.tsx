import React, { useState } from "react";
import { LogoLink, DropdownLogoAdminNav } from "src/components/Admin";
import Sidebar from "src/components/Admin/sidebar";

const NavAdmin: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <nav className="fixed z-30 w-full bg-primary_flowbite-900 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                id="toggleSidebarMobile"
                aria-expanded={sidebarOpen}
                aria-controls="sidebar"
                onClick={toggleSidebar}
                className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  id="toggleSidebarMobileHamburger"
                  className={`w-6 h-6 ${sidebarOpen ? 'hidden' : 'block'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  id="toggleSidebarMobileClose"
                  className={`w-6 h-6 ${sidebarOpen ? 'block' : 'hidden'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <LogoLink />
            </div>
            <div className="flex items-center">
              <div className="flex justify-between items-center lg:order-2">
                <DropdownLogoAdminNav />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar isOpenMobie={sidebarOpen} onClose={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </>
  );
};

export default NavAdmin;
