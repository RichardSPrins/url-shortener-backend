const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  slug: String,
  ogUrl: String,
  shortUrl: String,
}, { timestamps: true })

module.exports = mongoose.model('url', urlSchema)