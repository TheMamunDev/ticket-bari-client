import useTitle from '@/hooks/useTitle';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from 'react-icons/fa';

const Contact = () => {
  useTitle('Contact Us');
  useEffect(() => {
    window.scrollTo(0, 0, 'smooth');
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const { name, email, subject, message } = data;
    const body = `Hi Mahmud,\n\n${message}\n\n--\nName: ${name}\nEmail: ${email}`;
    const mailtoLink = `mailto:mmhasan.mamun2022@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 max-w-11/12 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-base-content mb-4">
            Get in Touch
          </h2>
          <p className="text-lg opacity-60 max-w-2xl mx-auto">
            Have a question about a booking or want to partner with us? We'd
            love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="card bg-base-100 shadow-lg border-l-4 border-primary p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Our Office</h3>
                  <p className="opacity-70 text-sm">
                    Level 4, TicketBari Tower, <br /> Banani, Dhaka-1213
                  </p>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg border-l-4 border-secondary p-6">
              <div className="flex items-center gap-4">
                <div className="bg-secondary/10 p-3 rounded-full text-secondary text-xl">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="opacity-70 text-sm">+880 1712 345 678</p>
                  <p className="opacity-70 text-sm">+880 9612 345 678</p>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg border-l-4 border-accent p-6">
              <div className="flex items-center gap-4">
                <div className="bg-accent/10 p-3 rounded-full text-accent text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="opacity-70 text-sm">support@ticketbari.com</p>
                  <p className="opacity-70 text-sm">info@ticketbari.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label font-semibold">Name</label>
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label font-semibold">Email</label>
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label font-semibold">Subject</label>
                    <input
                      type="text"
                      {...register('subject')}
                      placeholder="What is this about?"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  <div className="form-control flex flex-col space-y-2">
                    <label className="label font-semibold">Message</label>
                    <textarea
                      {...register('message')}
                      className="textarea textarea-bordered h-32"
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn btn-primary text-white text-lg gap-2"
                    >
                      <FaPaperPlane /> Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-xl overflow-hidden shadow-lg border border-base-300 h-64 md:h-80 w-full relative bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500 font-bold flex items-center gap-2">
            <FaMapMarkerAlt /> Google Map Embed Would Go Here
          </p>

          <iframe
            src="https://www.google.com/maps/embed?..."
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
