const express = require('express')
const router = express.Router()
const dynamicController = require('../controllers/DynamicController')
const activityController = require('../controllers/ActivityController')

const collections = ['fan', 'humisensor', 'led', 'lightsensor', 'tempsensor', 'test']

collections.forEach((collection) => {
    controller = dynamicController(collection)
    router.route(`/halfday/${collection}`)
        .get(controller.readAveragePerHourForHalfDay)
        .post(controller.createData)
    router.route(`/week/${collection}`)
        .get(controller.readAveragePerDayForWeek)
})

router.route(`/onoff/activity/:limit`)
    .get(activityController.readOnOff)

module.exports = router