const express = require('express')
const router = express.Router()
const controllerFactory = require('../controllers/ControllerFactory')
const activityController = require('../controllers/ActivityController')

const collections = ['humisensor', 'lightsensor', 'tempsensor', 'test']

collections.forEach((collection) => {
    const controller = controllerFactory(collection)
    router.route(`/halfday/${collection}`)
        .get(controller.readAveragePerHourForHalfDay)
        .post(controller.createData)
    router.route(`/week/${collection}`)
        .get(controller.readAveragePerDayForWeek)
})

router.route(`/onoff/activity/:limit?`)
    .get(activityController.readOnOff)

module.exports = router