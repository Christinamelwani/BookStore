import Link from "next/link";
import React, { useState, useEffect } from "react";
import "@/app/globals.css";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState([]);

  const API_URL = "http://localhost:3000/book";

  async function fetchBooks() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }

  async function fetchUser() {
    try {
      const response = await fetch("http://localhost:3000/user", {
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const data = await response.json();
      setUser(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function fetchCart() {
    try {
      const response = await fetch("http://localhost:3000/cart", {
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const data = await response.json();
      setCart(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function addToCart(e) {
    const response = await fetch("http://localhost:3000/cart", {
      headers: {
        access_token: localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ bookId: e.target.id }),
    });

    fetchCart();
    fetchBooks();
  }

  async function removeFromCart(e) {
    const response = await fetch(`http://localhost:3000/cart/${e.target.id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    fetchCart();
    fetchBooks();
  }

  function bookCounter(id) {
    const books = cart.filter((book) => book.id === id);
    if (books.length) {
      return books.length;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    fetchBooks();
    fetchUser();
    fetchCart();
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
              d="M0 1.5Aty.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
          <Link href="/cart">
            <span className="text-blue-500 font-semibold cursor-pointer">
              View Cart
            </span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white flex flex-col items-center rounded-lg shadow p-4 hover:shadow-lg transition duration-300"
          >
            <div className="aspect-w-2 aspect-h-3 mb-2">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="object-cover rounded-lg h-[20rem] w-[15rem]"
              />
            </div>
            <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-500 text-sm mt-1">{book.description}</p>
            <p className="text-blue-500 mt-1">{book.category}</p>
            <div className="mt-2 flex gap-10 justify-between items-center">
              <p className="text-green-600 font-semibold">Rp. {book.price}</p>
              <p className="text-gray-600">Stock: {book.stock}</p>
            </div>
            {bookCounter(book.id) ? (
              <div className="flex items-center">
                <button
                  id={book.id}
                  onClick={removeFromCart}
                  className="bg-red-500 text-white h-8 w-8 flex items-center justify-center hover:bg-red-600 transition duration-300"
                >
                  -
                </button>
                <span className="text-lg font-semibold mx-2">
                  {bookCounter(book.id)}
                </span>
                <button
                  id={book.id}
                  onClick={addToCart}
                  className="bg-green-500 text-white  h-8 w-8 flex items-center justify-center hover:bg-green-600 transition duration-300"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={addToCart}
                id={book.id}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition duration-300"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
