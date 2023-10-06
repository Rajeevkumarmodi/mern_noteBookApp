import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcHome, FcManager } from "react-icons/fc";
import { GrAddCircle } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { PiListFill } from "react-icons/pi";
import MyContext from "../../context/myContext";

function ManuBar() {
  const navigate = useNavigate();

  // ========================logout function========================
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className=" absolute right-0 w-[200px] bg-slate-400 h-[100vh] flex flex-col gap-7 justify-center items-center ">
      <Link to="/" className="flex gap-3">
        <FcHome className=" text-3xl" />
        <p className=" font-bold text-lg text-orange-600">Home</p>
      </Link>
      <Link to="/addnote" className=" ml-7 flex gap-3">
        <GrAddCircle className=" text-3xl" />
        <p className=" font-bold text-lg text-orange-600">Add note</p>
      </Link>
      <Link to="/profile" className="flex gap-3">
        <FcManager className=" text-3xl" />
        <p className=" font-bold text-lg text-orange-600">Profile</p>
      </Link>
      <span onClick={logout} className="flex gap-3 cursor-pointer">
        <BiLogOut className=" text-3xl" />
        <p className=" font-bold text-lg text-orange-600">Logout</p>
      </span>
    </div>
  );
}

export default ManuBar;
