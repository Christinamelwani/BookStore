import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { fetchCartData, checkoutCartData } from "@/utils/api.js";
import {
  displayErrorAlert,
  displayConfirmationAlert,
  displaySuccessAlert,
} from "@/utils/alerts.js";
import CartItem from "@/components/cartItem";
import CartSummary from "@/components/cartSummary";

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
          <CartItem key={book.id} book={book} />
        ))}
        <CartSummary cart={cart} onCheckout={handleCheckout} />
      </div>
    </div>
  );
}
