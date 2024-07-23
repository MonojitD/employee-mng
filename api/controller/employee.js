const modelEmployee = require("../models/employee");

exports.createNewEmployee = async (req, res) => {
    const newEmployee = new modelEmployee.Employee(req.body);
  try {
    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee created successfully", employee: newEmployee });
  } catch (error) {
    console.log("Error creating employee", error);
    res.status(500).json({ message: "Failed to add an employee" });
  }
};

exports.getAllEmployees = async (req, res) => {
    try {
        const allEmployees = await modelEmployee.Employee.find();
        await res.status(200).json(allEmployees);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve the employees" });
    }
}
