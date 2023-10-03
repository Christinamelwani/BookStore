const { unloadToken } = require("../helpers/jwt");
const { Category, CartBook, Book, Cart } = require("../models");

class CartController {
  static async addBookToCart(req, res, next) {
    try {
      const userId = unloadToken(req.headers.access_token).id;
      const { bookId } = req.body;

      let book = await Book.findOne({ where: { id: bookId } });

      if (book.stock === 0) {
        res.status(500).json({ status: 500, error: "Book out of stock!" });
        return;
      }

      await Book.update({ stock: book.stock - 1 }, { where: { id: bookId } });

      let cart = await Cart.findOne({ where: { UserId: userId } });
      if (!cart) {
        cart = Cart.create({ UserId: userId, totalPrice: 0 });
      }

      const cartBookItem = await CartBook.create({
        CartId: cart.id,
        BookId: bookId,
      });

      res.status(201).json({ status: 201, data: cartBookItem });
    } catch (err) {
      next(err);
    }
  }
  static async removeBookFromCart(req, res, next) {
    const userId = unloadToken(req.headers.access_token).id;
    const bookId = req.params.id;

    let book = await Book.findOne({ where: { id: bookId } });
    await Book.update({ stock: book.stock + 1 }, { where: { id: bookId } });

    let cart = await Cart.findOne({ where: { UserId: userId } });
    if (!cart) {
      cart = Cart.create({ UserId: userId, totalPrice: 0 });
    }

    const cartBookItem = await CartBook.findOne({
      where: {
        CartId: cart.id,
        BookId: bookId,
      },
    });

    const deleted = await CartBook.destroy({
      where: { createdAt: cartBookItem.createdAt },
    });

    res.status(200).json({ status: 200, data: deleted });
  }
  static async getAllBooksInCart(req, res, next) {
    try {
      let books = [];

      const userId = unloadToken(req.headers.access_token).id;
      const cart = await Cart.findOne({ where: { UserId: userId } });

      if (cart) {
        const cartBooks = await CartBook.findAll({
          where: { CartId: cart.id },
          include: Book,
        });
        books = cartBooks.map((cartBooks) => cartBooks.Book);
      }

      res.status(200).json({ status: 200, data: books });
    } catch (err) {
      next(err);
    }
  }
  static async emptyCart(req, res, next) {
    try {
      const userId = unloadToken(req.headers.access_token).id;

      let cart = await Cart.findOne({ where: { UserId: userId } });

      const deleted = await CartBook.destroy({
        where: { CartId: cart.id },
      });

      res.status(200).json({ status: 200, data: deleted });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { CartController };
