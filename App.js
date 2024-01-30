import axios from "axios";
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

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer f48c0103dd25e3d9a8cf44ea30cbe7ad42b135cc2d23b04746a877b76da6f4c3764ce9701ebebd2aabf1048ad1e0b16bc5a55d670c5e5c3e16265523b41379492c52b3b7bf1f6d1e090d7743bf46fd43e7fbde97dcd632d9fedb3600c6b4c917289567ad96179837be8f5c24c97aecf8477d592578ee7162ebb27d087d0e7dc4",
  },
};

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const createTask = async () => {
    axios
      .post(
        "http://10.0.2.2:1337/api/tasks",
        {
          data: {
            name: input,
          },
        },
        config
      )
      .then((res) => {
        getData();
      });
  };

  const setNewState = (id, isDone) => {
    axios
      .put(
        `http://10.0.2.2:1337/api/tasks/${id}`,
        {
          data: {
            isDone: isDone,
          },
        },
        config
      )
      .then((res) => {
        getData();
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://10.0.2.2:1337/api/tasks/${id}`, config).then((res) => {
      getData();
    });
  };

  const getData = async () => {
    axios
      .get("http://10.0.2.2:1337/api/tasks", config)
      .then((res) => {
        setTasks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                setNewState(task?.id, !task?.attributes?.isDone);
              }}
            >
              <View className="bg-white w-full flex-row justify-start items-center rounded-md h-[58]">
                <Image
                  source={
                    task?.attributes?.isDone
                      ? require("./assets/images/icons/task_done.png")
                      : require("./assets/images/icons/task.png")
                  }
                />
                <Text
                  className="w-3/4"
                  style={{
                    textDecorationLine: `${
                      task?.attributes?.isDone ? "line-through" : "none"
                    }`,
                  }}
                >
                  {task?.attributes?.name}
                </Text>
                <View className="flex-1 flex-row justify-end items-center">
                  <TouchableOpacity
                    onPress={() => {
                      deleteTask(task?.id);
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
