const {
  createNewProduct,
  getProducts,
  getSingleProduct,
  addProductMedia,
} = require('../services/product.service');

function createProduct(req, res) {
  const result = createNewProduct(req.body);

  if (result.error) {
    return res.status(result.status).json({
      error: result.error,
    });
  }

  return res.status(result.status).json(result.data);
}

function getAllProducts(req, res) {
  const { limit, offset } = req.query;

  const result = getProducts(limit, offset);

  return res.status(200).json(result);
}

function getProduct(req, res) {
  const { id } = req.params;

  const product = getSingleProduct(id);

  if (!product) {
    return res.status(404).json({
      error: 'Product not found',
    });
  }

  return res.status(200).json(product);
}

function appendMedia(req, res) {
  const { id } = req.params;

  const result = addProductMedia(id, req.body);

  if (result.error) {
    return res.status(result.status).json({
      error: result.error,
    });
  }

  return res.status(result.status).json(result.data);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  appendMedia,
};