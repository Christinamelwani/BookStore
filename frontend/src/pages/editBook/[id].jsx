import Navbar from "../components/navbar";
import BookForm from "../components/bookForm";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditBook() {
  const router = useRouter();
  const [book, setBook] = useState({});

  async function fetchBook() {
    if (!router.isReady) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/book/${router.query.id}`
      );
      const data = await response.json();
      setBook(data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function submit(book) {
    const response = await fetch(`http://localhost:3000/book/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    const data = await response.json();

    if (data.status === 200) {
      Swal.fire("Book successfully edited!");
      router.push("/");
    } else {
      Swal.fire(data.message);
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
      <Navbar
        headerText="Edit Book"
        link="/"
        linkText="Back to Dashboard"
      ></Navbar>
      {book.title ? (
        <BookForm
          title={`Edit "${book.title}"`}
          mode="Edit"
          onSubmit={submit}
          inheritedBook={book}
        />
      ) : null}
    </div>
  );
}
