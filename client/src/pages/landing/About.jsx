import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-blue-50 py-16 px-6 md:px-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold text-blue-900 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 mb-12">
          At App Ser, we are committed to providing seamless services that make your life easier and more convenient.
        </p>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be the leading platform that simplifies utility payments, food ordering, and access to professional services for everyone.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Mission</h3>
            <p className="text-gray-700">
              We aim to provide our customers with fast, secure, and reliable services that meet their everyday needs. From VTU top-ups to food deliveries, we've got you covered.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Services</h3>
          <p className="text-lg text-gray-700 mb-8">
            We offer a wide range of services including:
          </p>

          <ul className="list-disc text-left text-gray-700 mx-auto max-w-3xl">
            <li>VTU Top-ups (Data, Airtime, Electricity Bills, TV Subscriptions)</li>
            <li>Food Ordering (Fresh meals delivered to your doorstep)</li>
            <li>Professional Services (Studio Sessions, Health Consultations, etc.)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
