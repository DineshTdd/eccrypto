const express = require('express');
const eci = require('./ecies');
const app = express();

app.get('/', (req,res) => {
    res.send('Hello world');
    app.use(eci);
});

app.listen(4125, () => console.log('Listening on port 4125...'));