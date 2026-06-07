require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cookieParser = require('cookie-parser')
const modules = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({
    //origin: process.env.CLIENT_URL || 'http://localhost:5173',
    origin: "http://localhost",
    credentials: true
}))
app.use(express.json({ limit: '100mb' }))
app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
    abortOnLimit: true
}))
app.use(cookieParser())
app.use('/api', router)


app.get('/', (req, res) => {
    res.status(200).json({message: 'It work'})
})

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()