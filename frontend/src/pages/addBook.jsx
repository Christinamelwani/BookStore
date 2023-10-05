import Navbar from "../components/navbar";
import BookForm from "../components/bookForm";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function AddBook() {
  const router = useRouter();

  async function submit(book) {
    const response = await fetch("http://localhost:3000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    const data = await response.json();

    if (data.status === 201) {
      Swal.fire("Book successfully added!");
      router.push("/");
    } else {
      Swal.fire(data.message);
    }
  }

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <Navbar
        headerText="Add Book"
        link="/"
        linkText="Back to Dashboard"
      ></Navbar>
      <BookForm title="Add a book" mode="Add" onSubmit={submit} />
    </div>
  );
}
