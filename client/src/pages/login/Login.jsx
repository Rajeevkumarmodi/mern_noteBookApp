import React, { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import MyContext from "../../context/myContext";

// ===============================login page===============================
function Login() {
  const { isLoading, setIsLoading } = useContext(MyContext);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  // ==============================changeHandler function==============================

  function changeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;

    setInputValue({ ...inputValue, [name]: value });
  }

  // ================================login function================================
  async function login(e) {
    e.preventDefault();
    const { email, password } = inputValue;

    if (!email || !password) {
      toast.error("All fields are required");
    } else {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        setInputValue({
          email: "",
          password: "",
        });
        const loginData = await res.json();
        if (loginData.success) {
          toast.success(loginData.success);
          navigate("/");
          localStorage.setItem("token", loginData.token, {});
          setIsLoading(false);
        } else {
          toast.error(loginData.error);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className=" flex flex-col bg-slate-300 w-[60vw] md:w-[35vw] items-center rounded-lg p-4 shadow-md shadow-blue-300">
        <h2 className=" pb-2 font-bold text-xl">Login</h2>
        <form className=" flex flex-col gap-3 w-full">
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
            onClick={login}
            className=" bg-green-600 py-1 rounded-xl font-bold
           text-white text-xl shadow-md shadow-black"
          >
            Login
          </button>
          <p>
            I don't have an account{" "}
            <Link to="/signup" className=" font-bold text-green-600">
              Signup
            </Link>
          </p>
        </form>
      </div>
      <Toaster />
      {/* Laoading  */}
      {isLoading ? <Loading /> : ""}
    </div>
  );
}

export default Login;
