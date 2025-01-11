import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { v4 as uuidv4 } from 'uuid'; 
import Constants from "expo-constants";
const uri = Constants?.expoConfig?.hostUri
  ? Constants.expoConfig.hostUri.split(`:`).shift().concat(`:5000`)
  : `http://127.0.0.1:5000/chats`;

const Chatbot = () => {
  const [chats, setChats] = useState([]);
  // {
  // question: "",
  // answer: "",
  // } array of this object
  const [question, setQuestion] = useState('');
 
  const handleSendMessage = async () => {
    // Send the user's message to the Flask API
    const uniqueId = uuidv4();
    try {
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question
        }),
      });
      
      console.log(response)
     
      if (response.ok) {
        const data = await response.json();
        setChats([...chats, data]);
      } else {
        // Handle errors, e.g., show an error message
       
        const error = { question, answer: 'Something went wrong', id: uniqueId };
        setChats([...chats, error])
      }
    } catch (err) {
      // Handle errors, e.g., show an error message
      
      const error = { question, answer: 'Something went wrong', id: uniqueId };
      setChats([...chats, error])
    }

    setQuestion('');
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1, padding: 16 }}
      >
        {chats.map((chat) => (
         
          <React.Fragment key={chat.id}>
            {chat.question && (
            <View
              
              style={{
                alignSelf: 'flex-end',
                backgroundColor: '#EFEFEF',
                borderRadius: 8,
                padding: 8,
                margin: 4,
              }}
            >
              <Text style={{ color: 'black' }}>
                {chat.question}
              </Text>
            </View>
            )}
            {chat.answer && (
            <View
              
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#F0F0F0',
                borderRadius: 8,
                padding: 8,
                margin: 4,
              }}
            >
              <Text style={{ color: 'black' }}>
                {chat.answer}
              </Text>
            </View>
            )}
            </React.Fragment>
          
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, padding: 8 }}
          placeholder="Type a message..."
          value={question}
          onChangeText={(text) => setQuestion(text)}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

export default Chatbot;
