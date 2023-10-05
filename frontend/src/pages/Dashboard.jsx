import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import AdminControls from "../components/adminControls";
import BookCounter from "../components/bookCounter";
import { fetchUserData, fetchBooksData, fetchCartData } from "../utils/api.js";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  async function fetchData() {
    try {
      const { data: userData } = await fetchUserData();
      setUser(userData);
      setIsAdmin(userData.isAdmin);

      const { data: booksData } = await fetchBooksData();
      setBooks(booksData);

      const { data: cartData } = await fetchCartData();
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen">
      <Navbar
        headerText={isAdmin ? "Admin Dashboard" : "Dashboard"}
        link={isAdmin ? "/addBook" : "/cart"}
        linkText={isAdmin ? "Add Book" : "View Cart"}
      />
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
            <h2 className="text-lg font-semibold mb-1 max-w-[15rem] lg:max-w-[20rem] whitespace-nowrap overflow-hidden overflow-ellipsis">
              {book.title}
            </h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-gray-500 text-sm mt-1">{book.description}</p>
            <p className="text-blue-500 mt-1">{book.category}</p>
            <div className="mt-2 flex gap-10 justify-between items-center">
              <p className="text-blue-600 font-semibold">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(book.price)}
              </p>
              <p className="text-gray-600">Stock: {book.stock}</p>
            </div>
            {isAdmin ? (
              <AdminControls book={book} fetchData={fetchData} />
            ) : (
              <BookCounter book={book} cart={cart} fetchData={fetchData} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
