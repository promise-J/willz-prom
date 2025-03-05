import React, { useState } from 'react';
import ApiSetup from '../../utils/ApiSetup';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const api = ApiSetup()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
        email: formData.email,
        subject: formData.name,
        message: formData.message,
    }
    const res = await api.post('utils/send-email', payload)
    if(res?.data?.success){
        setFormData({name: '', email: '', message: ''})
        toast.success(res?.data?.data, {position: 'top-right'})
    }else{
        toast.error("Email failed to send. Please try again later")
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-16 px-6 md:px-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold text-blue-900 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-12">
          We'd love to hear from you! Please fill out the form below to get in touch.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-blue-900 text-lg font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-900 text-lg font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-blue-900 text-lg font-semibold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
