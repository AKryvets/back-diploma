const mongoose = require('mongoose');
require('dotenv').config();

const server = `${process.env.DB_HOST}:${process.env.DB_PORT}`;
const index = process.env.DB_NAME;

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(`mongodb://${server}/${index}`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }).then(() => {
        console.log('Database connection successful')
      })
      .catch((error: any) => {
        console.error('Database connection error', error)
      })
  }
}

module.exports = new Database();