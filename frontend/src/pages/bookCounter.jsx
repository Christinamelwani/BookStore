export default function BookCounter({ book, cart, fetchBooks, fetchCart }) {
  async function addToCart(e) {
    const response = await fetch("http://localhost:3000/cart", {
      headers: {
        access_token: localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ bookId: e.target.id }),
    });

    fetchCart();
    fetchBooks();
  }

  async function removeFromCart(e) {
    const response = await fetch(`http://localhost:3000/cart/${e.target.id}`, {
      headers: {
        access_token: localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    fetchCart();
    fetchBooks();
  }

  function bookCounter(id) {
    const books = cart.filter((book) => book.id === id);
    if (books.length) {
      return books.length;
    } else {
      return 0;
    }
  }

  return bookCounter(book.id) ? (
    <div className="flex items-center">
      <button
        id={book.id}
        onClick={removeFromCart}
        className="bg-red-500 text-white h-8 w-8 flex items-center justify-center hover:bg-red-600 transition duration-300"
      >
        -
      </button>
      <span className="text-lg font-semibold mx-2">{bookCounter(book.id)}</span>
      <button
        id={book.id}
        onClick={addToCart}
        className="bg-green-500 text-white  h-8 w-8 flex items-center justify-center hover:bg-green-600 transition duration-300"
      >
        +
      </button>
    </div>
  ) : (
    <button
      onClick={addToCart}
      id={book.id}
      className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition duration-300"
    >
      Add to Cart
    </button>
  );
}
