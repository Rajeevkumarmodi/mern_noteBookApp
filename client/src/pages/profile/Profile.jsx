import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcManager } from "react-icons/fc";
import toast, { Toaster } from "react-hot-toast";

import Loading from "../../components/loading/Loading";

import Layout from "../../components/layout/Layout";
import MyContext from "../../context/myContext";

// =======================================profile page==========================================

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const { isLoading, setIsLoading } = useContext(MyContext);

  // ============================fetch user============================

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(
      "https://mern-e-note-kak418icj-rajeev-kumars-projects.vercel.app/api/auth/getuser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const serverResponse = await res.json();
    if (serverResponse.error) {
      toast.error(serverResponse.error);
      localStorage.removeItem("token");
      setTimeout(() => navigate("/login"), 500);
      navigate("/login");
      setIsLoading(false);
    } else {
      setUserData(serverResponse);
      setIsLoading(false);
    }
  }

  // ======================================delete user======================================

  async function deleteUser() {
    try {
      const res = await fetch(
        "https://mern-e-note-kak418icj-rajeev-kumars-projects.vercel.app/api/auth/deleteuser",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const serverResponse = await res.json();

      if (serverResponse.error) {
        toast.error(serverResponse.error);
      } else {
        toast.success(serverResponse.success);
        setTimeout(() => navigate("/login"), 500);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // =============================call fetch user function=============================

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Layout>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <FcManager className=" text-[150px]" />
              <h3 className=" text-xl">
                Name :- <span className=" font-bold">{userData.name}</span>
              </h3>
              <h3 className=" text-xl">Email :- {userData.email}</h3>
              <h3 className=" text-xl">ID :- {userData._id}</h3>
              <div className=" my-[30px]">
                <button
                  onClick={deleteUser}
                  className=" px-3 py-2 bg-blue-500 rounded-lg text-white"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </Layout>
      <Toaster />
    </div>
  );
}

export default Profile;
