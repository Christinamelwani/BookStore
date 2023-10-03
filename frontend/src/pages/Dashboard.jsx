import React, { useState, useEffect } from "react";
import "@/app/globals.css";
import Navbar from "@/app/components/navbar";
import AdminControls from "./adminControls";
import BookCounter from "./bookCounter";

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

  useEffect(() => {
    fetchBooks();
    fetchUser();
    fetchCart();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      {user.isAdmin ? (
        <Navbar
          headerText="Admin Dashboard"
          link="/addBook"
          linkText="Add Book"
        />
      ) : (
        <Navbar
          headerText="Dashboard"
          link="/cart"
          linkText="View Cart"
        ></Navbar>
      )}
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
            <h2
              className="text-lg font-semibold mb-1"
              style={{
                maxWidth: "20rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {book.title}
            </h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-500 text-sm mt-1">{book.description}</p>
            <p className="text-blue-500 mt-1">{book.category}</p>
            <div className="mt-2 flex gap-10 justify-between items-center">
              <p className="text-blue-600 font-semibold">Rp. {book.price}</p>
              <p className="text-gray-600">Stock: {book.stock}</p>
            </div>
            {user.isAdmin ? (
              <AdminControls book={book} fetchBooks={fetchBooks} />
            ) : (
              <BookCounter
                book={book}
                cart={cart}
                fetchBooks={fetchBooks}
                fetchCart={fetchCart}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
