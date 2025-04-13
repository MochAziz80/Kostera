// src/pages/Reports.tsx
import React from 'react';
import { jsPDF } from 'jspdf';

const Reports = () => {
  // Data untuk laporan
  const reportData = [
    { date: '2025-04-01', room: 'Room 101', tenant: 'John Doe', amount: 500 },
    { date: '2025-04-02', room: 'Room 102', tenant: 'Jane Smith', amount: 450 },
    { date: '2025-04-03', room: 'Room 103', tenant: 'Chris Johnson', amount: 600 },
    { date: '2025-04-04', room: 'Room 104', tenant: 'Emily Davis', amount: 550 },
  ];

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    // Menambahkan judul laporan
    doc.text('Room Rental Report', 20, 10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 20);

    // Menambahkan header tabel
    doc.autoTable({
      startY: 30,
      head: [['Date', 'Room', 'Tenant', 'Amount']],
      body: reportData.map(item => [item.date, item.room, item.tenant, `$${item.amount}`]),
    });

    // Menghasilkan file PDF
    doc.save('report.pdf');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Room Rental Report</h1>

      {/* Tabel laporan */}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Room</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Tenant</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.date}</td>
              <td className="border border-gray-300 px-4 py-2">{item.room}</td>
              <td className="border border-gray-300 px-4 py-2">{item.tenant}</td>
              <td className="border border-gray-300 px-4 py-2">${item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tombol untuk ekspor PDF */}
      <div className="mt-6">
        <button
          onClick={generatePDF}
          className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded"
        >
          Export to PDF
        </button>
      </div>
    </div>
  );
};

export default Reports;
