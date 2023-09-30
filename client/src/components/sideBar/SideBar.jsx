import React from "react";
import { FcHome, FcManager } from "react-icons/fc";
import { GrAddCircle } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div>
      <div className=" flex flex-col items-center justify-center gap-5 bg-gray-300 w-[250px] h-[100vh]">
        <Link to="/" className=" flex gap-5 items-center">
          <FcHome className=" text-4xl" />
          <p className=" text-xl font-bold text-orange-600">Home</p>
        </Link>
        <Link to="/addNote" className=" flex gap-5 items-center ">
          <GrAddCircle className=" text-3xl" />
          <p className=" text-xl font-bold text-orange-600">Add Note</p>
        </Link>
        <Link to="/profile" className=" flex gap-5 items-center">
          <FcManager className=" text-4xl" />
          <p className=" text-xl font-bold text-orange-600">Profile</p>
        </Link>
        <div className="flex gap-5 items-center">
          <BiLogOut className=" text-4xl" />
          <p className=" text-xl font-bold text-orange-600">Logout</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
