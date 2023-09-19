import React, { useState, useEffect } from "react";
import "@/app/globals.css";
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useState([]);

  async function fetchCart() {
    try {
      const response = await fetch("http://localhost:3000/cart", {
        headers: { access_token: localStorage.getItem("access_token") },
      });
      const data = await response.json();

      const cartData = data.data;

      const bookCounts = {};

      cartData.forEach((book) => {
        const bookId = book.id;
        if (bookId in bookCounts) {
          bookCounts[bookId].count++;
        } else {
          bookCounts[bookId] = {
            book,
            count: 1,
          };
        }
      });

      const uniqueBooks = Object.values(bookCounts).map(({ book, count }) => ({
        ...book,
        count,
      }));

      setCart(uniqueBooks);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-semibold text-center text-blue-600">
          Book Cart
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
              d="M0 1.5Aty.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4 a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
          <Link href="/">
            <span className="text-blue-500 font-semibold cursor-pointer">
              Back to dashboard
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {cart.map((book) => (
          <div key={book.id} className="bg-white w-96 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-gray-500">{book.author}</p>
                <p className="text-blue-500">
                  Total price: Rp {book.price * book.count}
                </p>
              </div>
              <div>No: {book.count}</div>
            </div>
          </div>
        ))}
        <div className="bg-white w-96 p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Total price:</h2>
              <p className="text-blue-500 ml-2">
                Rp
                {cart.reduce(
                  (total, book) => (total += book.price * book.count),
                  0
                )}
              </p>
            </div>
            {cart[0] ? (
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Checkout Cart
              </button>
            ) : (
              <div>Nothing in your cart yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
