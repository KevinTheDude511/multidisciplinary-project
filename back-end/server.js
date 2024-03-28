const express = require('express')
const cors = require('cors')
const app = express()
const connectDatabase = require('./database/connect')
require('dotenv').config()

const port = process.env.PORT || 5000

const index = require('./routes/index')

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:5713', 'http://localhost:5174', 'http://localhost:5175'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};


app.use(express.json())
app.use(cors(corsOptions))

app.use('/api/v1', index)

const startServer = async () => {
    try {
        await connectDatabase(process.env.MONGO_URL)
        console.log("Database connection successful")
        app.listen(port, () => {
            console.log("Server is listening at port " + port)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()