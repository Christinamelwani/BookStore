import { useRouter } from "next/router";
import React from "react";
import UserForm from "@/app/components/userForm";
import Swal from "sweetalert2";
import Head from "next/head";

const API_URL = "http://localhost:3000/user/login";

export default function Login() {
  const router = useRouter();

  async function submitLoginForm(userData) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);

        Swal.fire({
          title: "Success!",
          text: "Successfully logged in",
          icon: "success",
        });

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
        <title>Login</title>
      </Head>
      <UserForm mode="Log In" onSubmit={submitLoginForm} />
    </>
  );
}
