import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import AddNote from "./pages/addNote/AddNote";
import UpdateNote from "./pages/updateNote/UpdateNote";
import NoPage from "./pages/noPage/NoPage";
import ContextProvider from "./context/ContextProvider";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={token ? <Home /> : <Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={token ? <Profile /> : <Login />} />
            <Route path="/addnote" element={token ? <AddNote /> : <NoPage />} />
            <Route
              path="/updatenote/:id"
              element={token ? <UpdateNote /> : <Login />}
            />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
