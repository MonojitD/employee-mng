import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchResults from "../../components/SearchResults";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

const employees = () => {
  const [employees, setEmployees] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://10.0.2.2:8000/employee");
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        Alert.alert("Fetch employee failed", `message: ${error}`);
        router.push("/(home)");
        console.log("Error fetching employee data", error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />

          {employees.length > 0 && (
            <View>
              <Pressable onPress={() => router.push("/(home)/adddetails")}>
                <AntDesign name="pluscircle" size={30} color="#0072b1" />
              </Pressable>
            </View>
          )}
        </Pressable>
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
        <>
          {employees.length > 0 ? (
            <SearchResults data={employees} input={input} setInput={setInput} />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Data</Text>
              <Text>Press on the plus button and add your Employee</Text>
              <Pressable onPress={() => router.push("/(home)/adddetails")}>
                <AntDesign
                  style={{ marginTop: 30 }}
                  name="pluscircle"
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default employees;

const styles = StyleSheet.create({});
