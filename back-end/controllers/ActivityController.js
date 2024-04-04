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
        const onOffActivities = await Activity.find({
            value: {$in: ["ON", "OFF"]}
        })
            .sort({created_at: -1})
            .limit(parseInt(limit));
        const modifiedActivities = removePrefix(onOffActivities)
        res.status(200).json({data: modifiedActivities})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

const readAll = async (req, res) => {
    try {
        const allActivities = await Activity.find({}).sort({created_at: -1})
        const modifiedActivities = removePrefix(allActivities)
        res.status(200).json({data: modifiedActivities})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    readOnOff,
    readAll,
}