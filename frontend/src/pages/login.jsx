import { useRouter } from "next/router";
import React from "react";
import UserForm from "../components/userForm";
import { loginUser } from "../utils/api";
import { displaySuccessAlert, displayErrorAlert } from "../utils/alerts";
import Head from "next/head";

export default function Login() {
  const router = useRouter();

  async function submitLoginForm(userData) {
    try {
      const response = await loginUser(userData);

      if (response.ok) {
        const data = await response.json();
        displaySuccessAlert("Successfully logged in");
        localStorage.setItem("access_token", data.access_token);
        router.push("/");
      } else {
        const errorData = await response.json();
        displayErrorAlert(errorData.message || "An error occurred");
      }
    } catch (error) {
      displayErrorAlert("An unexpected error occurred");
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <UserForm mode="Log In" onSubmit={submitLoginForm} />
    </>
  );
}
