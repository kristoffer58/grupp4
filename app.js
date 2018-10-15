// Require the express module
const express = require('express');
// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));
// Start the web server on port ...
const port=3000;
console.log(require('os').networkInterfaces());

app.listen(port,() => console.log('Listening on port '+port));
