import React from "react";
import SideBar from "../sideBar/SideBar";
import TopNavBar from "../topNavBar/TopNavBar";

function Layout({ children }) {
  return (
    <div className=" md:flex">
      <div className=" md:hidden">
        <TopNavBar />
      </div>
      <div className=" hidden md:block">
        <SideBar />
      </div>
      <main className="flex-1 min-w-0 overflow-auto">
        <div className=" flex  justify-center">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
