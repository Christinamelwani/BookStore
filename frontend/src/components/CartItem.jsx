import React from "react";
import { formatRupiah } from "@/utils/format";

function CartItem({ book }) {
  return (
    <div className="bg-white w-full lg:w-[40%] p-4 rounded-lg shadow-md">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-gray-500">{book.author}</p>
        </div>
        <div className="lg:text-blue-500">
          Total price: {formatRupiah(book.price * book.count)}
        </div>
      </div>
      <div className="text-blue-500">Quantity: {book.count}</div>
    </div>
  );
}

export default CartItem;
