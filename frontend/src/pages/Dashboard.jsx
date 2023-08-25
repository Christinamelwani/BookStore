import React, { useState, useEffect } from "react";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const API_URL = "http://localhost:3000/book";

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBooks(data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBooks();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold text-center text-blue-600">
          Book Dashboard
        </h1>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-cart-fill text-blue-500 mr-1"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
          <span className="text-blue-500 font-semibold cursor-pointer">
            View Cart
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition duration-300"
          >
            <div className="aspect-w-2 aspect-h-3 mb-2">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-500 text-sm mt-1">{book.description}</p>
            <p className="text-blue-500 mt-1">{book.category}</p>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-green-600 font-semibold">${book.price}</p>
              <p className="text-gray-600">Stock: {book.stock}</p>
            </div>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
