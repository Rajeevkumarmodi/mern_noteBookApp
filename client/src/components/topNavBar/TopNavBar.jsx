import React, { useState } from "react";
import { FcHome, FcManager } from "react-icons/fc";
import { GrAddCircle } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { PiListFill } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

import ManuBar from "../manuBar/ManuBar";

function TopNavBar() {
  const [isClick, setIsClick] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center gap-6 bg-gray-300 px-10 py-2">
        <img
          className=" w-[50px] rounded-full"
          src="https://img.freepik.com/premium-vector/book-education-logo-template-vector-illustration-design_677077-4724.jpg?w=740"
          alt="logo"
        />
        {isClick ? (
          <IoMdClose
            onClick={() => setIsClick(false)}
            className=" text-4xl cursor-pointer "
          />
        ) : (
          <PiListFill
            onClick={() => setIsClick(true)}
            className=" text-4xl cursor-pointer"
          />
        )}
      </div>
      {isClick ? <ManuBar /> : ""}
    </div>
  );
}

export default TopNavBar;
