import React, { createContext, useContext, useState, useEffect } from 'react';

export interface WebsiteSettings {
  // Brand Settings
  brandName: string;
  brandTagline: string;
  logo: string;

  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;

  // Typography
  headingFont: string;
  bodyFont: string;
  fontSize: string;

  // Layout
  maxWidth: string;
  padding: string;
  borderRadius: string;

  // Background
  backgroundImage: string;
  backgroundOverlay: string;

  // Contact Info
  whatsappNumber: string;
  instagramHandle: string;
  email: string;
  businessHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };

  // Content
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  aboutContent: string;
  contactMessage: string;

  // Features
  enableWhatsAppFloat: boolean;
  enableReviews: boolean;
  enableNewsletter: boolean;
  enableSocialLinks: boolean;
}

interface WebsiteContextType {
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  resetToDefaults: () => void;
}

const defaultSettings: WebsiteSettings = {
  // Brand Settings
  brandName: 'DRIK KALA',
  brandTagline: 'by Drishti',
  logo: '',

  // Colors - Luxury Gold & Black/Dark Blue Theme
  primaryColor: '#0f0f0f', // Deep Black
  secondaryColor: '#1a1a2e', // Dark Navy Blue
  accentColor: '#d4af37', // Rich Gold
  backgroundColor: '#0a0a0a', // Very Dark Background
  textColor: '#ffffff', // Pure White Text

  // Typography
  headingFont: 'Playfair Display',
  bodyFont: 'Inter',
  fontSize: '16px',

  // Layout
  maxWidth: '1280px',
  padding: '1rem',
  borderRadius: '0.75rem',

  // Background
  backgroundImage: '',
  backgroundOverlay: 'rgba(15, 15, 15, 0.8)',

  // Contact Info
  whatsappNumber: '+91 94799 88471',
  instagramHandle: '@drik_kala_',
  email: 'info@drikkala.com',
  businessHours: {
    monday: '10:00 AM - 7:00 PM',
    tuesday: '10:00 AM - 7:00 PM',
    wednesday: '10:00 AM - 7:00 PM',
    thursday: '10:00 AM - 7:00 PM',
    friday: '10:00 AM - 7:00 PM',
    saturday: '10:00 AM - 6:00 PM',
    sunday: '11:00 AM - 5:00 PM',
  },

  // Content
  homeHeroTitle: 'Discover Your Style',
  homeHeroSubtitle: 'Handcrafted fashion pieces that tell your story',
  aboutContent: 'Drik Kala brings you the finest handcrafted fashion pieces, carefully curated to reflect your unique style and personality.',
  contactMessage: 'We\'d love to hear from you! Whether you have questions about our products, need styling advice, or want to collaborate, we\'re here to help.',

  // Features
  enableWhatsAppFloat: true,
  enableReviews: true,
  enableNewsletter: false,
  enableSocialLinks: true,
};

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('drik-kala-website-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('drik-kala-website-settings', JSON.stringify(settings));

    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', settings.primaryColor);
    root.style.setProperty('--secondary-color', settings.secondaryColor);
    root.style.setProperty('--accent-color', settings.accentColor);
    root.style.setProperty('--background-color', settings.backgroundColor);
    root.style.setProperty('--text-color', settings.textColor);
    root.style.setProperty('--max-width', settings.maxWidth);
    root.style.setProperty('--padding', settings.padding);
    root.style.setProperty('--border-radius', settings.borderRadius);
    root.style.setProperty('--font-size', settings.fontSize);
  }, [settings]);

  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setSettings(defaultSettings);
  };

  return (
    <WebsiteContext.Provider value={{ settings, updateSettings, resetToDefaults }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
}; 