import { View, Text, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { IconButton, TextInput, Card, Checkbox } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import storage from "../storage";
const Todo = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState(false);
  const [event, setEvent] = useState(null);
  const [task, setTask] = useState("");
  useEffect(() => {
    setEvent(route.params);
  }, []);

  return !event ? (
    <View></View>
  ) : (
    <View
      style={{
        padding: 30,
        paddingTop: 60,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          marginLeft: -20,
        }}
      >
        <IconButton
          icon="keyboard-backspace"
          onPress={() => navigation.goBack()}
        ></IconButton>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginBottom: 12,
          }}
        >
          To-Do List
        </Text>
      </View>

      <ScrollView
        style={{
          marginBottom: 50,
        }}
      >
        {event.todo
          .filter((e) => !e.check)
          .map((t, i) => (
            <Card
              key={i}
              style={{
                marginBottom: 15,
                backgroundColor: "#FEF0ED",
                elevation: 0,
                borderRadius: 8,
                position: "relative",
                height: 70,
              }}
              mode="elevated"
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  status={t.check ? "checked" : "unchecked"}
                  onPress={() => {
                    storage
                      .load({
                        key: "data",
                      })
                      .then((data) => {
                        const ind = data.findIndex((e) => e.id == event.id);
                        const tind = data[ind].todo.findIndex(
                          (e) => e.id == t.id
                        );
                        data[ind].todo[tind].check =
                          !data[ind].todo[tind].check;

                        setEvent(data[ind]);
                        storage
                          .save({
                            key: "data",
                            data: data,
                          })
                          .then(() => {})
                          .catch((e) => {
                            console.log("error", e.message);
                          });
                      })
                      .catch((e) => {
                        console.log("error", e.message);
                      });
                  }}
                ></Checkbox>
                <Text
                  style={{
                    fontSize: 16,
                    textDecorationLine: t.check ? "line-through" : "none",

                    // textAlignVertical:"center"
                  }}
                >
                  {t.description}
                </Text>
                <IconButton
                  mode="contained"
                  icon={"delete"}
                  onPress={() => {
                    storage
                      .load({
                        key: "data",
                      })
                      .then((data) => {
                        const ind = data.findIndex((e) => e.id == event.id);

                        data[ind].todo = data[ind].todo.filter(
                          (e) => e.id != t.id
                        );

                        setEvent(data[ind]);
                        storage
                          .save({
                            key: "data",
                            data: data,
                          })
                          .then(() => {})
                          .catch((e) => {
                            console.log("error", e.message);
                          });
                      })
                      .catch((e) => {
                        console.log("error", e.message);
                      });
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    backgroundColor: "#FEF0ED",
                  }}
                ></IconButton>
              </Card.Content>
            </Card>
          ))}
        {event.todo
          .filter((e) => e.check)
          .map((t, i) => (
            <Card
              key={i}
              style={{
                marginBottom: 15,
                backgroundColor: "#FEF0ED",
                elevation: 0,
                borderRadius: 8,
                position: "relative",
                height: 70,
              }}
              mode="elevated"
            >
              <Card.Content
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  status={t.check ? "checked" : "unchecked"}
                  onPress={() => {
                    storage
                      .load({
                        key: "data",
                      })
                      .then((data) => {
                        const ind = data.findIndex((e) => e.id == event.id);
                        const tind = data[ind].todo.findIndex(
                          (e) => e.id == t.id
                        );
                        data[ind].todo[tind].check =
                          !data[ind].todo[tind].check;

                        setEvent(data[ind]);
                        storage
                          .save({
                            key: "data",
                            data: data,
                          })
                          .then(() => {})
                          .catch((e) => {
                            console.log("error", e.message);
                          });
                      })
                      .catch((e) => {
                        console.log("error", e.message);
                      });
                  }}
                ></Checkbox>
                <Text
                  style={{
                    fontSize: 16,
                    textDecorationLine: t.check ? "line-through" : "none",

                    // textAlignVertical:"center"
                  }}
                >
                  {t.description}
                </Text>
                <IconButton
                  mode="contained"
                  icon={"delete"}
                  onPress={() => {
                    storage
                      .load({
                        key: "data",
                      })
                      .then((data) => {
                        const ind = data.findIndex((e) => e.id == event.id);

                        data[ind].todo = data[ind].todo.filter(
                          (e) => e.id != t.id
                        );

                        setEvent(data[ind]);
                        storage
                          .save({
                            key: "data",
                            data: data,
                          })
                          .then(() => {})
                          .catch((e) => {
                            console.log("error", e.message);
                          });
                      })
                      .catch((e) => {
                        console.log("error", e.message);
                      });
                  }}
                  style={{
                    position: "absolute",
                    right: 0,
                    backgroundColor: "#FEF0ED",
                  }}
                ></IconButton>
              </Card.Content>
            </Card>
          ))}
      </ScrollView>
      <IconButton
        icon="plus"
        mode="contained"
        iconColor="white"
        onPress={() => {
          console.log("button pressed", task);
          if (task.trim().length == 0) return;
          storage
            .load({
              key: "data",
            })
            .then((data) => {
              const ind = data.findIndex((e) => e.id == event.id);
              data[ind].todo.push({
                id:
                  Date.now().toString(36) +
                  Math.random().toString(36).substr(2),
                description: task,
                check: false,
              });

              setEvent(data[ind]);
              storage
                .save({
                  key: "data",
                  data: data,
                })
                .then(() => {
                  setTask("");
                  Keyboard.dismiss();
                })
                .catch((e) => {
                  console.log("error", e.message);
                });
            })
            .catch((e) => {
              console.log("error", e.message);
            });
        }}
        style={{
          position: "absolute",
          // display:events.length?"flex":"none",
          bottom: 20,
          right: 20,
          borderRadius: 5,
          backgroundColor: "#402D5B",
          height: 50,
          width: 50,
        }}
      ></IconButton>
      <TextInput
        label="Add a new Task"
        mode="outlined"
        value={task}
        onChangeText={(text) => {
          setTask(text);
          console.log(text);
        }}
        outlineColor="#402D5B"
        style={{
          fontSize: 18,
          marginBottom: 15,
          width: 290,
          height: 50,
          position: "absolute",
          bottom: 10,
          left: 20,
        }}
        theme={{
          colors: {
            onSurfaceVariant: "#796299",
          },
        }}
        activeOutlineColor="#402D5B"
        outlineStyle={{
          borderWidth: 1.8,
        }}
        textColor="#796299"
      ></TextInput>
    </View>
  );
};

export default Todo;
