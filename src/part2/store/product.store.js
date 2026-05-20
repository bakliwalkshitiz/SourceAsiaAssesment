const products = new Map();

const productMedia = new Map();

const skuIndex = new Map();

const productIds = [];

function createProduct(product, media) {
  products.set(product.id, product);

  productMedia.set(product.id, media);

  skuIndex.set(product.sku, product.id);

  productIds.push(product.id);
}

function getProductById(id) {
  return products.get(id);
}

function getProductMedia(id) {
  return (
    productMedia.get(id) || {
      image_urls: [],
      video_urls: [],
    }
  );
}

function getProductBySku(sku) {
  const id = skuIndex.get(sku);

  if (!id) {
    return null;
  }

  return products.get(id);
}

function getPaginatedProducts(offset, limit) {
  const ids = productIds.slice(offset, offset + limit);

  return ids.map((id) => products.get(id));
}

function getTotalProducts() {
  return productIds.length;
}

module.exports = {
  createProduct,
  getProductById,
  getProductMedia,
  getProductBySku,
  getPaginatedProducts,
  getTotalProducts,
};