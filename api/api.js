const getApi = (req, res) => {
  console.log('hello');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify('Hello, world!'));
  res.end();
};

module.exports = { getApi };
