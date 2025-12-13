import React from 'react';
import jsPDF from 'jspdf';
import { FaDownload, FaTimes } from 'react-icons/fa';

const PaymentInvoice = ({ booking, onClose }) => {
  // ---------- SAFE TEXT HELPER ----------
  const safeText = value =>
    value !== undefined && value !== null ? String(value) : '';

  const handleDownloadPdf = () => {
    if (!booking) {
      alert('Booking data not available');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    let y = 20;

    // ---------- HEADER ----------
    pdf.setFontSize(22);
    pdf.setTextColor(37, 99, 235);
    pdf.text('TicketBari', 20, y);

    pdf.setFontSize(12);
    pdf.setTextColor(0);
    pdf.text('INVOICE', 190, y, { align: 'right' });

    y += 8;
    pdf.setFontSize(10);
    pdf.setTextColor(100);
    pdf.text('Dhaka, Bangladesh', 20, y);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, 190, y, {
      align: 'right',
    });

    // Divider
    y += 6;
    pdf.setDrawColor(220);
    pdf.line(20, y, 190, y);

    // ---------- BILL TO ----------
    y += 10;
    pdf.setFontSize(11);
    pdf.setTextColor(0);
    pdf.text('Billed To:', 20, y);

    y += 6;
    pdf.setFontSize(10);
    pdf.text(safeText(booking.userName), 20, y);
    y += 5;
    pdf.text(safeText(booking.userEmail), 20, y);

    // ---------- INVOICE INFO ----------
    pdf.text(
      safeText(`Invoice #: ${booking.transactionId || 'N/A'}`),
      120,
      y - 5
    );
    pdf.text(safeText(`Payment: ${booking.paymentMethod || 'Online'}`), 120, y);

    // ---------- JOURNEY ----------
    y += 12;
    pdf.setFontSize(11);
    pdf.text('Journey Details:', 20, y);

    y += 6;
    pdf.setFontSize(10);
    pdf.text(safeText(`Route: ${booking.from} → ${booking.to}`), 20, y);
    y += 5;
    pdf.text(
      safeText(
        `Departure: ${booking.departureDate} ${booking.departureTime || ''}`
      ),
      20,
      y
    );
    y += 5;
    pdf.text(safeText(`Bus: ${booking.ticketTitle}`), 20, y);

    // ---------- TABLE HEADER ----------
    y += 12;
    pdf.setFontSize(10);
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, y - 5, 170, 8, 'F');

    pdf.text('Description', 22, y);
    pdf.text('Qty', 110, y);
    pdf.text('Price', 135, y);
    pdf.text('Total', 165, y);

    // ---------- TABLE ROW ----------
    y += 10;
    pdf.setFillColor(255, 255, 255);
    pdf.rect(20, y - 5, 170, 10);

    pdf.text('Bus Ticket Fare', 22, y);
    pdf.text(safeText(booking.quantity), 110, y);
    pdf.text(safeText(`$${booking.unitPrice}`), 135, y);
    pdf.text(safeText(`$${booking.totalPrice}`), 165, y);

    // ---------- TOTAL ----------
    y += 14;
    pdf.setFontSize(11);
    pdf.text('Subtotal:', 130, y);
    pdf.text(safeText(`$${booking.totalPrice}`), 165, y);

    y += 6;
    pdf.text('Tax (5%):', 130, y);
    pdf.text(safeText(`$${(booking.totalPrice * 0.05).toFixed(2)}`), 165, y);

    y += 8;
    pdf.setFontSize(13);
    pdf.setTextColor(37, 99, 235);
    pdf.text('Total Paid:', 130, y);
    pdf.text(safeText(`$${(booking.totalPrice * 1.05).toFixed(2)}`), 165, y);

    y += 18;
    pdf.setFontSize(9);
    pdf.setTextColor(120);
    pdf.text(
      'This is a computer-generated invoice. No signature required.',
      105,
      y,
      { align: 'center' }
    );

    pdf.save(`TicketBari-Invoice-${booking.transactionId || 'invoice'}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Invoice Ready</h2>

        <div className="flex justify-between">
          <button onClick={handleDownloadPdf} className="btn btn-primary gap-2">
            <FaDownload /> Download PDF
          </button>

          <button onClick={onClose} className="btn btn-outline">
            <FaTimes /> Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentInvoice;
