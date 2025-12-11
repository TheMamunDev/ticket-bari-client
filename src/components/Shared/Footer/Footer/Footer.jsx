import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaBus,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { FaCcStripe, FaCcVisa, FaCcMastercard } from 'react-icons/fa6'; // specific payment icons

const Footer = () => {
  return (
    <div className="bg-neutral text-neutral-content">
      <footer className="footer max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <aside>
          <div className="flex items-center gap-2 text-3xl font-bold text-primary mb-2">
            <FaBus className="text-white" />
            <span className="text-white">TicketBari</span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed">
            Book bus, train, launch & flight tickets easily. Your trusted
            partner for safe, secure, and comfortable journeys across the
            country.
          </p>
        </aside>

        <nav>
          <h6 className="footer-title text-white opacity-100">Quick Links</h6>
          <Link
            to="/"
            className="link link-hover hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/all-tickets"
            className="link link-hover hover:text-primary transition-colors"
          >
            All Tickets
          </Link>
          <Link
            to="/contact"
            className="link link-hover hover:text-primary transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="link link-hover hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title text-white opacity-100">Contact Info</h6>
          <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
            <FaEnvelope className="text-lg" />
            <span>support@ticketbari.com</span>
          </div>
          <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
            <FaPhone className="text-lg" />
            <span>+880 1234 567 890</span>
          </div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors"
          >
            <FaFacebook className="text-lg" />
            <span>Facebook Page</span>
          </a>
          <div className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-lg mt-1" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title text-white opacity-100">We Accept</h6>
          <div className="flex gap-4 text-4xl text-gray-400">
            <FaCcStripe
              className="hover:text-white transition-colors cursor-pointer"
              title="Stripe"
            />
            <FaCcVisa
              className="hover:text-white transition-colors cursor-pointer"
              title="Visa"
            />
            <FaCcMastercard
              className="hover:text-white transition-colors cursor-pointer"
              title="Mastercard"
            />
          </div>
          <p className="text-xs mt-2 text-gray-500">Secured by Stripe</p>
        </nav>
      </footer>
      <div className="footer footer-center p-4 bg-neutral-900 text-neutral-content border-t border-gray-700">
        <aside>
          <p className="text-sm">
            © {new Date().getFullYear()}{' '}
            <span className="font-bold text-primary">TicketBari</span>. All
            rights reserved.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
