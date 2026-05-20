const { v4: uuidv4 } = require('uuid');

const {
  createProduct,
  getProductBySku,
  getPaginatedProducts,
  getProductById,
  getProductMedia,
  getTotalProducts,
} = require('../store/product.store');

function validateUrls(urls = []) {
  for (const url of urls) {
    if (typeof url !== 'string') {
      return false;
    }

    if (url.length > 2048) {
      return false;
    }

    if (
      !url.startsWith('http://') &&
      !url.startsWith('https://')
    ) {
      return false;
    }
  }

  return true;
}

function createNewProduct(data) {
  const {
    name,
    sku,
    image_urls = [],
    video_urls = [],
  } = data;

  if (!name || !name.trim()) {
    return {
      error: 'Product name is required',
      status: 400,
    };
  }

  if (!sku || !sku.trim()) {
    return {
      error: 'SKU is required',
      status: 400,
    };
  }

  if (getProductBySku(sku)) {
    return {
      error: 'SKU already exists',
      status: 409,
    };
  }

  if (!Array.isArray(image_urls)) {
    return {
      error: 'image_urls must be an array',
      status: 400,
    };
  }

  if (!Array.isArray(video_urls)) {
    return {
      error: 'video_urls must be an array',
      status: 400,
    };
  }

  if (image_urls.length > 20) {
    return {
      error: 'Maximum 20 image URLs allowed',
      status: 400,
    };
  }

  if (video_urls.length > 20) {
    return {
      error: 'Maximum 20 video URLs allowed',
      status: 400,
    };
  }

  if (
    !validateUrls(image_urls) ||
    !validateUrls(video_urls)
  ) {
    return {
      error: 'Invalid URLs provided',
      status: 400,
    };
  }

  const id = uuidv4();

  const product = {
    id,
    name: name.trim(),
    sku: sku.trim(),
    image_count: image_urls.length,
    video_count: video_urls.length,
    thumbnail_url: image_urls[0] || null,
    created_at: new Date().toISOString(),
  };

  const media = {
    image_urls,
    video_urls,
  };

  createProduct(product, media);

  return {
    status: 201,
    data: {
      ...product,
      ...media,
    },
  };
}

function getProducts(limit = 20, offset = 0) {
  const parsedLimit = Math.min(Number(limit) || 20, 100);

  const parsedOffset = Number(offset) || 0;

  return {
    total: getTotalProducts(),
    limit: parsedLimit,
    offset: parsedOffset,
    products: getPaginatedProducts(
      parsedOffset,
      parsedLimit
    ),
  };
}

function getSingleProduct(id) {
  const product = getProductById(id);

  if (!product) {
    return null;
  }

  const media = getProductMedia(id);

  return {
    ...product,
    ...media,
  };
}

module.exports = {
  createNewProduct,
  getProducts,
  getSingleProduct,
};