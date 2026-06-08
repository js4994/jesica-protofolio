const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8001;
const PUBLIC_DIR = path.join(__dirname);
const RESUME_PATH = path.join(PUBLIC_DIR, 'resume.pdf');

const server = http.createServer((req, res) => {
  if (req.url === '/download/resume') {
    fs.stat(RESUME_PATH, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Resume not found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stats.size,
        'Content-Disposition': 'attachment; filename="Jesica_Singh_Resume.pdf"'
      });

      const stream = fs.createReadStream(RESUME_PATH);
      stream.pipe(res);
      stream.on('error', () => res.end());
    });
    return;
  }

  if (req.url === '/resume.pdf') {
    fs.stat(RESUME_PATH, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Resume not found');
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stats.size
      });

      const stream = fs.createReadStream(RESUME_PATH);
      stream.pipe(res);
      stream.on('error', () => res.end());
    });
    return;
  }

  // Optional: simple health page
  if (req.url === '/' || req.url === '/index.html') {
    const indexPath = path.join(PUBLIC_DIR, 'index.html');
    fs.readFile(indexPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading index');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // Fallback 404
  // Try to serve static files from PUBLIC_DIR
  const safePath = path.normalize(decodeURIComponent(req.url)).replace(/^\/+/, '');
  const filePath = path.join(PUBLIC_DIR, safePath);
  if (filePath.indexOf(PUBLIC_DIR) !== 0) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.pdf': 'application/pdf',
      '.json': 'application/json',
      '.txt': 'text/plain'
    };

    const contentType = contentTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': stats.size });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', () => res.end());
  });
});

server.listen(PORT, () => console.log(`Download server listening on http://localhost:${PORT}`));
