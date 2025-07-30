import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './contexts/ProductContext';
import { AdminProvider } from './contexts/AdminContext';
import { WebsiteProvider } from './contexts/WebsiteContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import WebsiteSettings from './pages/WebsiteSettings';
import ContentManager from './pages/ContentManager';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <WebsiteProvider>
      <AdminProvider>
        <ProductProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <Routes>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute>
                    <WebsiteSettings />
                  </ProtectedRoute>
                } />
                <Route path="/admin/content" element={
                  <ProtectedRoute>
                    <ContentManager />
                  </ProtectedRoute>
                } />
                <Route path="/*" element={
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </Layout>
                } />
              </Routes>
            </div>
          </Router>
        </ProductProvider>
      </AdminProvider>
    </WebsiteProvider>
  );
}

export default App;