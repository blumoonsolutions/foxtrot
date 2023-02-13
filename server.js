require('dotenv').config()
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('./utils/database').connectDB()
require('./api/routes').setRoutes(app)

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 4300

app.listen(port, console.log(`Server started on http://${host}:${port}`))