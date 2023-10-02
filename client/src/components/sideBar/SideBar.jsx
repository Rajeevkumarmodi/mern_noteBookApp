import React, { useContext } from "react";
import { FcHome, FcManager } from "react-icons/fc";
import { GrAddCircle } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../context/myContext";

function SideBar() {
  const navigate = useNavigate();

  // =========================logout function=========================
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
      <div className=" flex flex-col items-center justify-center gap-5 bg-gray-300 w-[250px] h-[100vh]">
        <Link to="/" className=" flex gap-5 items-center">
          <FcHome className=" text-4xl" />
          <p className=" text-xl font-bold text-orange-600">Home</p>
        </Link>
        <Link to="/addNote" className=" ml-7 flex gap-5 items-center ">
          <GrAddCircle className=" text-3xl" />
          <p className=" text-xl font-bold text-orange-600">Add Note</p>
        </Link>
        <Link to="/profile" className=" flex gap-5 items-center">
          <FcManager className=" text-4xl" />
          <p className=" text-xl font-bold text-orange-600">Profile</p>
        </Link>
        <div
          onClick={() => logout()}
          className="flex gap-5 items-center cursor-pointer"
        >
          <BiLogOut className=" text-4xl" />
          <p className=" text-xl font-bold text-orange-600">Logout</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
