import React from "react";
import AdminControls from "./adminControls";
import BookCounter from "./bookCounter";
import { formatRupiah } from "@/utils/format";

function BookCard({ book, isAdmin, fetchData, cart }) {
  return (
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
          {formatRupiah(book.price)}
        </p>
        <p className="text-gray-600">Stock: {book.stock}</p>
      </div>
      {isAdmin ? (
        <AdminControls book={book} fetchData={fetchData} />
      ) : (
        <BookCounter book={book} cart={cart} fetchData={fetchData} />
      )}
    </div>
  );
}

export default BookCard;
