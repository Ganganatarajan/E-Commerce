import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
    });
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.numReviews})
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary-600">
            ${product.price}
          </span>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700 text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>
        </div>
        
        {product.stock > 0 && product.stock < 10 && (
          <p className="text-sm text-orange-600 mt-2">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;