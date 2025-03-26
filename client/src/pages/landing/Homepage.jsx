import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-900 h-[100vh] text-white py-20 px-6 md:px-12 relative bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div> {/* Dark overlay for text contrast */}
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl uppercase md:text-[120px] font-bold leading-tight mb-6">
            App Ser
          </h1>
          <p className="text-xl mb-8">
            Top-up data, airtime, electricity bills, TV subscriptions, order food, and book professional services with ease!
          </p>
          <Link to="/sign-up">
          <button
            className="inline-block bg-white text-blue-900 px-8 py-3 text-xl rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </button>
          </Link>
          
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Our Services</h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-12">
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">VTU Top-Ups</h3>
              <p className="text-gray-700">
                Easily recharge your data, airtime, and pay for TV subscriptions with App Ser's seamless platform.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Food Ordering</h3>
              <p className="text-gray-700">
                Order food from your favorite local restaurants, right from the app. Fresh meals at your doorsteps!
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Professional Services</h3>
              <p className="text-gray-700">
                Book studio sessions, health consultations, and more with just a few clicks. Get access to expert services!
              </p>
            </div>
          </div>

          <Link to="/app-ser-store">
          <button
            className="inline-block mt-8 bg-white text-blue-900 px-8 py-3 text-xl rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            View App Ser Store
          </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Why Choose App Ser?</h2>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-12">
            <div className="flex flex-col items-center text-center">
              <FaRegCheckCircle className="text-4xl text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Fast and Reliable</h3>
              <p className="text-gray-700">
                We ensure fast transactions, whether it’s recharging your phone or ordering food. Time is money!
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaRegCheckCircle className="text-4xl text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Secure and Trusted</h3>
              <p className="text-gray-700">
                Your transactions and personal data are protected with the highest security standards.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaRegCheckCircle className="text-4xl text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-4">Affordable Prices</h3>
              <p className="text-gray-700">
                Enjoy the best prices for all our services, with no hidden fees. Get more value for your money.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaRegCheckCircle className="text-4xl text-blue-900 mb-4" />
              <h3 className="text-xl font-semibold text-blue-900 mb-4">24/7 Support</h3>
              <p className="text-gray-700">
                Our customer support team is always available to help you with any questions or issues you may have.
              </p>
            </div>
          </div>
          <Link to="/app-ser-store">
          <button
            className="inline-block mt-8 bg-white text-blue-900 px-8 py-3 text-xl rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            View App Ser Store
          </button>
          </Link>
        </div>
      </section>

      <section className="bg-blue-900 h-[100vh] text-white py-20 px-6 md:px-12 relative bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="absolute inset-0 bg-blue-900 opacity-50 flex items-center justify-center">
      
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Sign up today and enjoy the convenience of managing all your top-up, food, and service needs in one place.
          </p>
          <a
            href="/sign-up"
            className="inline-block bg-white text-blue-900 px-8 py-3 text-xl rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
