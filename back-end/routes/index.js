const express = require('express')
const router = express.Router()
const {HumiSensorFactory, LightSensorFactory, TempSensorFactory} = require('../controllers/SensorControllerFactory')
const activityController = require('../controllers/ActivityController')

const humiSensorFactory = new HumiSensorFactory()
const humiSensorController = humiSensorFactory.createController()

const lightSensorFactory = new LightSensorFactory()
const lightSensorController = lightSensorFactory.createController()

const tempSensorFactory = new TempSensorFactory()
const tempSensorController = tempSensorFactory.createController()

const controllers = [humiSensorController, lightSensorController, tempSensorController]

controllers.forEach((controller) => {
    router.route(`/halfday/${controller.name}`)
        .get(controller.readAveragePerHourForHalfDay.bind(controller))
        .post(controller.createData.bind(controller))
    router.route(`/week/${controller.name}`)
        .get(controller.readAveragePerDayForWeek.bind(controller))
})

router.route(`/onoff/activity/:limit?`)
    .get(activityController.readOnOff)

module.exports = router