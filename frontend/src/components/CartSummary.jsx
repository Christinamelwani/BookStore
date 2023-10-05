import React from "react";
import { formatRupiah } from "@/utils/format";

function CartSummary({ cart, onCheckout }) {
  const totalPrice = cart.reduce(
    (total, book) => total + book.price * book.count,
    0
  );

  return (
    <div className="bg-white w-full lg:w-[40%] p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Total price:</h2>
          <p className="lg:text-blue-500 ml-2">{formatRupiah(totalPrice)}</p>
        </div>
        {cart[0] ? (
          <button
            onClick={onCheckout}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Checkout Cart
          </button>
        ) : (
          <div className="text-blue-500">Nothing in your cart yet</div>
        )}
      </div>
    </div>
  );
}

export default CartSummary;
