const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const employeeRouter = require('./router/employee');
const attendanceRouter = require('./router/attendance');

const app = express();
dotenv.config();

const port = 8000;


mongoose.connect(process.env.MONGO_DB)
.then(() => {
    console.log("Connected to MongoDB !!")
})
.catch((error) => {
    console.log(error)
})

app.use(express.json());
app.use('/employee', employeeRouter.router);
app.use('/attendance', attendanceRouter.router);

app.listen(port, () => {
    console.log(`Server in running on port ${port}`)
})