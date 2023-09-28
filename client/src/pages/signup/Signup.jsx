import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInputValue({ ...inputValue, [name]: value });
  }

  async function signUp(e) {
    e.preventDefault();
    const { name, email, password } = inputValue;

    if (!name || !email || !password) {
      toast.error("All fields are required");
    } else {
      try {
        const res = await fetch("http://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const signupData = await res.json();
        if (signupData.success) {
          toast.success(signupData.success);
          setTimeout(() => navigate("/login"), 250);
          // navigate("/login");
        } else {
          toast.error(signupData.error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className=" flex flex-col bg-slate-300 w-[60vw] md:w-[35vw] items-center rounded-lg p-4 shadow-md shadow-blue-300">
        <h2 className=" pb-2 font-bold text-xl">Signup</h2>
        <form className=" flex flex-col gap-3 w-full">
          <input
            className=" rounded-lg px-2 py-1 focus:outline-none shadow-xl"
            type="text"
            placeholder="Name"
            name="name"
            onChange={changeHandler}
            value={inputValue.name}
          />
          <input
            className=" rounded-lg px-2 py-1 focus:outline-none shadow-xl"
            type="email"
            placeholder="Email"
            name="email"
            onChange={changeHandler}
            value={inputValue.email}
          />
          <input
            className=" rounded-lg px-2 py-1 focus:outline-none shadow-xl"
            type="password"
            placeholder="Password"
            name="password"
            onChange={changeHandler}
            value={inputValue.password}
          />
          <button
            onClick={signUp}
            className=" bg-green-600 py-1 rounded-xl font-bold
           text-white text-xl shadow-md shadow-black"
          >
            Signup
          </button>
          <p>
            I have a account{" "}
            <Link to="/login" className=" font-bold text-green-600">
              Login
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
