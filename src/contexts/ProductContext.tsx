import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  reviews: Review[];
  featured: boolean;
  stock: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'New' | 'Seen';
}

interface ProductContextType {
  products: Product[];
  inquiries: Inquiry[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: 'New' | 'Seen') => void;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
  getProduct: (id: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Floral Kurti',
    price: 2499,
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679721/pexels-photo-7679721.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Kurtis & Dresses',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy Blue', 'Coral Pink', 'Mint Green'],
    description: 'Beautiful handcrafted kurti with intricate floral embroidery, perfect for both casual and festive occasions.',
    reviews: [
      { id: '1', name: 'Priya Sharma', rating: 5, comment: 'Absolutely love this kurti! The quality is amazing and fits perfectly.', date: '2024-01-15' },
      { id: '2', name: 'Anjali Singh', rating: 4, comment: 'Beautiful design and comfortable fabric. Great purchase!', date: '2024-01-10' }
    ],
    featured: true,
    stock: 15
  },
  {
    id: '2',
    name: 'Contemporary Co-ord Set',
    price: 3299,
    images: [
      'https://images.pexels.com/photos/7679722/pexels-photo-7679722.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679723/pexels-photo-7679723.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Co-ord Sets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Burgundy', 'Emerald Green'],
    description: 'Modern co-ord set with contemporary prints, perfect for office wear and casual outings.',
    reviews: [
      { id: '3', name: 'Sneha Patel', rating: 5, comment: 'Perfect fit and amazing quality! Highly recommended.', date: '2024-01-12' }
    ],
    featured: true,
    stock: 8
  },
  {
    id: '3',
    name: 'Festive Silk Dress',
    price: 4999,
    images: [
      'https://images.pexels.com/photos/7679724/pexels-photo-7679724.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Festive Wear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Royal Blue', 'Golden Yellow', 'Deep Red'],
    description: 'Luxurious silk dress with gold thread work, ideal for weddings and special occasions.',
    reviews: [],
    featured: false,
    stock: 5
  },
  {
    id: '4',
    name: 'Handcrafted Bohemian Top',
    price: 1899,
    images: [
      'https://images.pexels.com/photos/7679725/pexels-photo-7679725.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Handcrafted Pieces',
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Terracotta', 'Olive Green'],
    description: 'Unique handcrafted bohemian top with traditional block prints and modern silhouette.',
    reviews: [
      { id: '4', name: 'Kavya Reddy', rating: 4, comment: 'Unique design and good quality. Love the handcrafted details.', date: '2024-01-08' }
    ],
    featured: true,
    stock: 12
  }
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('drik-kala-products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('drik-kala-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductsByCategory,
      getFeaturedProducts,
      getProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};