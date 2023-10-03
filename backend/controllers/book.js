const { Book, CartBook } = require("../models");
class BookController {
  static async add(req, res, next) {
    try {
      const requiredFields = [
        "title",
        "author",
        "isbn",
        "coverUrl",
        "price",
        "stock",
      ];
      const unfilledFields = requiredFields.filter((field) => !req.body[field]);

      if (unfilledFields.length > 0) {
        throw {
          message: `You must fill the following fields: ${unfilledFields.join(
            ", "
          )}`,
          code: 400,
        };
      }

      const newBook = await Book.create(req.body);
      res.status(201).json({ status: 201, data: newBook });
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const books = await Book.findAll({ order: ["id"] });
      res.status(200).json({ status: 200, data: books });
    } catch (err) {
      next(err);
    }
  }
  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const book = await Book.findOne({ where: { id } });

      res.status(200).json({ status: 200, data: book });
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, author, isbn, coverUrl, price, stock } = req.body;

      const updatedBook = await Book.update(
        {
          title,
          author,
          isbn,
          coverUrl,
          price,
          stock,
        },
        { where: { id }, returning: true }
      );

      res.status(200).json({ status: 200, data: updatedBook });
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const deletedCartBooks = await CartBook.destroy({
        where: { BookId: id },
        returning: true,
      });

      const deletedBook = await Book.destroy({
        where: { id },
        returning: true,
      });

      res.status(200).json({ status: 200, data: deletedBook });
    } catch (err) {
      next(err);
    }
  }
  static async restock(req, res, next) {
    const { id } = req.params;
    const { stock } = req.body;

    const book = await Book.findOne({ where: { id } });

    const finalStock = Number(book.stock) + Number(stock);

    const updatedBook = await Book.update(
      {
        stock: finalStock,
      },
      { where: { id }, returning: true }
    );

    res.status(200).json({ status: 200, data: finalStock });
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { BookController };
