const moment = require('moment')
const Activity = require(`../models/ActivityModel`)

const removePrefix = (activities) => {
    const modifiedActivities = activities.map(activity => {
        activity.feed_id = activity.feed_id.replace(/^smarthome\./, '');
        return activity;
    });
    return modifiedActivities
}

const readOnOff = async (req, res) => {
    try {
        const {limit} = req.params
        const onOffActivities = await Activity.find({})
            .sort({created_at: -1})
            .limit(parseInt(limit));

        moment().utcOffset('+07:00')
        const formattedActivities = onOffActivities.map(activity => ({
            ...activity.toObject(),
            created_at: moment(activity.created_at).format('YYYY-MM-DD HH:mm:ss')
        }));

        res.status(200).json({data: formattedActivities})
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
    readAll,
}