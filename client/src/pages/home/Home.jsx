import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import NoteCard from "../../components/noteCard/NoteCard";
import MyContext from "../../context/myContext";

function Home() {
  const { allNotesData, getAllNotes } = useContext(MyContext);

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div>
      <Layout className="">
        <div className=" flex flex-col items-center">
          <p className=" text-3xl font-bold underline py-[30px]">All Notes</p>
          <div className=" flex flex-col gap-6">
            {allNotesData.length > 0
              ? allNotesData.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))
              : "Notes not Found"}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
