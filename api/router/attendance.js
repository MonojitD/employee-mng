const express = require('express')
const attendanceController = require('../controller/attendance');
const router = express.Router();

router.post('/', attendanceController.addAttendance);
router.get('/', attendanceController.getAttendance);
router.get('/report-all', attendanceController.getAttendanceReportAll);

exports.router = router;

