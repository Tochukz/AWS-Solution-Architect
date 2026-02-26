const express = require('express');
const app = express();
const PORT = 4001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Service 1 root endpoint' });
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from Service 1!' });
});

app.post('/data', (req, res) => {
  res.json({ received: req.body });
});

app.listen(PORT, () => {
  console.log(`Mock Service 1 running on port ${PORT}`);
});
