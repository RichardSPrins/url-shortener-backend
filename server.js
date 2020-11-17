const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const connectDB = require('./db')
const urlRoute = require('./routes/url')
const redirectRoute = require('./routes/index')
const cors = require('cors')

app.use(express.json({ extended: false }))
app.use(cors())

connectDB();

app.use('/', redirectRoute)
app.use('/api/url', urlRoute)


app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})