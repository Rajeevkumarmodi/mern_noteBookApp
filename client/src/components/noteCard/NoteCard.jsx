import React, { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import MyContext from "../../context/myContext";

function NoteCard(props) {
  const { title, description, _id } = props.note;
  const { deleteNote } = useContext(MyContext);

  return (
    <div className="w-[70vw] ">
      <div className=" bg-cyan-200 p-3 rounded-lg shadow-lg">
        <h3 className=" text-xl py-2 font-bold">{title}</h3>
        <p>{description}</p>
        <div className="flex gap-4 justify-end py-2">
          <Link to={`/updatenote/${_id}`}>
            <BiSolidEdit className="text-xl cursor-pointer" />
          </Link>
          <RiDeleteBin6Line
            onClick={() => deleteNote(_id)}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default NoteCard;
