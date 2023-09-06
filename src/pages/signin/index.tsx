import React from "react";
import SigninForm from "./SigninForm";

const Signin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center dark:text-white text-gray-800 mb-8">
          Sign in
        </h1>
        <SigninForm />
      </div>
    </div>
  );
};
export default Signin;
