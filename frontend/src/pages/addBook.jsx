import Navbar from "../components/navbar";
import BookForm from "../components/bookForm";
import { useRouter } from "next/router";
import { addBookData } from "../utils/api.js";
import { displayErrorAlert, displaySuccessAlert } from "../utils/alerts.js";

export default function AddBook() {
  const router = useRouter();

  async function submit(book) {
    try {
      const response = await addBookData(book);

      if (response.status === 201) {
        displaySuccessAlert("Book successfully added!");
        router.push("/");
      } else {
        displayErrorAlert(response.message);
      }
    } catch (error) {
      console.error("Error adding book:", error);
      displayErrorAlert(error.message);
    }
  }

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <Navbar headerText="Add Book" link="/" linkText="Back to Dashboard" />
      <BookForm title="Add a book" mode="Add" onSubmit={submit} />
    </div>
  );
}
