// Footer.js
import React from 'react';
import { BsTelephone } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-20">
      <div className="container mx-auto px-6">
        {/* Top section of footer */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          {/* App Ser Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">App Ser</h3>
            <p className="text-gray-400 text-sm">
              Your go-to platform for seamless VTU top-ups, food orders, and professional services.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Our Services</h3>
            <ul>
              <li><a href="/vtu-top-ups" className="text-gray-400 hover:text-white text-sm">VTU Top-Ups (Data, Airtime)</a></li>
              <li><a href="/electricity-bills" className="text-gray-400 hover:text-white text-sm">Electricity Bills</a></li>
              <li><a href="/tv-subscription" className="text-gray-400 hover:text-white text-sm">TV Subscription</a></li>
              <li><a href="/food-ordering" className="text-gray-400 hover:text-white text-sm">Food Ordering</a></li>
              <li><a href="/professional-services" className="text-gray-400 hover:text-white text-sm">Professional Services</a></li>
            </ul>
          </div>

          {/* Contact & Social Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
            <ul>
              <li><a href="mailto:info@appser.com" className="text-gray-400 hover:text-white text-sm">info@appser.com</a></li>
              <li><a href="tel:+2349031530186" className="text-gray-400 hover:text-white text-sm flex items-center gap-3"><BsTelephone /> +234 903 153 0186</a></li>
            </ul>

            {/* Social Media Links */}
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                {/* Replace with social media icons, for example using react-icons */}
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section of footer */}
        <div className="border-t border-gray-600 mt-8 pt-4">
          <div className="text-center text-gray-400 text-sm">
            <p>© 2025 App Ser. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
