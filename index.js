const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

// Get YT Data
app.get('/youtube', (req, res) => {
  res.send('this is where we do the Youtubez');
});

app.listen(port, () => console.log(`Listening on ${port}`));
