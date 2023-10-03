import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function AdminControls({ book, fetchBooks }) {
  const router = useRouter();
  async function restockBook() {
    const result = await Swal.fire({
      title: "Restock Book",
      text: `How many copies of ${book.title} would you like to restock?`,
      input: "text",
      showCancelButton: true,
    });

    if (!result.value) {
      return;
    }

    const response = await fetch(
      `http://localhost:3000/book/${book.id}/restock`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock: result.value }),
      }
    );

    const responseData = await response.json();

    if (responseData.status === 200) {
      Swal.fire({
        text: "Successfully restocked!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
      });
      fetchBooks();
    }
  }

  async function deleteBook() {
    const result = await Swal.fire({
      text: `Are you sure you want to delete ${book.title}?`,
      confirmButtonText: "Yes",
      confirmButtonColor: "#e3342f",
      cancelButtonText: "No",
      showCancelButton: true,
      icon: "question",
    });

    if (!result.value) {
      return;
    }

    const response = await fetch(`http://localhost:3000/book/${book.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.status === 200) {
      Swal.fire({
        text: "Successfully deleted!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
      });
      fetchBooks();
    }
  }

  return (
    <div className="flex items-center py-4">
      <div className="flex items-center justify-between gap-5 px-10">
        <button
          onClick={restockBook}
          id={book.id}
          className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition duration-300"
        >
          Restock
        </button>
        <button
          id={book.id}
          onClick={() => {
            router.push(`/editBook/${book.id}`);
          }}
          className="bg-yellow-500 text-white rounded px-4 py-2 hover:bg-yellow-600 transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={deleteBook}
          id={book.id}
          className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
