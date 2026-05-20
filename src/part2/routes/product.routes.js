const express = require('express');

const {
  createProduct,
  getAllProducts,
  getProduct,
} = require('../controllers/product.controller');

const router = express.Router();

router.post('/products', createProduct);

router.get('/products', getAllProducts);

router.get('/products/:id', getProduct);

module.exports = router;