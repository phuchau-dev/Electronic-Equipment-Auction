import React from "react";
import { Outlet } from "react-router-dom";
import { UserFooter } from "src/components/User/footer";
import UserHeader from "src/components/User/header";
import UserNav from "src/components/User/navbar";

const User: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800">
      <UserHeader />
      <UserNav />
      <div className="flex pt-11 sm:pt-2 md:pt-4 lg:pt-6 xl:pt-9 overflow-hidden bg-white dark:bg-gray-900">
        <div
          id="main-content"
          className="relative flex flex-col w-full max-w-screen-2xl mx-auto min-h-screen bg-white dark:bg-gray-900"
        >
          <main className="flex-grow">
            <div className="pt-6 2xl:px-0 ">
              <Outlet />
            </div>
          </main>
          <UserFooter />
        </div>
      </div>
    </div>
  );
};
export default User;
