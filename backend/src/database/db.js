const mongoose = require('mongoose')
require('dotenv').config({ path: ".env" });
mongoose.set('strictQuery', false);

const url=process.env.DATABASE
const connection = mongoose.connect(url)
.then(() => console.log("Database successfully connect"))
.catch((err) => console.log('error',err))

module.exports = connection