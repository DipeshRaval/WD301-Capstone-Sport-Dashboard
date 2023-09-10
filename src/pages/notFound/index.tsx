import React from "react";
import ErrorImg from "../../assets/errorImg.avif";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-extrabold font-serif text-gray-900 mt-3">
        404 - Page Not Found
      </h1>
      <img src={ErrorImg} alt="Not Found" className="h-96" />
      <Link
        to={"/"}
        className="text-gray-800 bg-green-400 px-3 py-2 rounded-md font-bold"
      >
        Home
      </Link>
    </div>
  );
}
