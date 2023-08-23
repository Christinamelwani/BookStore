const { Category, CategoryBook, Book } = require("../models");

class CategoryController {
  static async add(req, res, next) {
    try {
      const { name, description } = req.body;

      const newCategory = await Category.create({
        name,
        description,
      });

      res.status(201).json({ status: 201, data: newCategory });
    } catch (err) {
      next(err);
    }
  }
  static async getAll(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json({ status: 200, data: categories });
    } catch (err) {
      next(err);
    }
  }
  static async getBooks(req, res, next) {
    try {
      const { id } = req.params;

      const categoryBooks = await CategoryBook.findAll({
        where: { CategoryId: id },
        include: Book,
      });

      const books = categoryBooks.map((categoryBook) => categoryBook.Book);

      res.status(200).json({ status: 200, data: books });
    } catch (err) {
      next(err);
    }
  }
  static async addBookToCategory(req, res, next) {
    try {
      const { categoryId, bookId } = req.params;

      const categoryBook = await CategoryBook.create({
        CategoryId: categoryId,
        BookId: bookId,
      });

      res.status(200).json({ status: 200, data: categoryBook });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = { CategoryController };
