import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const adddetails = () => {
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [designation, setDesignation] = useState("");

  const [input1, setInput1] = useState({ isFocused: false });
  const [input2, setInput2] = useState({ isFocused: false });
  const [input3, setInput3] = useState({ isFocused: false });
  const [input4, setInput4] = useState({ isFocused: false });
  const [input5, setInput5] = useState({ isFocused: false });
  const [input6, setInput6] = useState({ isFocused: false });
  const [input7, setInput7] = useState({ isFocused: false });
  const [input8, setInput8] = useState({ isFocused: false });
  const [input9, setInput9] = useState({ isFocused: false });

  const handleFocus = (input, setInput) => {
    setInput({ ...input, isFocused: true });
  };

  const handleBlur = (input, setInput) => {
    setInput({ ...input, isFocused: false });
  };

  const handleRegister = () => {
    const employeeData = {
      employeeName: name,
      employeeId: employeeId,
      designation: designation,
      phoneNumber: mobileNo,
      dateOfBirth: dob,
      joiningDate: joiningDate,
      activeEmployee: true,
      salary: salary,
      address: address,
    };

    axios
      .post("http://10.0.2.2:8000/employee", employeeData)
      .then((response) => {
        Alert.alert(
          "Registration Successful",
          "You have been registered successfully"
        );
        setName("");
        setEmployeeId("");
        setDob("");
        setMobileNo("");
        setSalary("");
        setAddress("");
        setJoiningDate("");
        setDesignation("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Failed",
          `${error}`
        );
        console.log("register failed", error);
      });
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 15 }}>
        <Text style={styles.label}>Add a New Employee</Text>

        <TextInput
          style={[styles.input_box, input1.isFocused && styles.inputFocused]}
          onFocus={() => handleFocus(input1, setInput1)}
          onBlur={() => handleBlur(input1, setInput1)}
          placeholder="India"
          placeholderTextColor={"#00000050"}
        />

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Full Name (First and last Name)</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={[styles.input_box, input2.isFocused && styles.inputFocused]}
            onFocus={() => handleFocus(input2, setInput2)}
            onBlur={() => handleBlur(input2, setInput2)}
            placeholder="enter your name"
            placeholderTextColor={"#00000050"}
          />
        </View>

        <View>
          <Text style={styles.label}>Employee Id</Text>
          <TextInput
            value={employeeId}
            onChangeText={(text) => setEmployeeId(text)}
            style={[styles.input_box, input3.isFocused && styles.inputFocused]}
            onFocus={() => handleFocus(input3, setInput3)}
            onBlur={() => handleBlur(input3, setInput3)}
            placeholder="Employee Id"
            placeholderTextColor={"#00000050"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Designation</Text>
          <TextInput
            value={designation}
            onChangeText={(text) => setDesignation(text)}
            style={[styles.input_box, input4.isFocused && styles.inputFocused]}
            onFocus={() => handleFocus(input4, setInput4)}
            onBlur={() => handleBlur(input4, setInput4)}
            placeholder="Designation"
            placeholderTextColor={"#00000050"}
          />
        </View>

        <View>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            style={[styles.input_box, input5.isFocused && styles.inputFocused]}
            onFocus={() => handleFocus(input5, setInput5)}
            onBlur={() => handleBlur(input5, setInput5)}
            placeholder="Mobile No"
            placeholderTextColor={"#00000050"}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            value={dob}
            onChangeText={(text) => setDob(text)}
            style={[styles.input_box, input6.isFocused && styles.inputFocused]}
            onFocus={() => handleFocus(input6, setInput6)}
            onBlur={() => handleBlur(input6, setInput6)}
            placeholder="Enter Date of Birth"
            placeholderTextColor={"#00000050"}
          />
        </View>

        <View>
          <Text style={styles.label}>Joining Date</Text>
          <TextInput
            value={joiningDate}
            onChangeText={(text) => setJoiningDate(text)}
            style={[styles.input_box, input7.isFocused && styles.inputFocused]}
            onFocus={() => handleFocus(input7, setInput7)}
            onBlur={() => handleBlur(input7, setInput7)}
            placeholder="Joining Date"
            placeholderTextColor={"#00000050"}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text>Active Employee</Text>
          <Text>True</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>Salary</Text>
          <TextInput
            value={salary}
            onChangeText={(text) => setSalary(text)}
            style={[styles.input_box, input8.isFocused && styles.inputFocused]}
            onFocus={() => handleFocus(input8, setInput8)}
            onBlur={() => handleBlur(input8, setInput8)}
            placeholder="Enter Salary"
            placeholderTextColor={"#00000050"}
          />
        </View>

        <View>
          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={(text) => setAddress(text)}
            style={[styles.input_box, input9.isFocused && styles.inputFocused]}
            onFocus={() => handleFocus(input9, setInput9)}
            onBlur={() => handleBlur(input9, setInput9)}
            placeholder="Enter Address"
            placeholderTextColor={"#00000050"}
          />
        </View>

        <Pressable
          onPress={handleRegister}
          style={{
            // backgroundColor: "#4879ff",/
            backgroundColor: "#00c6ff",
            padding: 10,
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Add Employee
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default adddetails;

const styles = StyleSheet.create({
  label: {
    fontSize: 17,
    fontWeight: "bold",
  },
  input_box: {
    padding: 10,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
  },
  inputFocused: {
    borderColor: "#00c6ff",
  },
});
