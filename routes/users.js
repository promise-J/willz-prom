
const router = require('express').Router()

router.get('/', (req, res)=>{
    console.log('called...')
    res.send('here')
})

module.exports = router