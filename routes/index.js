const router = require('express').Router()
const Url = require('../db/models/Url')
require('dotenv').config()

router.get('/:slug', async (req, res) => {
  const { slug } = req.params
  // TODO: Validate URL and redirect to original URL on GET req
  try {
    const url = await Url.findOne({ slug })
    // console.log('url', url)

    if (!url) {
      return res.status(404).json({ success: false, message: 'URL not found or valid' })
    }
    return res.redirect(url.ogUrl)
  } catch (error) {
    console.error(error.message)
  }
})


module.exports = router