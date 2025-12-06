import React from 'react';
import { FaEnvelope, FaTicketAlt } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-primary rounded-3xl overflow-hidden shadow-2xl">
          {/* Decorative Circles Background */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8 text-center md:text-left">
            {/* Text Content */}
            <div className="md:w-1/2 text-primary-content">
              <div className="badge badge-accent badge-lg border-none text-white font-bold mb-4 gap-2">
                <FaTicketAlt /> Limited Offer
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Get 20% Off Your First Trip!
              </h2>
              <p className="text-lg opacity-90 max-w-md mx-auto md:mx-0">
                Join our subscription list and get an exclusive coupon code sent
                directly to your inbox. No spam, just travel deals.
              </p>
            </div>

            {/* Form Section */}
            <div className="w-full md:w-5/12">
              <form className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body p-6">
                  <h3 className="text-xl font-bold text-base-content mb-4 flex items-center gap-2">
                    <FaEnvelope className="text-primary" />
                    Subscribe Now
                  </h3>
                  <div className="join w-full">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="input input-bordered join-item w-full focus:outline-none"
                    />
                    <button className="btn btn-primary join-item text-white">
                      Get Code
                    </button>
                  </div>
                  <p className="text-xs text-base-content/50 mt-3 text-center">
                    By subscribing, you agree to our Terms & Conditions.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
