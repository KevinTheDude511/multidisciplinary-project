function capitalized(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function generateDynamicController(collectionName) {
    let modelName = capitalized(collectionName) + "Model"
    const dynamicModel = require(`../models/${modelName}`)
    const currentDate = new Date()
    currentDate.setUTCHours(currentDate.getUTCHours() + 7)
    const numberOfFakeData = 10000 // for creating fake data in 'test' collection

    return {
        async readAveragePerHourForHalfDay(req, res) {
            try {
                const hourRange = 12
                const startRange = new Date(currentDate)
                startRange.setUTCHours(currentDate.getUTCHours() - hourRange)
                const step = 1
                const avgDataList = [];

                for (let i = 0; i < hourRange; i++) {
                    const start = new Date(startRange);
                    start.setUTCHours(start.getUTCHours() + i)
                    const end = new Date(startRange);
                    end.setUTCHours(end.getUTCHours() + i + step)
                    
                    const aggregateResult = await dynamicModel.aggregate([
                        {
                            $match: {
                                created_at: {
                                    $gte: start,
                                    $lt: end,
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                averageValue: { $avg: "$value" }
                            }
                        }
                    ]);

                    let averageValue = 0;
                    if (aggregateResult.length > 0) {
                        averageValue = aggregateResult[0].averageValue;
                        averageValue = Math.round(averageValue * 100) / 100;
                    }
                    avgDataList.push(averageValue);
                }
        
                // console.log(avgDataList);
                res.status(200).json({data: avgDataList})
            } catch (error) {
                console.log(error)
                res.status(500).json({msg: error})
            }
        },
        async readAveragePerDayForWeek(req, res) {
            try {
                const dayRange = 7
                const startRange = new Date(currentDate)
                startRange.setUTCDate(currentDate.getUTCDate() - dayRange)
                const step = 1
                const avgDataList = [];
                // console
                for (let i = 0; i < dayRange; i++) {
                    const start = new Date(startRange);
                    start.setUTCDate(start.getUTCDate() + i)
                    const end = new Date(startRange);
                    end.setUTCDate(end.getUTCDate() + i + step)
                    
                    const aggregateResult = await dynamicModel.aggregate([
                        {
                            $match: {
                                created_at: {
                                    $gte: start,
                                    $lt: end,
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                averageValue: { $avg: "$value" }
                            }
                        }
                    ]);

                    let averageValue = 0;
                    if (aggregateResult.length > 0) {
                        averageValue = aggregateResult[0].averageValue;
                        averageValue = Math.round(averageValue * 100) / 100;
                    }
                    avgDataList.push(averageValue);
                }
        
                // console.log(avgDataList);
                res.status(200).json({data: avgDataList})
            } catch (error) {
                console.log(error)
                res.status(500).json({msg: error})
            }
        },
        async createData(req, res) {
            try {
                const currentDate = new Date()
                currentDate.setUTCHours(currentDate.getUTCHours() + 7)
                const startTime = new Date(currentDate)
                startTime.setUTCDate(startTime.getUTCDate() - 7)
                const endTime = new Date(currentDate)

                startTimeValue = startTime.getTime()
                endTimeValue = endTime.getTime()
                const fakeData = [];
                for (let i = 0; i < numberOfFakeData; i++) {
                    const id = '0FJ2E8399ERHJH53JBXE51P2FC'
                    const feed_id = 2768221
                    const feed_key = 'smarthome.fan'
                    const value = Math.floor(Math.random() * 101)
                    let created_at = new Date(startTimeValue + Math.random() * (endTimeValue - startTimeValue))
                    // created_at = created_at.toISOString()
                    fakeData.push({
                        id,
                        value,
                        feed_id,
                        feed_key,
                        created_at,
                    })
                }

                await dynamicModel.insertMany(fakeData)
                res.status(201).json({ msg: 'Fake data created successfully' })
            } catch (error) {
                res.status(500).json({msg: error})
            }
        }
    }
}

module.exports = generateDynamicController