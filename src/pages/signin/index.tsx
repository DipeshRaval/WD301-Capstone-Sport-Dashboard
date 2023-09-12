import React from "react";
import SigninForm from "./SigninForm";
import thumbnil from "../../assets/login-thumb.webp";
const Signin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="max-w-2xl w-full px-6 py-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-3">
          <div>
            <h1 className="text-3xl font-bold text-center dark:text-white text-gray-800 mb-8">
              Sign in
            </h1>
            <SigninForm />
          </div>
          <div className="flex items-center justify-center ml-8 w-3/6 h-3/6">
            <img src={thumbnil} alt="Login..." />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signin;
