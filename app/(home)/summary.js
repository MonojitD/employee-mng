import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator, DataTable, MD2Colors } from "react-native-paper";

const summary = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment());
  const [loading, setLoading] = useState(false);

  const goToNextMonth = () => {
    const nextMonth = moment(currentDate).add(1, "months");
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = moment(currentDate).subtract(1, "months");
    setCurrentDate(prevMonth);
  };

  const formatDate = (date) => {
    return date.format("MMMM, YYYY");
  };
  const fetchAttendanceReport = async () => {
    setLoading(true);
    try {
      const respone = await axios.get(
        `http://10.0.2.2:8000/attendance/report-all`,
        {
          params: {
            month: moment(currentDate).format("MM"),
            year: moment(currentDate).format("YYYY"),
          },
        }
      );

      setAttendanceData(respone.data.report);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Fetch attendance failed", `message: ${error}`);
      router.push("/(home)");
      console.log("error fetching attendance data", error);
    }
  };
  useEffect(() => {
    fetchAttendanceReport();
  }, [currentDate]);
  console.log(attendanceData);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
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
          onPress={goToPrevMonth}
          name="left"
          size={24}
          color="black"
        />
        <Text>{formatDate(currentDate)}</Text>
        <AntDesign
          onPress={goToNextMonth}
          name="right"
          size={24}
          color="black"
        />
      </View>

      {loading ? (
        <View style={{ marginTop: 250 }}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.blue400}
            size={"large"}
          />
        </View>
      ) : (
        <View style={{ marginHorizontal: 12 }}>
          {attendanceData.length != 0 ? (
            attendanceData?.map((item, index) => (
              <View key={index} style={{ marginVertical: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
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
                      {item?.name?.charAt(0)}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Text style={{ marginTop: 5, color: "gray" }}>
                      {item?.designation} ({item?.employeeId})
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: 15,
                    margin: 5,
                    padding: 5,
                    backgroundColor: "#A1FFCE",
                    borderRadius: 5,
                  }}
                >
                  <DataTable>
                    <DataTable.Header>
                      <DataTable.Title>P</DataTable.Title>
                      <DataTable.Title>A</DataTable.Title>
                      <DataTable.Title>Hf</DataTable.Title>
                      <DataTable.Title>Hl</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                      <DataTable.Cell>{item?.present}</DataTable.Cell>
                      <DataTable.Cell>{item?.absent}</DataTable.Cell>
                      <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                      <DataTable.Cell>1</DataTable.Cell>
                    </DataTable.Row>
                  </DataTable>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                marginTop: 250,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 50 }}>👎🏼</Text>
              <Text style={{ fontSize: 20 }}>No data found</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default summary;

const styles = StyleSheet.create({});
