import React, { useContext, useEffect, useState } from "react";
import { FcManager } from "react-icons/fc";
import Loding from "../../components/loading/Loading";

import Layout from "../../components/layout/Layout";
import MyContext from "../../context/myContext";

// =======================================profile page==========================================

function Profile() {
  const [userData, setUserData] = useState("");
  const { isLoding, setIsLoding } = useContext(MyContext);

  // ============================fetch user============================

  async function fetchUser() {
    setIsLoding(true);
    const res = await fetch("http://localhost:8080/api/auth/getuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    setUserData(await res.json());
    setIsLoding(false);
  }

  // =============================call fetch user function=============================

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Layout>
        <div>
          {isLoding ? (
            <Loding />
          ) : (
            <div>
              <FcManager className=" text-[150px]" />
              <h3 className=" text-xl">
                Name :- <span className=" font-bold">{userData.name}</span>
              </h3>
              <h3 className=" text-xl">Email :- {userData.email}</h3>
              <h3 className=" text-xl">ID :- {userData._id}</h3>
              <div className=" my-[30px]">
                <button className=" px-3 py-2 bg-blue-500 rounded-lg text-white">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default Profile;
