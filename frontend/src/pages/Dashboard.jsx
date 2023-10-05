import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import BookCard from "../components/BookCard"; // Import the BookCard component
import { fetchUserData, fetchBooksData, fetchCartData } from "../utils/api.js";
import { displayErrorAlert } from "@/utils/alerts";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);

  async function fetchData() {
    try {
      const { data: userData } = await fetchUserData();
      setUser(userData);

      const { data: booksData } = await fetchBooksData();
      setBooks(booksData);

      const { data: cartData } = await fetchCartData();
      setCart(cartData);
    } catch (error) {
      displayErrorAlert("Error fetching data!");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <Navbar
        headerText={user.isAdmin ? "Admin Dashboard" : "Dashboard"}
        link={user.isAdmin ? "/addBook" : "/cart"}
        linkText={user.isAdmin ? "Add Book" : "View Cart"}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            cart={cart}
            isAdmin={user.isAdmin}
            fetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
