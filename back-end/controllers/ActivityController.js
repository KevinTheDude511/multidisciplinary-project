const Activity = require(`../models/ActivityModel`)

const readOnOff = async (req, res) => {
    try {
        const {limit} = req.params
        const onOffActivities = await Activity.find({
            value: {$in: ["ON", "OFF"]}
        })
            .sort({created_at: -1})
            .limit(parseInt(limit));
        res.status(200).json({data: onOffActivities})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    readOnOff,
}