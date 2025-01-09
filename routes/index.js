const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()

fs.readdirSync(__dirname)
.filter(file=> file !='index.js' && file.endsWith('.js'))
.forEach(file=> {
    const route = require(path.join(__dirname, file))
    const routeName = file.split('.')[0]
    router.use(`/${routeName}`, route)
})

module.exports = router