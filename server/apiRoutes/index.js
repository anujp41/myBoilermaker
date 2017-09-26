const router = require('express').Router()


//file will have a number of sub-routes above this -- if none of the routes are hit, then we give a 404 error message below
router.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

module.exports = router