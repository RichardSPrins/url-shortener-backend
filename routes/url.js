const router = require('express').Router()
const validUrl = require('valid-url')
const Url = require('../db/models/Url')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 8)
require('dotenv').config()

/* 
  {route}:      POST /api/url/snip
  {body}:     Object: {<String>longUrl}
*/

router.post('/snip', async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = process.env.BASE_URL
  // TODO: Generate Unique slug
  const slug = nanoid()

  // TODO: Validate Base URL
  if (!validUrl.isUri(baseUrl)) {
    return res.status(500).json({ success: false, message: 'Base URL is not a valid URL' })
  }

  // TODO: Validate Original URL
  if (validUrl.isUri(longUrl)) {
    try {
      // TODO: Persist URL to DB, after checking that it doesn't already exist
      let url = await Url.findOne({ ogUrl: longUrl })

      if (url) {
        res.json({ success: true, message: 'URL already Snipped', data: url })
      } else {
        const shortUrl = `${baseUrl}/${slug}`

        url = new Url({
          shortUrl,
          slug,
          ogUrl: longUrl
        })

        await url.save()
        res.status(200).json({ success: true, message: 'URL snipped.', data: url })
      }
    } catch (error) {
      console.error(error.message)
      res.status(500).json(error.message)
    }
  } else {
    res.status(500).json({ success: false, message: 'URL entered is not valid' })
  }
})

/*
  {route}:      GET/api/url/info/:id
  {params}:     <String>:id
*/

// Fetch URL data by slug
router.get('/info/:id', async (req, res) => {
  const { id } = req.params
  console.log('id', id)
  try {
    const url = await Url.findOne({ slug: id })
    console.log(url)
    if (!url) {
      return res.status(404).json({ success: false, message: 'URL Snip not found' })
    }

    res.status(200).json({ success: true, data: url })
  } catch (error) {
    console.error(error.message)
  }
})
module.exports = router