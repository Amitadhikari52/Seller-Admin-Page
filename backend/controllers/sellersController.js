const db = require('../config/db');

// Sample data for products (replace this with actual data fetched from the database)
let productsData = [];

exports.getAllSellers = (req, res) => {
  res.status(200).json(productsData);
};

exports.addProduct = (req, res) => {
  const { productName, sellingPrice } = req.body;
  const query = 'INSERT INTO sellers (product_name, selling_price) VALUES (?, ?)';
  db.query(query, [productName, sellingPrice], (err, result) => {
    if (err) {
      console.error('Error adding product: ', err);
      res.status(500).json({ error: 'Failed to add product' });
    } else {
      const newProduct = {
        id: result.insertId,
        name: productName,
        sellingPrice: Number(sellingPrice),
      };
      productsData.push(newProduct);
      res.status(201).json(newProduct);
    }
  });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM sellers WHERE id = ?';
  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product: ', err);
      res.status(500).json({ error: 'Failed to delete product' });
    } else {
      productsData = productsData.filter((product) => product.id !== parseInt(productId));
      res.status(200).json({ message: 'Product deleted successfully' });
    }
  });
};
