// controllers/certificateController.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificate = (req, res) => {
  const { userId, score } = req.body;
  const doc = new PDFDocument();
  const fileName = `Certificate-${userId}.pdf`;
  const filePath = path.join(__dirname, '../certificates', fileName);

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
  doc.fontSize(20).text(`This certifies that ${userId} scored ${score} on the test.`, { align: 'center' });

  doc.end();

  doc.on('finish', () => {
    res.json({ certificateUrl: `http://localhost:5000/certificates/${fileName}` });
  });
};

module.exports = { generateCertificate };