const express = require('express');
const expressFile = require('express-fileupload');

const app = express();

// MongoDB connection
require('./database/connect');

// Body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressFile());

// Routes
app.use(require('./routes'));

// API init
const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log('Api started on port ' + PORT));
