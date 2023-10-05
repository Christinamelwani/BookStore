import React from "react";
import UserForm from "../components/userForm";
import Swal from "sweetalert2";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  async function submitRegisterForm(userData) {
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Successfully registered",
          icon: "success",
        });

        const loginResponse = await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await loginResponse.json();
        localStorage.setItem("access_token", data.access_token);

        router.push("/");
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error",
          text: errorData.message || "An error occurred",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("An error occurred while sending user data:", error);
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
      });
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
