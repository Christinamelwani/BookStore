import React, { useState, useEffect } from "react";
import "@/app/globals.css";
import Navbar from "@/app/components/navbar";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

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

  async function checkoutCart() {
    const answer = await Swal.fire({
      title: "Are you sure you would like to checkout this cart?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    });

    if (answer.isConfirmed) {
      // Create a transaction
      // Empty cart
      const response = await fetch("http://localhost:3000/cart", {
        headers: { access_token: localStorage.getItem("access_token") },
        method: "DELETE",
      });
      // Alert that a transaction has been created
      Swal.fire({
        title: "Order placed!",
      });
      // Redirect back to dashboard
      router.replace("/");
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <Navbar headerText="Cart" link="/" linkText="Back to Dashboard" />
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
              <button
                onClick={checkoutCart}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
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
