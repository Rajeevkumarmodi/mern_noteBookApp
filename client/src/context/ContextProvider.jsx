import { useState } from "react";
import MyContext from "./myContext";
import toast from "react-hot-toast";

function ContextProvider({ children }) {
  const [allNotesData, setAllNotesData] = useState({});

  // fetch all notes data

  async function getAllNotes() {
    try {
      const res = await fetch("http://localhost:8080/api/note/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setAllNotesData(await res.json());
    } catch (error) {
      console.log(error);
    }
  }

  // delete note function
  async function deleteNote(id) {
    try {
      const res = await fetch(
        `http://localhost:8080/api/note/deletenote/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const deleteData = await res.json();
      if (deleteData.error) {
        toast.error(deleteData.error);
      } else {
        toast.success(deleteData.success);
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <MyContext.Provider
      value={{ allNotesData, setAllNotesData, getAllNotes, deleteNote }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextProvider;
