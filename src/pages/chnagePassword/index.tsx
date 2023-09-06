import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";

const ChnagePassword: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-800 bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center dark:text-white text-gray-800 mb-8">
          Change Passeord
        </h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
};
export default ChnagePassword;
