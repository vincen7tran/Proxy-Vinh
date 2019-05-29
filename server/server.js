const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');
const PORT = 3000;
const app = express();

app.use('/restaurants/*', express.static(path.join(__dirname, '../public')));

var options = {
    target: 'http://localhost:3010/', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    // pathRewrite: {
    //   '^/api/old-path': '/api/new-path', // rewrite path
    //   '^/api/remove/path': '/path' // remove base path
    // }
  }
   
app.use('/reservations', proxy(options));

app.get('/res/:name', function(req, res) {
    res.header("X-Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, '../public/index.html'))
});


app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});