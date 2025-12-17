const http = require('http');

const PORT = 3100;

http.createServer((req, res) => {
  res.end('Hello from Jenkins CD Pipeline 🚀');
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
