import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const index = () => {
    const router = useRouter();
  return (
    <ScrollView>
      <StatusBar backgroundColor="#72c6ff95" barStyle='dark-content'/>
      <LinearGradient colors={["#72c6ff80", "#f6f0fe"]} style={{ flex: 1 }}>
        <View style={{ padding: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Feather name="bar-chart" size={24} color="black" />
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Employee Managament System
            </Text>
            <Entypo name="lock" size={24} color="black" />
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Pressable
              onPress={() => router.push("/(home)/employees")}
              style={styles.top_box}
            >
              <View style={styles.top_box_circle}>
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Employee List
              </Text>
            </Pressable>
            <Pressable
              onPress={() => router.push("/(home)/markattendance")}
              style={styles.top_box}
            >
              <View style={styles.top_box_circle}>
                <MaterialIcons name="edit-calendar" size={24} color="black" />
              </View>
              <Text style={{ marginTop: 7, fontWeight: "600" }}>
                Mark Attendance
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 20,
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 2,
              marginVertical: 13,
              borderRadius: 8,
            }}
          >
            <Pressable style={styles.mid_box}>
              <View style={styles.mid_box_icon}>
                <Ionicons name="newspaper-outline" size={24} color="black" />
              </View>
              <Text style={styles.mid_box_text}>Attendance Report</Text>
              <View style={styles.mid_box_arrow}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(home)/summary")}
              style={styles.mid_box}
            >
              <View style={styles.mid_box_icon}>
                <Octicons name="repo-pull" size={24} color="black" />
              </View>
              <Text style={styles.mid_box_text}>Summary Report</Text>
              <View style={styles.mid_box_arrow}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable style={styles.mid_box}>
              <View style={styles.mid_box_icon}>
                <Octicons name="report" size={24} color="black" />
              </View>
              <Text style={styles.mid_box_text}>All Generate Reports</Text>
              <View style={styles.mid_box_arrow}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable style={styles.mid_box}>
              <View style={styles.mid_box_icon}>
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text style={styles.mid_box_text}>Overtime Employees</Text>
              <View style={styles.mid_box_arrow}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={[
                styles.bottom_box,
                // {
                //   backgroundColor: "#f79d00",
                // },
              ]}
            >
              <View style={styles.bottom_box_icon}>
                <MaterialCommunityIcons
                  name="guy-fawkes-mask"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.bottom_box_text}>Attendance Criteria</Text>
            </View>
            <View
              style={[
                styles.bottom_box,
                // {
                //   backgroundColor: "#ABCABA",
                // },
              ]}
            >
              <View
                style={styles.bottom_box_icon}
              >
                <Feather name="bar-chart" size={24} color="black" />
              </View>
              <Text style={styles.bottom_box_text}>Increased Workflow</Text>
            </View>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={[
                styles.bottom_box,
                // {
                //   backgroundColor: "#D3CCE3",
                // },
              ]}
            >
              <View
                style={styles.bottom_box_icon}
              >
                <MaterialCommunityIcons
                  name="guy-fawkes-mask"
                  size={24}
                  color="black"
                />
              </View>
              <Text style={styles.bottom_box_text}>Cost Savings</Text>
            </View>
            <View
              style={[
                styles.bottom_box,
                // {
                //   backgroundColor: "#bdc3c7",
                // },
              ]}
            >
              <View
                style={styles.bottom_box_icon}
              >
                <Feather name="bar-chart" size={24} color="black" />
              </View>
              <Text style={styles.bottom_box_text}>Employee Performance</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  top_box: {
    backgroundColor: "#b9fbbe",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  top_box_circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  mid_box: {
    backgroundColor: "#f9c9e1",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  mid_box_icon: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  mid_box_text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  mid_box_arrow: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom_box: {
    borderRadius: 6,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: '#ffdfa0'
  },
  bottom_box_icon: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  bottom_box_text: {
    marginTop: 7,
  },
});
