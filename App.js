import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import uuid from "react-native-uuid";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: uuid.v4(),
      isDone: false,
      name: "sidfji odis ji",
    },
  ]);

  const createTask = async () => {};

  const setNewState = (id) => {};

  const deleteTask = (id) => {};

  const getData = async () => {};

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="pt-[50] bg-[#F8FAFF] pl-[24] pr-[24] flex-1">
      <View className="flex-row justify-between items-center">
        <Image source={require("./assets/images/icons/menu.png")} />
        <Image source={require("./assets/images/icons/notification.png")} />
      </View>
      <View className="mt-[25]">
        <Text className="text-[#1A2134] font-semibold" style={{ fontSize: 36 }}>
          What's up!
        </Text>
        <Text
          className="mt-[25] text-[#B0B5C7] font-semibold"
          style={{ fontSize: 14 }}
        >
          ADD NEW TASK
        </Text>
      </View>
      <View className="mt-[25] flex-row justify-between items-center">
        <TextInput
          value={input}
          className="bg-white mr-[9] p-[18] rounded-full flex-1"
          placeholder="Type here..."
          onChangeText={(text) => {
            setInput(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            createTask();
            setInput("");
          }}
        >
          <View className="bg-[#0067FF] w-[55] h-[55] rounded-full flex-row justify-center items-center">
            <Image source={require("./assets/images/icons/right_arrow.png")} />
          </View>
        </TouchableOpacity>
      </View>
      <View className="mt-[25]">
        <Text className="text-[#B0B5C7] font-semibold" style={{ fontSize: 14 }}>
          TODAY'S TASKS
        </Text>
      </View>
      <ScrollView>
        <View className="mt-[25] flex-1">
          {/* real data */}
          {tasks?.map((task) => (
            <TouchableOpacity
              key={task?.id}
              onPress={() => {
                setNewState(task?.id);
              }}
            >
              <View className="bg-white w-full flex-row justify-start items-center rounded-md h-[58]">
                <Image
                  source={
                    task?.isDone
                      ? require("./assets/images/icons/task_done.png")
                      : require("./assets/images/icons/task.png")
                  }
                />
                <Text
                  className="w-3/4"
                  style={{
                    textDecorationLine: `${
                      task?.isDone ? "line-through" : "none"
                    }`,
                  }}
                >
                  {task?.name}
                </Text>
                <View className="flex-1 flex-row justify-end items-center">
                  <TouchableOpacity
                    onPress={() => {
                      deleteTask(task.id);
                    }}
                  >
                    <Text className="text-red-500 font-bold">X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* for demo */}
          {/* <View className="bg-white w-full flex-row justify-start items-center rounded-md h-[58]">
          <Image source={require("./assets/images/icons/task_done.png")} />
          <Text style={{ textDecorationLine: "line-through" }}>
            Pay for rent
          </Text>
        </View> */}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}
