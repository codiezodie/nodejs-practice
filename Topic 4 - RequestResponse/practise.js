const http = require('http');

function renderPage(title, content) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${title}</title>
  <style>
    nav ul { list-style:none; padding:0; display:flex; gap:1rem; }
    nav a { text-decoration:none; }
    body { font-family: Arial, sans-serif; padding:1rem; }
  </style>
</head>
<body>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/men">Men</a></li>
      <li><a href="/women">Women</a></li>
      <li><a href="/kids">Kids</a></li>
    </ul>
  </nav>

  <main>
    ${content}
  </main>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // route mapping
  if (req.method === 'GET' && (req.url === '/' || req.url === '/home')) {
    const html = renderPage('Myntra - Home', '<h1>Welcome to Home Page</h1>');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  if (req.method === 'GET' && req.url === '/men') {
    const html = renderPage("Myntra - Men's", "<h1>Welcome to Men's Section</h1>");
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  if (req.method === 'GET' && req.url === '/women') {
    const html = renderPage("Myntra - Women's", "<h1>Welcome to Women's Section</h1>");
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  if (req.method === 'GET' && req.url === '/kids') {
    const html = renderPage('Myntra - Kids', "<h1>Welcome to Kids' Section</h1>");
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(html);
  }

  // fallback 404
  const notFound = renderPage('404 Not Found', '<h1>404 Not Found</h1><p>Page does not exist.</p>');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(notFound);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
