import { addToCart, removeFromCart } from "../utils/api";

export default function BookCounter({ book, cart, fetchData }) {
  function bookCounter(id) {
    const books = cart.filter((book) => book.id === id);
    if (books.length) {
      return books.length;
    } else {
      return 0;
    }
  }

  const bookCount = bookCounter(book.id);

  async function handleAddToCartClick(e) {
    await addToCart(e.target.id);
    await fetchData();
  }

  async function handleRemoveFromCartClick(e) {
    await removeFromCart(e.target.id);
    await fetchData();
  }

  return (
    <div className="flex items-center">
      {bookCount > 0 ? (
        <>
          <button
            id={book.id}
            onClick={handleRemoveFromCartClick}
            className="bg-red-500 text-white h-8 w-8 flex items-center justify-center hover:bg-red-600 transition duration-300"
          >
            -
          </button>
          <span className="text-lg font-semibold mx-2">{bookCount}</span>
          <button
            id={book.id}
            onClick={handleAddToCartClick}
            className="bg-green-500 text-white h-8 w-8 flex items-center justify-center hover:bg-green-600 transition duration-300"
          >
            +
          </button>
        </>
      ) : (
        <button
          onClick={handleAddToCartClick}
          id={book.id}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition duration-300"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
