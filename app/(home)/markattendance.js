import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const markattendance = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(moment());
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const goToNextDay = () => {
    const nextDate = moment(currentDate).add(1, "days");
    setCurrentDate(nextDate);
  };

  const goToPrevDay = () => {
    const prevDate = moment(currentDate).subtract(1, "days");
    setCurrentDate(prevDate);
  };

  const formatDate = (date) => {
    return date.format("MMMM D, YYYY");
  };

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading1(true)
      try {
        const response = await axios.get("http://10.0.2.2:8000/employee");
        setEmployees(response.data);
        setLoading1(false)
      } catch (error) {
        setLoading1(false)
        Alert.alert(
          "Fetch employee failed",
          `message: ${error}`
        );
        router.push("/(home)");
        console.log("error fetching employee data", error);
      }
    };
    fetchEmployeeData();
  }, []);
  const [attendance, setAttendance] = useState([]);
  const fetchAttendanceData = async () => {
    setLoading2(true)
    try {
      const response = await axios.get(
        `http://10.0.2.2:8000/attendance`,
        {
          params: {
            date: currentDate.format("MMMM D, YYYY"),
          },
        }
      );
      setAttendance(response.data);
      setLoading2(false)
    } catch (error) {
      setLoading2(false)
      Alert.alert(
        "Fetch attendance failed",
        `message: ${error}`
      );
      router.push("/(home)")
      console.log("error fetching attendance data", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [currentDate]);
  const employeeWithAttendance = employees.map((employee) => {
    const attendanceRecord = attendance.find(
      (record) => record.employeeId === employee.employeeId
    );

    return {
      ...employee,
      status: attendanceRecord ? attendanceRecord.status : "", // 'Not Marked' or a default status
    };
  });
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginVertical: 20,
          }}
        >
          <AntDesign
            onPress={goToPrevDay}
            name="left"
            size={24}
            color="black"
          />
          <Text>{formatDate(currentDate)}</Text>
          <AntDesign
            onPress={goToNextDay}
            name="right"
            size={24}
            color="black"
          />
        </View>

        {loading1 || loading2 ? (
          <View style={{ marginTop: 250 }}>
            <ActivityIndicator
              animating={true}
              color={MD2Colors.blue400}
              size={"large"}
            />
          </View>
        ) : (
          <View style={{ marginHorizontal: 12 }}>
            {employeeWithAttendance.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/[user]",
                    params: {
                      name: item.employeeName,
                      id: item.employeeId,
                      salary: item?.salary,
                      designation: item?.designation,
                      status: item?.status,
                      date: currentDate,
                    },
                  })
                }
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: "#4b6cb7",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {item?.employeeName?.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {item?.employeeName}
                  </Text>
                  <Text style={{ marginTop: 5, color: "gray" }}>
                    {item?.designation} ({item?.employeeId})
                  </Text>
                </View>
                {item?.status === "present" && (
                  <View style={[styles.status, { backgroundColor: "#00d20e" }]}>
                    <Text style={styles.status_text}>P</Text>
                  </View>
                )}
                {item?.status === "absent" && (
                  <View style={[styles.status, { backgroundColor: "#ff6969" }]}>
                    <Text style={styles.status_text}>A</Text>
                  </View>
                )}
                {item?.status === "halfday" && (
                  <View style={[styles.status, { backgroundColor: "#ffb114" }]}>
                    <Text style={styles.status_text}>Hf</Text>
                  </View>
                )}
                {item?.status === "holiday" && (
                  <View style={[styles.status, { backgroundColor: "#FF69B4" }]}>
                    <Text style={styles.status_text}>Hl</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default markattendance;

const styles = StyleSheet.create({
  status: {
    width: 50,
    height: 50,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  status_text: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
