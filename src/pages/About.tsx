import React from 'react';
import { Heart, Award, Users, Sparkles } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Passion for Craft",
      description: "Every piece is created with love and dedication, celebrating the beauty of traditional craftsmanship."
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Quality Excellence",
      description: "We maintain the highest standards in fabric selection, design, and construction for lasting beauty."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: "Customer First",
      description: "Your satisfaction is our priority. We're always here to help you find the perfect piece."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: "Artistic Vision",
      description: "Blending traditional aesthetics with contemporary design to create timeless fashion statements."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Drik Kala</h1>
          <p className="text-xl text-gray-600 mb-8">by Drishti – Artwork with Visual Aesthetics</p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to Drik Kala, where traditional craftsmanship meets contemporary design. 
            Founded by Drishti, our brand is a celebration of visual aesthetics and artistic expression 
            through beautifully designed female clothing.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Drik Kala was born from a passion for creating clothing that tells a story. 
                Founded by Drishti, a visionary designer with a deep appreciation for traditional 
                Indian craftsmanship, our brand represents the perfect fusion of heritage and modernity.
              </p>
              <p>
                The name "Drik Kala" translates to "visual art," reflecting our core philosophy 
                of treating each garment as a canvas for artistic expression. We believe that 
                fashion should not just be worn, but experienced and cherished.
              </p>
              <p>
                Every piece in our collection is thoughtfully designed to celebrate the feminine 
                spirit while honoring the rich textile traditions of India. From intricate 
                embroideries to contemporary silhouettes, we create clothing that empowers 
                women to express their unique style.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Traditional craftsmanship"
              className="rounded-lg shadow-md"
            />
            <img
              src="https://images.pexels.com/photos/7679722/pexels-photo-7679722.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Contemporary design"
              className="rounded-lg shadow-md mt-8"
            />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            To create a world where traditional artistry and contemporary fashion coexist beautifully, 
            empowering women to embrace their cultural heritage while expressing their modern identity.
          </p>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <blockquote className="text-xl text-gray-800 italic">
              "Fashion is not just about clothing; it's about storytelling, cultural preservation, 
              and empowering women to feel confident and beautiful in their own skin."
            </blockquote>
            <p className="text-gray-600 mt-4">— Drishti, Founder of Drik Kala</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do at Drik Kala, from design conception to customer service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Sustainable Fashion</h3>
              <p className="text-gray-300">
                We are committed to sustainable practices, supporting local artisans 
                and using eco-friendly materials wherever possible.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Artisan Support</h3>
              <p className="text-gray-300">
                We work directly with skilled craftspeople, ensuring fair wages 
                and helping preserve traditional techniques.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Customer Satisfaction</h3>
              <p className="text-gray-300">
                Your happiness is our success. We provide personalized service 
                and ensure every piece meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;