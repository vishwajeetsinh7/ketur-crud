const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Name = new Schema({
    name: String
})

module.exports = mongoose.model('name', Name)