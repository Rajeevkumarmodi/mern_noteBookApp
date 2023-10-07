import { useState } from "react";
import MyContext from "./myContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

function ContextProvider({ children }) {
  const [allNotesData, setAllNotesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // ============================fetch all notes data============================

  async function getAllNotes() {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8080/api/note/fetchallnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const serverResponse = await res.json();

      if (serverResponse.error) {
        toast.error(serverResponse.error);
        localStorage.removeItem("token");
        setIsLoading(false);
      } else {
        setAllNotesData(serverResponse);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //============================= delete note function=============================
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

      console.log(deleteData);
      if (deleteData.success) {
        toast.success(deleteData.success);
        getAllNotes();
      } else {
        toast.error(deleteData.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MyContext.Provider
      value={{
        isLoading,
        setIsLoading,
        allNotesData,
        setAllNotesData,
        getAllNotes,
        deleteNote,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default ContextProvider;
