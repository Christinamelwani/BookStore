import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";
import { fetchCartData, checkoutCartData } from "../utils/api.js";
import {
  displayErrorAlert,
  displayConfirmationAlert,
  displaySuccessAlert,
} from "../utils/alerts.js";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  async function fetchAndSetCartData() {
    try {
      const data = await fetchCartData();

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
      console.error("Error fetching cart data:", error);
      displayErrorAlert("Error fetching cart data. Please try again later.");
    }
  }

  async function handleCheckout() {
    const confirmation = await displayConfirmationAlert(
      "Are you sure you would like to checkout this cart?"
    );

    if (confirmation.isConfirmed) {
      try {
        await checkoutCartData();
        displaySuccessAlert("Order placed!");
        router.replace("/");
      } catch (error) {
        console.error("Error checking out cart:", error);
        displayErrorAlert("Error checking out cart. Please try again later.");
      }
    }
  }

  useEffect(() => {
    fetchAndSetCartData();
  }, []);

  return (
    <div className="p-4 lg:p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <Navbar headerText="Cart" link="/" linkText="Back to Dashboard" />
      <div className="flex flex-col items-center space-y-4">
        {cart.map((book) => (
          <div
            key={book.id}
            className="bg-white w-full lg:w-[40%] p-4 rounded-lg shadow-md"
          >
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-gray-500">{book.author}</p>
              </div>
              <div className="lg:text-blue-500">
                Total price:{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(book.price * book.count)}
              </div>
            </div>
            <div className="text-blue-500">Quantity: {book.count}</div>
          </div>
        ))}
        <div className="bg-white w-full lg:w-[40%] p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="text-lg font-semibold">Total price:</h2>
              <p className="lg:text-blue-500 ml-2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(
                  cart.reduce(
                    (total, book) => (total += book.price * book.count),
                    0
                  )
                )}
              </p>
            </div>
            {cart[0] ? (
              <button
                onClick={handleCheckout}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Checkout Cart
              </button>
            ) : (
              <div className="text-blue-500">Nothing in your cart yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
