const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const db = require('./config/db');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the static frontend files from the "frontend" directory
app.use(express.static(__dirname + '/../frontend'));

// Routes
const sellersRouter = require('./routes/sellers');
app.use('/sellers', sellersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
