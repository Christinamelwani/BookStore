import React from "react";
import UserForm from "@/app/components/userForm";
import Swal from "sweetalert2";
import Head from "next/head";

const API_URL = "http://localhost:3000/user/register";

export default function Register() {
  async function submitRegisterForm(userData) {
    try {
      const response = await fetch(API_URL, {
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
