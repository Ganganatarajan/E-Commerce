import React, { useState, useEffect } from 'react';
import Api from '../utils/Api';
import { useParams, useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'electronics',
    brand: '',
    stock: 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await Api.get(`/products/${id}`);
          const { name, description, price, category, brand, stock } = res.data;
          setProduct({ name, description, price, category, brand, stock });
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in product) {
      formData.append(key, product[key]);
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (id) {
        await Api.put(`/products/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await Api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-2 border rounded" rows="4" required />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Price ($)</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" min="0" step="0.01" required />
          </div>
          <div>
            <label className="block mb-2">Stock Quantity</label>
            <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full p-2 border rounded" min="0" required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Category</label>
            <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Brand</label>
            <input type="text" name="brand" value={product.brand} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Image Upload</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>

        {imageFile && (
          <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-40 h-40 object-cover mb-4" />
        )}

        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
          {id ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
