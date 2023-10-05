import React, { useEffect, useState } from "react";
import InputField from "./inputField";

export default function BookForm({ title, mode, onSubmit, inheritedBook }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    coverUrl: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (inheritedBook) {
      setBook(inheritedBook);
    }
  }, [inheritedBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(book);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={book.title}
          required
        />
        <InputField
          id="author"
          name="author"
          type="text"
          placeholder="Author"
          onChange={handleChange}
          value={book.author}
          required
        />
        <InputField
          id="isbn"
          name="isbn"
          type="text"
          placeholder="ISBN"
          onChange={handleChange}
          value={book.isbn}
          required
        />
        <InputField
          id="coverUrl"
          name="coverUrl"
          type="text"
          placeholder="Cover URL"
          onChange={handleChange}
          value={book.coverUrl}
          required
        />
        <InputField
          id="price"
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          value={book.price}
          required
        />
        <InputField
          id="stock"
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
          value={book.stock}
          required
        />
        {/* Add the rest of your form fields here */}
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
            type="submit"
          >
            {mode} Book
          </button>
        </div>
      </form>
    </div>
  );
}
