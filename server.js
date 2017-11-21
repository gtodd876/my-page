const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.listen(3001, () => {
  console.log('http://localhost:3001');
});
