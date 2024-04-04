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
        let {limit} = req.params
        limit = limit ? parseInt(limit) : null

        let query = Activity.find({}).sort({created_at: -1})
        if (limit !== null)
        {
            query = query.limit(limit)
        }

        let allActivities = await query

        allActivities = allActivities.map(activity => ({
            ...activity.toObject(),
            created_at: moment(activity.created_at).format('YYYY-MM-DD HH:mm:ss')
        }));

        const formattedActivities = removePrefix(allActivities)
        res.status(200).json({data: formattedActivities})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    readOnOff,
}