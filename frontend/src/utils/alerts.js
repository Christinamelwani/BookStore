// utils/alerts.js
import Swal from "sweetalert2";

export function displaySuccessAlert(message) {
  Swal.fire({
    text: message,
    icon: "success",
    timer: 1500,
    timerProgressBar: true,
  });
}

export function displayErrorAlert(message) {
  Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    timer: 1500,
    timerProgressBar: true,
  });
}

export function displayConfirmationAlert(message) {
  return Swal.fire({
    text: message,
    confirmButtonText: "Yes",
    confirmButtonColor: "#e3342f",
    cancelButtonText: "No",
    showCancelButton: true,
    icon: "question",
  });
}

export async function displayInputAlert(message) {
  return Swal.fire({
    text: message,
    confirmButtonText: "Confirm",
    confirmButtonColor: "green",
    showCancelButton: true,
    icon: "question",
    input: "text", // Add an input field
    inputValidator: (value) => {
      if (!value) {
        return "Please enter a value";
      }
    },
  });
}
