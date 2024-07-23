import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { ActivityIndicator, Divider, MD2Colors } from "react-native-paper";

const user = () => {
  const params = useLocalSearchParams();
  const [attendanceStatus, setAttendanceStatus] = useState(params?.status);
  const [currentDate, setCurrentDate] = useState(params?.date);
  const [loading, setLoading] = useState(false);
  console.log(currentDate);

  // const goToNextDay = () => {
  //   const nextDate = moment(currentDate).add(1, "days");
  //   setCurrentDate(nextDate);
  // };

  // const goToPrevDay = () => {
  //   const prevDate = moment(currentDate).subtract(1, "days");
  //   setCurrentDate(prevDate);
  // };

  // const formatDate = (date) => {
  //   return date.format("MMMM D, YYYY");
  // };
  const submitAttendance = async () => {
    setLoading(true);
    try {
      const attendanceData = {
        employeeId: params?.id,
        employeeName: params?.name,
        date: currentDate.format("MMMM D, YYYY"),
        status: attendanceStatus,
      };
      const response = await axios.post(
        "http://10.0.2.2:8000/attendance",
        attendanceData
      );

      if (response.status === 200) {
        Alert.alert(
          "Attendance Update ✅",
          `Attendance status of ${params?.name} for ${moment(
            params?.date
          ).format("Do MMMM, YYYY")} is updated successfully.`,
          [
            {
              text: "OK",
              onPress: () => router.push("/markattendance"),
            },
          ]
        );
      }
    } catch (error) {
      console.log("error submitting attendance", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'space-between',
          gap: 10,
          marginVertical: 20,
        }}
      >
        <Ionicons
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        {/* <AntDesign onPress={goToPrevDay} name="left" size={24} color="black" /> */}
        <Text>{moment(currentDate).format("MMMM D, YYYY")}</Text>
        <AntDesign name="right" size={24} color="#ffffff00" />
      </View>

      <Pressable
        style={{
          marginVertical: 10,
          marginHorizontal: 12,
          flexDirection: "row",
          gap: 10,
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
            {params?.name.charAt(0)}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {params?.name}
          </Text>
          <Text style={{ marginTop: 5, color: "gray" }}>
            {params?.designation}
          </Text>
          <Text style={{ marginTop: 5, color: "#626262" }}>Employee Id : {params?.id}</Text>
          <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "500" }}>
            Basic Pay : {params?.salary}
          </Text>
        </View>
      </Pressable>
      <Divider style={{marginTop: 20, marginBottom: 10}}/>
      <View style={{ marginHorizontal: 12 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            letterSpacing: 2,
            marginTop: 7,
            textAlign: 'center'
          }}
        >
          ATTENDANCE
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          <Pressable
            onPress={() => setAttendanceStatus("present")}
            style={[styles.attendance_box, { backgroundColor: "#00d20e70" }]}
          >
            {attendanceStatus === "present" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Present</Text>
          </Pressable>

          <Pressable
            onPress={() => setAttendanceStatus("absent")}
            style={[styles.attendance_box, { backgroundColor: "#ff696970" }]}
          >
            {attendanceStatus === "absent" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Absent</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginVertical: 10,
          }}
        >
          <Pressable
            onPress={() => setAttendanceStatus("halfday")}
            style={[styles.attendance_box, { backgroundColor: "#ffb11470" }]}
          >
            {attendanceStatus === "halfday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Half Day</Text>
          </Pressable>

          <Pressable
            onPress={() => setAttendanceStatus("holiday")}
            style={[styles.attendance_box, { backgroundColor: "#FF69B470" }]}
          >
            {attendanceStatus === "holiday" ? (
              <FontAwesome5 name="dot-circle" size={24} color="black" />
            ) : (
              <Entypo name="circle" size={24} color="black" />
            )}
            <Text>Holiday</Text>
          </Pressable>
        </View>
        {/* <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#E0E0E0",
              padding: 10,
              flex: 1,
            }}
            placeholderTextColor="black"
            placeholder="Advance / Loans"
          />
          <TextInput
            style={{
              borderRadius: 6,
              marginTop: 10,
              borderWidth: 2,
              borderColor: "#E0E0E0",
              padding: 10,
              flex: 1,
            }}
            placeholderTextColor="black"
            placeholder="Extra Bonus"
          />
        </View> */}

        {loading ? (
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator
              animating={true}
              color={MD2Colors.blue400}
              size={"large"}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={submitAttendance}
            style={{
              padding: 15,
              backgroundColor: "#00c6ff",
              width: 200,
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 30,
              borderRadius: 6,
            }}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "500" }}
            >
              Submit Attendance
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default user;

const styles = StyleSheet.create({
  attendance_box: {
    backgroundColor: "#00c8ff",
    padding: 10,
    borderRadius: 8,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
});
