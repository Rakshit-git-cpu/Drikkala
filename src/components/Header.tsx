import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, MessageCircle, LogIn } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 header-premium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-gradient-premium luxury-text-shadow">
              DRIK KALA
              <div className="text-xs text-accent-color/80 -mt-1">by Drishti</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium nav-link-premium transition-premium ${
                  isActive(item.href)
                    ? 'text-accent-color border-b-2 border-accent-color'
                    : 'text-white/80 hover:text-accent-color'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social Links and Login */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.instagram.com/drik_kala_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-pink-400 transition-premium p-2 rounded-full hover:bg-pink-400/10"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/919479988471"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-green-400 transition-premium p-2 rounded-full hover:bg-green-400/10"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Link
              to="/admin/login"
              className="flex items-center text-white/80 hover:text-accent-color transition-premium p-2 rounded-full hover:bg-accent-color/10"
            >
              <LogIn className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/80 hover:text-accent-color transition-premium p-2 rounded-full hover:bg-accent-color/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 backdrop-blur-sm border-t border-accent-color/20">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium transition-premium rounded-md ${
                  isActive(item.href)
                    ? 'text-accent-color bg-accent-color/10'
                    : 'text-white/80 hover:text-accent-color hover:bg-accent-color/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4 px-3 py-2">
              <a
                href="https://www.instagram.com/drik_kala_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-pink-400 transition-premium p-2 rounded-full hover:bg-pink-400/10"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/919479988471"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-green-400 transition-premium p-2 rounded-full hover:bg-green-400/10"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <Link
                to="/admin/login"
                className="flex items-center text-white/80 hover:text-accent-color transition-premium p-2 rounded-full hover:bg-accent-color/10"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;