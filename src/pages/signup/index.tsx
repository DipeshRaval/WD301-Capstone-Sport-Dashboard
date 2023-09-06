import React from "react";
import SignupForm from "./SignupForm";

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 dark:text-white ">
          Sign up
        </h1>
        <SignupForm />
      </div>
    </div>
  );
};
export default Signup;
