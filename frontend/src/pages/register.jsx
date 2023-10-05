import React from "react";
import UserForm from "../components/userForm";
import { registerUser, loginUser } from "../utils/api";
import { displaySuccessAlert, displayErrorAlert } from "../utils/alerts";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  async function submitRegisterForm(userData) {
    try {
      const response = await registerUser(userData);

      if (response.ok) {
        displaySuccessAlert("Successfully registered");

        const loginResponse = await loginUser(userData);

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          localStorage.setItem("access_token", data.access_token);
          router.push("/");
        } else {
          displayErrorAlert("Login Error", "An error occurred during login");
        }
      } else {
        const errorData = await response.json();
        displayErrorAlert(
          "Registration Error",
          errorData.message || "An error occurred"
        );
      }
    } catch (error) {
      console.error("An error occurred while sending user data:", error);
      displayErrorAlert("Error", "An unexpected error occurred");
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <UserForm mode="Register" onSubmit={submitRegisterForm} />
    </>
  );
}
