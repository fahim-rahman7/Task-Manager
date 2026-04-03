const mongoose = require('mongoose');

const dbConfig = async () => {
    await mongoose.connect(process.env.Db_URL);
    return console.log('db Connected!');
}

module.exports = dbConfig;