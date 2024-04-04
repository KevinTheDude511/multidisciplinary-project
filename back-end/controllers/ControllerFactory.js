const dynamicController = require('./DynamicController')

function controllerFactory(collectionName) {
    return dynamicController(collectionName)
}

module.exports = controllerFactory