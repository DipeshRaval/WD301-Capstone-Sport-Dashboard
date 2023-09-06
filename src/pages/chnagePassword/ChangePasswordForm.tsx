import React from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  current_password: string;
  new_password: string;
};

export default function ChangePasswordForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { current_password, new_password } = data;

    try {
      const token: string | null = localStorage.getItem("authToken");
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors.includes("Invalid email or password")) {
          throw new Error(`${data.errors}`);
        } else {
          throw new Error("Password chnage operation failed");
        }
      }

      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      navigate("/signin");
      toast.success("Password changed Succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Password chnage operation failed:", error);
      toast.error(`${error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 dark:text-white font-semibold mb-2">
          Current Password:
        </label>
        <input
          type="password"
          id="current_password"
          {...register("current_password", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        {errors.current_password && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div>
        <label className="block text-gray-700 dark:text-white font-semibold mb-2">
          New Password:
        </label>
        <input
          type="password"
          id="new_password"
          {...register("new_password", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        {errors.new_password && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Change Password
      </button>
      <p className="mt-2">
        <span>Go to Home 👉👉</span>
        <Link
          to="/"
          className="mx-2 underline text-blue-600 dark:text-blue-400"
        >
          Home
        </Link>
      </p>
    </form>
  );
}
