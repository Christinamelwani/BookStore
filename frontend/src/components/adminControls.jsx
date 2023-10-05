import { useRouter } from "next/router";
import { restockBook, deleteBook } from "../utils/api";
import {
  displaySuccessAlert,
  displayConfirmationAlert,
  displayInputAlert,
} from "../utils/alerts";

export default function AdminControls({ book, fetchData }) {
  const router = useRouter();

  const restockBookHandler = async () => {
    const result = await displayInputAlert(
      `How many copies of ${book.title} do you want to restock?`
    );

    if (!result.value) {
      return;
    }

    try {
      const responseData = await restockBook(book, result.value);

      if (responseData.status === 200) {
        displaySuccessAlert("Successfully restocked!");
        fetchData();
      } else {
        displayErrorAlert("Failed to restock.");
      }
    } catch (error) {
      displayErrorAlert("Network error. Please try again later.");
    }
  };

  const deleteBookHandler = async () => {
    const result = await displayConfirmationAlert(
      `Are you sure you want to delete ${book.title}?`
    );

    if (!result.value) {
      return;
    }

    try {
      const responseData = await deleteBook(book);

      if (responseData.status === 200) {
        displaySuccessAlert("Successfully deleted!");
        fetchData();
      } else {
        displayErrorAlert("Failed to delete.");
      }
    } catch (error) {
      displayErrorAlert("Network error. Please try again later.");
    }
  };

  return (
    <div className="flex items-center py-4">
      <div className="flex items-center justify-between gap-5 px-10">
        <button
          onClick={restockBookHandler}
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
          onClick={deleteBookHandler}
          id={book.id}
          className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
