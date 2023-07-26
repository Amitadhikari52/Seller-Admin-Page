const express = require('express');
const router = express.Router();
const sellersController = require('../controllers/sellersController');

router.get('/', sellersController.getAllSellers);
router.post('/product', sellersController.addProduct);
router.delete('/product/:id', sellersController.deleteProduct);

module.exports = router;
