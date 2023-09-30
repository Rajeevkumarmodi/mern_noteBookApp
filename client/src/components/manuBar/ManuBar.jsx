import React from "react";
import { Link } from "react-router-dom";
import { FcHome, FcManager } from "react-icons/fc";
import { GrAddCircle } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { PiListFill } from "react-icons/pi";

function ManuBar() {
  return (
    <div className=" absolute right-0 w-[200px] bg-slate-400 h-[100vh] flex flex-col gap-7 justify-center items-center ">
      <Link to="/" className="flex gap-3">
        <p className=" font-bold text-lg text-orange-600">Home</p>
        <FcHome className=" text-3xl" />
      </Link>
      <Link to="/addnote" className="flex gap-3">
        <p className=" font-bold text-lg text-orange-600">Add note</p>
        <GrAddCircle className=" text-3xl" />
      </Link>
      <Link to="/profile" className="flex gap-3">
        <p className=" font-bold text-lg text-orange-600">Profile</p>
        <FcManager className=" text-3xl" />
      </Link>
      <span className="flex gap-3">
        <p className=" font-bold text-lg text-orange-600">Logout</p>
        <BiLogOut className=" text-3xl" />
      </span>
    </div>
  );
}

export default ManuBar;
