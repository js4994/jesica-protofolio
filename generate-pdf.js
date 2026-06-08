const fs = require('fs');
const PDFDocument = require('pdfkit');

const resumeTxtPath = 'resume.txt';
const outPath = 'resume.pdf';

const text = fs.existsSync(resumeTxtPath) ? fs.readFileSync(resumeTxtPath, 'utf8') : 'Jesica Singh - Resume';

const doc = new PDFDocument({ autoFirstPage: true });
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

doc.fontSize(20).text('Jesica Singh', { align: 'left' });
doc.moveDown(0.5);
doc.fontSize(12).text(text, { align: 'left' });

doc.end();

stream.on('finish', () => {
  console.log('Generated', outPath);
});
