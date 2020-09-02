require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const router = require('./routes');
const app = express();
require('./db');

app.use(express.json());

// register the routes
router.route(app);

// listen to PORT once app is ready
app.on('ready', () => {
    app.listen(process.env.PORT, () => {
        console.log(`running @${process.env.PORT}`);
    });
});

// fire (emit) a ready event
mongoose.connection.once('open', () => app.emit('ready'));

// export for test
module.exports = app;
