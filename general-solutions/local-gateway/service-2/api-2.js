const express = require('express');
const app = express();
const PORT = 4002;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Service 2 root endpoint' });
});

app.get('/status', (req, res) => {
  res.json({ status: 'Service 2 is healthy' });
});

app.post('/echo', (req, res) => {
  res.json({ echo: req.body });
});

app.listen(PORT, () => {
  console.log(`Mock Service 2 running on port ${PORT}`);
});
