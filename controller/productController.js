import * as productService from '../services/productService.js';


export const getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = '',
      category = '',
      minPrice = 0,
      maxPrice = 999999,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filters = {
      search,
      category,
      minPrice: +minPrice,
      maxPrice: +maxPrice
    };
    
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    const pagination = {
      skip: (+page - 1) * +limit,
      limit: +limit
    };

    const { products, total } = await productService.getAllProducts(
      filters,
      sort,
      pagination
    );

    res.json({
      products,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: +page
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const create = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const update = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};