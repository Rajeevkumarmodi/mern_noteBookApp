import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

// ==================================update page==================================
function UpdateNote() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputValue, setInputVale] = useState({
    title: "",
    description: "",
  });

  // ===============================changeHandler function ===============================

  function changeHandler(e) {
    const { name, value } = e.target;
    setInputVale({ ...inputValue, [name]: value });
  }

  // ===========================fetch note data function===========================

  async function fetchNoteData() {
    const res = await fetch(`http://localhost:8080/api/note/updatenote/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const resData = await res.json();

    if (resData.error) {
      toast.error(resData.error);
    }

    const { title, description } = resData;
    setInputVale({ title: title, description: description });
  }

  // ========================call fetch note data function========================

  useEffect(() => {
    fetchNoteData();
  }, []);

  async function updateNote() {
    const { title, description } = inputValue;
    try {
      const res = await fetch(
        `http://localhost:8080/api/note/updatenote/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description }),
        }
      );

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.success);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Layout>
        <div className=" flex flex-col items-center bg-emerald-300 w-[90vw] md:w-[75vw] my-[60px] px-[30px] py-[40px] rounded-lg shadow-xl">
          <h2 className=" pb-5 font-bold text-3xl">Update Note</h2>
          <div className=" flex flex-col gap-4 w-full">
            <input
              className=" p-2 rounded-lg shadow-xl focus:outline-none"
              type="text"
              placeholder="Title"
              name="title"
              onChange={changeHandler}
              value={inputValue.title}
            />
            <textarea
              className=" p-2 rounded-lg shadow-xl focus:outline-none"
              rows="6"
              placeholder="Description"
              name="description"
              onChange={changeHandler}
              value={inputValue.description}
            ></textarea>
            <button
              onClick={updateNote}
              className=" bg-black text-white py-2 font-bold text-xl rounded-lg"
            >
              Update
            </button>
          </div>
        </div>
      </Layout>
      <Toaster />
    </div>
  );
}

export default UpdateNote;
