const router = require('express').Router()

router.get('/snip', (req, res) => {
  // TODO: Validate URL and generate short url
  // TODO: Persist URL to DB, after checking that it doesn't already exist
  return res.status(200).send('Snip endpoint')
})


module.exports = router