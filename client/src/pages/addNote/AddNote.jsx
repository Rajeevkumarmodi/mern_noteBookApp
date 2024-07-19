import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import toast, { Toaster } from "react-hot-toast";

// ============================add note page============================
function AddNote() {
  const navigate = useNavigate();
  const [noteValue, setNoteValue] = useState({
    title: "",
    description: "",
  });

  // ===============================changeHandler function===============================
  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    setNoteValue({ ...noteValue, [name]: value });
  }

  // ===============================add note function===============================

  async function addNote() {
    const { title, description } = noteValue;

    if (!title || !description) {
      toast.error("All fields are required❌😠");
    } else {
      const res = await fetch(
        "https://mern-e-note-kak418icj-rajeev-kumars-projects.vercel.app/api/note/addnote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description }),
        }
      );

      const addNoteRespose = await res.json();

      if (addNoteRespose.success) {
        toast.success(addNoteRespose.success);
        setNoteValue({
          title: "",
          description: "",
        });
      } else {
        toast.error(addNoteRespose.error);
        setTimeout(() => navigator("/login"), 500);
        localStorage.removeItem("token");
      }
    }
  }

  return (
    <div>
      <Layout>
        <div className=" flex flex-col items-center bg-emerald-300 w-[90vw] md:w-[75vw] my-[60px] px-[30px] py-[40px] rounded-lg shadow-xl">
          <h2 className=" pb-5 font-bold text-3xl">Add Note</h2>
          <div className=" flex flex-col gap-4 w-full">
            <input
              onChange={changeHandler}
              name="title"
              className=" p-2 rounded-lg shadow-xl focus:outline-none"
              type="text"
              placeholder="Title"
              value={noteValue.title}
            />
            <textarea
              onChange={changeHandler}
              name="description"
              className=" p-2 rounded-lg shadow-xl focus:outline-none"
              rows="6"
              placeholder="Description"
              value={noteValue.description}
            ></textarea>
            <button
              onClick={addNote}
              className=" bg-black text-white py-2 font-bold text-xl rounded-lg"
            >
              Add
            </button>
          </div>
        </div>
      </Layout>
      <Toaster />
    </div>
  );
}

export default AddNote;
