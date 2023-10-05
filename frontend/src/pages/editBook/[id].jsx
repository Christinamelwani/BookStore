import Navbar from "../../components/navbar";
import BookForm from "../../components/bookForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchBookData, editBookData } from "../../utils/api.js";
import { displayErrorAlert, displaySuccessAlert } from "../../utils/alerts.js";

export default function EditBook() {
  const router = useRouter();
  const [book, setBook] = useState({});

  async function fetchBook() {
    if (!router.isReady) {
      return;
    }

    try {
      const data = await fetchBookData(router.query.id);
      setBook(data);
    } catch (error) {
      console.error("Error fetching book data:", error);
      displayErrorAlert("Error fetching book data. Please try again later.");
    }
  }

  async function submit(book) {
    try {
      const response = await editBookData(book);

      if (response.status === 200) {
        displaySuccessAlert("Book successfully edited!");
        router.push("/");
      } else {
        displayErrorAlert(response.message);
      }
    } catch (error) {
      console.error("Error editing book:", error);
      displayErrorAlert("Error editing book. Please try again later.");
    }
  }

  useEffect(() => {
    async function fetchData() {
      await fetchBook();
    }

    fetchData();
  }, [router.isReady]);

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <Navbar headerText="Edit Book" link="/" linkText="Back to Dashboard" />
      {book.title && (
        <BookForm
          title={`Edit "${book.title}"`}
          mode="Edit"
          onSubmit={submit}
          inheritedBook={book}
        />
      )}
    </div>
  );
}
