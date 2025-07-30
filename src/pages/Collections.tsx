import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';

const Collections: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Kurtis & Dresses', 'Co-ord Sets', 'Festive Wear', 'Handcrafted Pieces'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleWhatsAppOrder = (product: any) => {
    const message = `Hi! I'm interested in ordering "${product.name}" (₹${product.price}). Could you please provide more details about availability and sizes?`;
    const whatsappUrl = `https://wa.me/919479988471?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Collections</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our carefully curated collection of beautiful, contemporary pieces that celebrate traditional craftsmanship with modern aesthetics.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <Link to={`/product/${product.id}`}>
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.stock < 5 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    Low Stock
                  </span>
                )}
              </div>
            </Link>
            
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-gray-700">{product.name}</h3>
              </Link>
              <p className="text-gray-600 text-sm mb-2">{product.category}</p>
              <p className="text-lg font-bold text-gray-900 mb-3">₹{product.price}</p>
              
              {/* Size and Color Options Preview */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {product.sizes.slice(0, 4).map((size) => (
                    <span key={size} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {size}
                    </span>
                  ))}
                  {product.sizes.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      +{product.sizes.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {product.colors.slice(0, 3).map((color) => (
                    <span key={color} className="px-2 py-1 bg-gray-100 text-xs rounded">
                      {color}
                    </span>
                  ))}
                  {product.colors.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded">
                      +{product.colors.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              
              <button
                onClick={() => handleWhatsAppOrder(product)}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Order via WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Collections;