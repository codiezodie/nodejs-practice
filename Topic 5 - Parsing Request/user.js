const http = require('http');
const querystring = require('querystring'); // to parse form data

const server = http.createServer((req, res) => {
  // Home page with form
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <title>Form Example</title>
      </head>
      <body>
        <h1>Submit your details</h1>
        <form action="/submit-details" method="POST">
          <label>Username: <input type="text" name="username" required></label><br><br>

          <label>Gender:</label><br>
          <input type="radio" id="male" name="gender" value="Male" required>
          <label for="male">Male</label><br>

          <input type="radio" id="female" name="gender" value="Female">
          <label for="female">Female</label><br>

          <input type="radio" id="other" name="gender" value="Other">
          <label for="other">Other</label><br><br>

          <button type="submit">Submit</button>
        </form>
      </body>
      </html>
    `);
  }

  // Handle form POST
  else if (req.url.toLowerCase() === '/submit-details' && req.method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const formData = querystring.parse(parsedBody); // convert to object
      console.log('Form Data:', formData);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <h1>Form Submitted</h1>
        <p>Username: ${formData.username}</p>
        <p>Gender: ${formData.gender}</p>
        <a href="/">Go Back</a>
      `);
    });
  }

  // fallback 404
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
