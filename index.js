const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const app = express()
const routes = require('./src/routes/index')
const cors = require('cors');

app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})