import "@/app/globals.css";
import { useState } from "react";
import InputField from "./inputField";
import SubmitButton from "./submitButton";
import Link from "next/link";

export default function UserForm({ mode, onSubmit }) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(userData);
  }

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {mode === "Register"
              ? "Create an account"
              : "Log in to your account"}
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            {mode === "Register" && (
              <InputField
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
              />
            )}
            <InputField
              id="email-address"
              name="email"
              type="text"
              placeholder="Email address"
              onChange={handleChange}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {mode === "Register" ? (
              <div className="flex gap-2 cursor-pointer">
                <input
                  className="cursor-pointer"
                  name="isAdmin"
                  id="isAdmin"
                  type="checkbox"
                  onChange={handleChange}
                ></input>
                <label className="cursor-pointer" for="isAdmin">
                  Register as admin?
                </label>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-end">
            <SubmitButton text={mode} onSubmit={handleSubmit} />
            <p className="mt-2 text-sm text-gray-600">
              {mode === "Register" ? "Already registered? " : "New here? "}
              <Link
                href={mode === "Register" ? "/login" : "/register"}
                className="text-indigo-600 hover:underline"
              >
                {mode === "Register" ? "Log In" : "Register"} instead!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
