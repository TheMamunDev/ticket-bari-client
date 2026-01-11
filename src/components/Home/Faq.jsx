import React from 'react';
import { Link } from 'react-router';

const faqs = [
  {
    question: 'Do I need to print my ticket?',
    answer:
      "Not necessarily. In most cases, showing the SMS or email confirmation on your mobile phone is sufficient. However, for some specific operators, a printed copy might be required. Please check the operator's policy mentioned on your ticket.",
  },
  {
    question: 'How can I cancel my ticket and get a refund?',
    answer:
      "You can cancel your ticket directly from your 'My Tickets' dashboard. Refunds are processed automatically to your original payment method within 3-5 business days, subject to the bus operator's cancellation policy.",
  },
  {
    question: 'Is it safe to pay online on TicketBari?',
    answer:
      'Absolutely. We use SSL encryption and trusted payment gateways (like bKash, Nagad, and SSLCommerz) to ensure your financial information is 100% secure. We do not store your card details.',
  },
  {
    question: 'What happens if the bus is delayed or cancelled?',
    answer:
      'If a bus is cancelled by the operator, you will receive a full refund. For significant delays, we will notify you via SMS. You can also track your bus location in real-time through our app for supported operators.',
  },
  {
    question: 'Can I change my seat after booking?',
    answer:
      'Unfortunately, seat changes are not allowed after payment. You would need to cancel the current ticket (if the time limit permits) and book a new seat.',
  },
];

const FaqSection = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Have questions? We have answers. If you don't see your question
            here, feel free to contact our support.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-200 border border-base-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <input
                type="radio"
                name="my-accordion-3"
                defaultChecked={index === 0}
              />

              <div className="collapse-title text-lg font-semibold text-base-content py-4 pl-6">
                {faq.question}
              </div>

              <div className="collapse-content text-base-content pl-6 pr-8 pb-4 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-2">
            Still need help?
          </h3>
          <p className="text-indigo-700 mb-6 text-sm md:text-base">
            Can't find the answer you're looking for? Please chat to our
            friendly team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to={'/contact'} className="btn btn-primary px-8">
              Contact With Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
