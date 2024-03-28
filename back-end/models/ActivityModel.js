const mongoose = require('mongoose')

const ActivitySchema = new mongoose.Schema({
    feed_id: String,
    value: String,
    created_at: Date,
})

module.exports = mongoose.model('Activity', ActivitySchema, 'activity')