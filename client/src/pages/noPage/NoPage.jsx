import React from "react";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-3">
      <h2 className="text-6xl font-bold">4😒4</h2>
      <h3 className=" text-3xl">Not Found</h3>
      <p className=" text-2xl">
        The resource requested could not be found on this server!
      </p>
      <Link
        to="/login"
        className=" bg-blue-500 py-2 px-3 text-white rounded-lg font-bold hover:shadow-md shadow-gray-300"
      >
        Go to Login page
      </Link>
    </div>
  );
}

export default NoPage;
