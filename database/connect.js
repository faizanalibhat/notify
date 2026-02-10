const mongoose = require('mongoose');
const { buildMongodbUrl } = require('../utils/utils');

const MONGODB_URL = buildMongodbUrl();

async function connect() {
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}


module.exports = connect;