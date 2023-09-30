import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import AddNote from "./pages/addNote/AddNote";
import UpdateNote from "./pages/updateNote/UpdateNote";
import NoPage from "./pages/noPage/NoPage";
import ContextProvider from "./context/ContextProvider";

function App() {
  return (
    <div>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addnote" element={<AddNote />} />
            <Route path="/updatenote/:id" element={<UpdateNote />} />
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
