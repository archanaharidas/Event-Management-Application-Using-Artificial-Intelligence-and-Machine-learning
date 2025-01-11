import { Text, View, ScrollView } from "react-native";
import {
  Button,
  IconButton,
  TextInput,
  Modal,
  Portal,
  Card,
  Surface,
  Avatar,
} from "react-native-paper";
import storage from "../storage";
import { useIsFocused } from "@react-navigation/native";

import { useEffect, useState } from "react";
const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [newusername, setNewusername] = useState("");

  const [events, setevents] = useState([]);
  const isFocused = useIsFocused();
  const [username, setUsername] = useState("Guest");
  useEffect(() => {
    storage
      .load({
        key: "data",
      })
      .then((data) => {
        setevents(data);
      })
      .catch((e) => {
        console.log("error", e.message);
      });

    storage
      .load({
        key: "user",
      })
      .then((data) => {
        setUsername(data?.username ?? "Guest");
      })
      .catch((e) => {
        console.log("error", e.message);
      });
  }, [isFocused]);
  return (
    <View
      style={{
        // padding:30,
        paddingTop: 60,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View
        style={{
          paddingLeft: 30,
          flexDirection: "row",
          alignItems: "flex-end",
          marginLeft: -20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            marginBottom: 12,
            paddingLeft: 20,
          }}
        >
          Profile
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Avatar.Text
          size={150}
          label={username
            .split(" ")
            .slice(0, 2)
            .map((u) => u[0].toUpperCase())
            .join("")}
        ></Avatar.Text>
        <Text
          style={{
            paddingTop: 20,
            fontSize: 18,
            fontWeight: "700",
            color: "#402D5B",
          }}
        >
          {username}
        </Text>
        <Card
          style={{
            marginTop: 20,
            marginBottom: 15,
            backgroundColor: "#FEF0ED",
            elevation: 0,
            borderRadius: 7,
            width: "80%",
          }}
        >
          <Card.Content
            style={{
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#402D5B",
                  textAlign: "center",
                }}
              >
                No. of conducted Events{"\n"}
                {"\n"}
                {events.filter((e) => new Date(e.date) < new Date()).length}
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#402D5B",
                  textAlign: "center",
                }}
              >
                No. of ongoing Events{"\n"}
                {"\n"}
                {events.filter((e) => new Date(e.date) >= new Date()).length}
              </Text>
            </View>
          </Card.Content>
        </Card>
        <Button
          mode="contained"
          onPress={() => {
            setShowModal(true);
          }}
          style={{
            borderRadius: 5,
            backgroundColor: "#402D5B",
            width: 190,
            alignSelf: "center",
          }}
          labelStyle={{
            fontSize: 16,
          }}
        >
          Change Username
        </Button>
        <Portal>
          <Modal
            visible={showModal}
            onDismiss={() => {
              setTitle("");
              setNote("");
              setShowModal(false);
            }}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                gap: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 22,
                  fontWeight: "700",
                  color: "#402D5B",
                }}
              >
                Add a Note
              </Text>

              <TextInput
                label="Username"
                mode="outlined"
                value={newusername}
                onChangeText={(txt) => {
                  setNewusername(txt);
                }}
                style={{ fontSize: 16 }}
                theme={{
                  colors: {
                    onSurfaceVariant: "#796299",
                  },
                }}
                outlineColor="#402D5B"
                outlineStyle={{
                  borderWidth: 2,
                }}
                textColor="#402D5B"
              ></TextInput>

              <Button
                mode="contained"
                onPress={() => {
                  if (newusername.trim().length == 0) return;

                  storage
                    .load({
                      key: "user",
                    })
                    .then((data) => {
                      data.username = newusername;

                      storage
                        .save({
                          key: "user",
                          data: data,
                        })
                        .then(() => {
                          setUsername(newusername);
                          setNewusername("");
                          setShowModal(false);
                        })
                        .catch((e) => {
                          console.log("error", e.message);
                        });
                    })
                    .catch((e) => {
                      console.log("error", e.message);
                      storage
                        .save({
                          key: "user",
                          data: {
                            username: newusername,
                          },
                        })
                        .then(() => {
                          setUsername(newusername);
                          setNewusername("");
                          setShowModal(false);
                        })
                        .catch((e) => {
                          console.log("error", e.message);
                        });
                    });
                }}
                style={{
                  borderRadius: 5,
                  backgroundColor: "#402D5B",
                  width: 175,
                  alignSelf: "center",
                }}
                labelStyle={{
                  fontSize: 18,
                }}
              >
                Add
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </View>
  );
};

export default Profile;
