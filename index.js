const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/'));
app.get('/', (req,res) => {
    res.send('Hello world');
    app.use(eci);
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4125);
