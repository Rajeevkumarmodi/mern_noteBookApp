import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import NoteCard from "../../components/noteCard/NoteCard";
import MyContext from "../../context/myContext";
import Loading from "../../components/loading/Loading";

// =============================Home page=============================

function Home() {
  const navigate = useNavigate();
  const { allNotesData, getAllNotes, isLoading, setIsLoading } =
    useContext(MyContext);

  // ============================call get all notes function============================
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div>
      <Layout className="">
        <div className=" flex flex-col items-center">
          <p className=" text-3xl font-bold underline py-[30px]">All Notes</p>
          <div className=" flex flex-col gap-6">
            {allNotesData.length > 0 ? (
              allNotesData.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))
            ) : (
              <p className=" text-2xl">Notes not Found</p>
            )}
          </div>
        </div>
      </Layout>

      {isLoading ? <Loading /> : ""}
    </div>
  );
}

export default Home;
