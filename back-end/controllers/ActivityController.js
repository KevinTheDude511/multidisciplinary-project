const Activity = require(`../models/ActivityModel`)

const readOnOff = async (req, res) => {
    try {
        const {limit} = req.params
        const onOffActivities = await Activity.find({})
            .sort({created_at: -1})
            .limit(parseInt(limit));
        res.status(200).json({data: onOffActivities})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

// find with conditions
// $or: [
//     {
//         feed_id: "smarthome.led",
//         value: {$in: ["ON", "OFF"]}
//     },
//     {feed_id: "smarthome.fan"}
// ]

module.exports = {
    readOnOff,
}