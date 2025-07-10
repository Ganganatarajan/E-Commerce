import Product from '../models/Product.js';

export const getAllProducts = async (filters, sort, pagination) => {
  const { search, category, minPrice, maxPrice } = filters;
  const filter = { isActive: true };

  if (search) {
    filter.$text = { $search: search };
  }
  if (category) {
    filter.category = category;
  }
  filter.price = { 
    $gte: minPrice || 0, 
    $lte: maxPrice || 999999 
  };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sort)
    .skip(pagination.skip)
    .limit(pagination.limit);

  return { products, total };
};

export const getProductById = async (id) => {
  return await Product.findById(id);
};

export const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { 
    new: true, 
    runValidators: true 
  });
};

export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};