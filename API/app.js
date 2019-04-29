const express = require('express');

const app = express();

// MongoDB connection
require('./database/connect');

// Routes
app.use(require('./routes'));

// API init
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log('Api started on port ' + PORT));
