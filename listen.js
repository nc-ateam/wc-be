const http = require('http');
const { getApi } = require('./api/api');
const PORT = 9090;

const server = http.createServer((req, res) => {
  if (req.url === '/api') {
    getApi(req, res);
  }
});

server.listen(PORT);
console.log(`Server is listening on ${PORT}`);
