import React, { useState, useEffect, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Save, X, Eye, Star, Mail, Calendar, Filter, Settings, FileText, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';
import { useProducts, Product } from '../contexts/ProductContext';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'New' | 'Seen';
}

const AdminDashboard: React.FC = () => {
  const { logout } = useAdmin();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'inquiries'>('products');
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'seen'>('all');
  const [dateFilter, setDateFilter] = useState('');
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    price: 0,
    images: [''],
    category: 'Kurtis & Dresses',
    sizes: [],
    colors: [],
    description: '',
    featured: false,
    stock: 0
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>(['']);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['Kurtis & Dresses', 'Co-ord Sets', 'Festive Wear', 'Handcrafted Pieces'];

  // Load inquiries from localStorage
  useEffect(() => {
    const savedInquiries = JSON.parse(localStorage.getItem('drik-kala-inquiries') || '[]');
    setInquiries(savedInquiries);
  }, []);

  const handleLogout = () => {
    logout();
    return <Navigate to="/admin/login" replace />;
  };

  // Image upload functionality
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        uploadedUrls.push(result);
        
        if (uploadedUrls.length === files.length) {
          setUploadedImages(prev => [...prev, ...uploadedUrls]);
          setFormData(prev => ({
            ...prev,
            images: [...(prev.images || []), ...uploadedUrls]
          }));
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setUploadedImages(prev => [...prev, '']);
  };

  const updateImageUrl = (index: number, url: string) => {
    const newImages = [...uploadedImages];
    newImages[index] = url;
    setUploadedImages(newImages);
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData as Omit<Product, 'id'>);
      setShowAddForm(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      images: [''],
      category: 'Kurtis & Dresses',
      sizes: [],
      colors: [],
      description: '',
      featured: false,
      stock: 0
    });
    setUploadedImages(['']);
  };

  const startEdit = (product: Product) => {
    setFormData(product);
    setUploadedImages(product.images);
    setEditingProduct(product.id);
    setShowAddForm(false);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setShowAddForm(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateArrayField = (field: 'sizes' | 'colors', value: string) => {
    const values = value.split(',').map(v => v.trim()).filter(v => v);
    updateFormData(field, values);
  };

  const markInquiryAsSeen = (inquiryId: string) => {
    const updatedInquiries = inquiries.map(inquiry => 
      inquiry.id === inquiryId ? { ...inquiry, status: 'Seen' as const } : inquiry
    );
    setInquiries(updatedInquiries);
    localStorage.setItem('drik-kala-inquiries', JSON.stringify(updatedInquiries));
  };

  const deleteInquiry = (inquiryId: string) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      const updatedInquiries = inquiries.filter(inquiry => inquiry.id !== inquiryId);
      setInquiries(updatedInquiries);
      localStorage.setItem('drik-kala-inquiries', JSON.stringify(updatedInquiries));
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesStatus = inquiryFilter === 'all' || inquiry.status.toLowerCase() === inquiryFilter;
    const matchesDate = !dateFilter || inquiry.timestamp.startsWith(dateFilter);
    return matchesStatus && matchesDate;
  });

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Website
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Drik Kala Admin</h1>
                <p className="text-sm text-gray-600">Manage your fashion brand</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin/content"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FileText className="h-5 w-5 mr-2" />
                Content Manager
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Settings className="h-5 w-5 mr-2" />
                Website Settings
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Featured Products</h3>
            <p className="text-3xl font-bold text-blue-600">
              {products.filter(p => p.featured).length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Reviews</h3>
            <p className="text-3xl font-bold text-green-600">
              {products.reduce((acc, p) => acc + p.reviews.length, 0)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">New Inquiries</h3>
            <p className="text-3xl font-bold text-orange-600">
              {inquiries.filter(i => i.status === 'New').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products Management
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews Management
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inquiries'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inquiries Management
            </button>
          </nav>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>

            {/* Add/Edit Product Form */}
            {(showAddForm || editingProduct) && (
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.price || ''}
                        onChange={(e) => updateFormData('price', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category || ''}
                        onChange={(e) => updateFormData('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={formData.stock || ''}
                        onChange={(e) => updateFormData('stock', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                    </div>
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>
                    
                    {/* Upload Button */}
                    <div className="mb-4">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        multiple
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload Images'}
                      </button>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload multiple images (JPG, PNG, GIF)
                      </p>
                    </div>

                    {/* Image Preview Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          {image ? (
                            <>
                              <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border border-gray-300"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </>
                          ) : (
                            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Manual URL Input */}
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Or add image URLs manually:</p>
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <input
                            type="url"
                            value={image}
                            onChange={(e) => updateImageUrl(index, e.target.value)}
                            placeholder="Image URL"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                          />
                          {uploadedImages.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addImageField}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                      >
                        + Add Image URL
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sizes (comma separated)
                      </label>
                      <input
                        type="text"
                        value={(formData.sizes || []).join(', ')}
                        onChange={(e) => updateArrayField('sizes', e.target.value)}
                        placeholder="S, M, L, XL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Colors (comma separated)
                      </label>
                      <input
                        type="text"
                        value={(formData.colors || []).join(', ')}
                        onChange={(e) => updateArrayField('colors', e.target.value)}
                        placeholder="Red, Blue, Green"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => updateFormData('featured', e.target.checked)}
                      className="h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Featured Product
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingProduct ? 'Update' : 'Add'} Product
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm ${
                            product.stock === 0 ? 'text-red-600' : 
                            product.stock < 5 ? 'text-orange-600' : 'text-green-600'
                          }`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                            product.featured
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {product.featured ? 'Featured' : 'Regular'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEdit(product)}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {products.map(product => 
                  product.reviews.map(review => (
                    <div key={`${product.id}-${review.id}`} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-900 mr-4">
                              {review.name}
                            </h4>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm text-gray-500">
                            Product: <span className="font-medium">{product.name}</span>
                          </p>
                        </div>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-16 w-16 rounded-lg object-cover ml-4"
                        />
                      </div>
                    </div>
                  ))
                )}
                {products.every(p => p.reviews.length === 0) && (
                  <div className="p-6 text-center text-gray-500">
                    No reviews yet. Reviews will appear here once customers start reviewing products.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Customer Inquiries</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={inquiryFilter}
                    onChange={(e) => setInquiryFilter(e.target.value as 'all' | 'new' | 'seen')}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="all">All Inquiries</option>
                    <option value="new">New Only</option>
                    <option value="seen">Seen Only</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              {filteredInquiries.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <h3 className="text-lg font-semibold text-gray-900">{inquiry.name}</h3>
                              <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${
                                inquiry.status === 'New' 
                                  ? 'bg-orange-100 text-orange-800' 
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {inquiry.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500">{formatDate(inquiry.timestamp)}</span>
                              {inquiry.status === 'New' && (
                                <button
                                  onClick={() => markInquiryAsSeen(inquiry.id)}
                                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                >
                                  Mark as Seen
                                </button>
                              )}
                              <button
                                onClick={() => deleteInquiry(inquiry.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Email</label>
                              <p className="text-gray-900">{inquiry.email}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Subject</label>
                              <p className="text-gray-900">{inquiry.subject}</p>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-gray-500">Message</label>
                            <p className="text-gray-900 mt-1 whitespace-pre-wrap">{inquiry.message}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <Mail className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No inquiries found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;