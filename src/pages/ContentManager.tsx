import React from 'react';

const ContentManager: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Content Manager</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Products Management */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Products</h2>
              <p className="text-blue-700 mb-4">Manage your product catalog, add new items, and update existing ones.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Manage Products
              </button>
            </div>

            {/* Collections Management */}
            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4">Collections</h2>
              <p className="text-green-700 mb-4">Organize products into collections and manage their display order.</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Manage Collections
              </button>
            </div>

            {/* Content Pages */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-900 mb-4">Pages</h2>
              <p className="text-purple-700 mb-4">Edit about page, contact information, and other static content.</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Manage Pages
              </button>
            </div>

            {/* Media Management */}
            <div className="bg-orange-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-orange-900 mb-4">Media</h2>
              <p className="text-orange-700 mb-4">Upload and manage images, videos, and other media files.</p>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                Manage Media
              </button>
            </div>

            {/* SEO Settings */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-indigo-900 mb-4">SEO</h2>
              <p className="text-indigo-700 mb-4">Manage meta tags, titles, and search engine optimization settings.</p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                SEO Settings
              </button>
            </div>

            {/* Analytics */}
            <div className="bg-red-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-4">Analytics</h2>
              <p className="text-red-700 mb-4">View website analytics, visitor statistics, and performance metrics.</p>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                View Analytics
              </button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
            <div className="flex flex-wrap gap-2">
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                Add New Product
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                Upload Images
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                Update Content
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                Backup Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManager; 