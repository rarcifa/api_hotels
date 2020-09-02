const mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000,
        };

        mongoose.connect(process.env.DB_LINK, options)
            .then(() => console.log('mongoDB connected'))
            .catch(console.log);
    }
}

module.exports = new Database();
