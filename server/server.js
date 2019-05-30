const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const proxy = require('http-proxy-middleware');
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

var resOptions = {
    target: 'http://localhost:3010/', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
}
   
app.use('/reservations', proxy(resOptions));

var menuOptions = {
    target: 'http://localhost:3003/', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
}

app.use('/API/restaurant', proxy(menuOptions));

var picOptions = {
    target: 'http://localhost:3002/', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
}

app.use('/restaurants', proxy(picOptions));

var reviewOptions = {
    target: 'http://localhost:3007/', // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
}

app.use('/reviews', proxy(reviewOptions));

app.get('/restaurant/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});