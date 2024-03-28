const mongoose = require('mongoose')

const HumisensorSchema = new mongoose.Schema({
    id: String,
    value: Number,
    feed_id: Number,
    feed_key: String,
    created_at: Date,
})

module.exports = mongoose.model('Humisensor', HumisensorSchema, 'humisensor')