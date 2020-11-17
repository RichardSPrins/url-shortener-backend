const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  slug: String,
  ogUrl: String,
  shortUrl: String,
  qrCode: String
}, { timestamps: true })

module.exports = mongoose.model('urls', urlSchema)