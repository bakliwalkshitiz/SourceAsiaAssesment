const express = require('express');

const {
  createProduct,
  getAllProducts,
  getProduct,
  appendMedia,
} = require('../controllers/product.controller');

const router = express.Router();

router.post('/products', createProduct);

router.get('/products', getAllProducts);

router.get('/products/:id', getProduct);

router.post('/products/:id/media', appendMedia);

module.exports = router;