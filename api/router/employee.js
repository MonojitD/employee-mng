const express = require('express');
const employeeController = require('../controller/employee');
const router = express.Router();

router.post('/', employeeController.createNewEmployee);
router.get('/', employeeController.getAllEmployees);

exports.router = router;