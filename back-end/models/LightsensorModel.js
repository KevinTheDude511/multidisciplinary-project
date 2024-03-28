const mongoose = require('mongoose')

const LightsensorSchema = new mongoose.Schema({
    id: String,
    value: Number,
    feed_id: Number,
    feed_key: String,
    created_at: Date,
})

module.exports = mongoose.model('Lightsensor', LightsensorSchema, 'lightsensor')