import { View, Text, ScrollView } from "react-native";
import { IconButton,Modal,Portal,TextInput,Card,Checkbox, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import Timeline from 'react-native-timeline-flatlist';
import { StyleSheet } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import storage from "../storage";

const Schedule = ({navigation, route}) => {
    const [showModal,setShowModal]=useState(false)
    const [time,setTime]=useState(new Date())
    const [showTime,setShowTime]=useState(false)
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    // const [data,setData]=useState([])
    const [event, setEvent] = useState(null)


    const data=[
        {time:new Date(), title:"Event 1", description:"Event 1 Desc"},
        {time:new Date(), title:"Event 2", description:"Event 2 Desc"},
        

    ]

    useEffect(()=>{
        setEvent(route.params)

    },[])
    

    const styles=StyleSheet.create({
        time:{
            fontSize:15,
            color:"#402D5B",
            fontWeight:"600"
            },
        description:{
            color:"#402D5B",
        },
        title:{
            color:"#402D5B",

        }
        
        })
    return ( 
        <View style={{
            padding:30,
            paddingTop: 60,
            backgroundColor:"white",
            height:"100%",
            }}>
        <View style={{
            flexDirection:"row" ,
            alignItems:'flex-end',
            marginLeft:-20   
        }}>
        <IconButton icon="keyboard-backspace"
            onPress={()=>navigation.goBack()}
            >
            
            </IconButton>
            <Text style={{
            fontSize:24,
            fontWeight:"700",
            marginBottom:12,
        }}>
            Schedule
        </Text>
        
        </View>
        
        <Timeline 
            data={(event?.schedule??[]).map((t)=>{
                
                var timeString =t.time // Example time string

                // Split the time string into parts
                var parts = timeString.split(' ');

                // Extract hour, minute, and AM/PM
                var time = parts[0];
                var ampm = parts[1];

                var timeParts = time.split(':');
                var hour = parseInt(timeParts[0], 10);
                var minute = parseInt(timeParts[1], 10);

                // Adjust the hour for PM
                if (ampm.toLowerCase() === 'pm' && hour < 12) {
                    hour += 12;
                }

                // Create a new Date object
                var date = new Date();
                date.setHours(hour);
                date.setMinutes(minute);
                date.setSeconds(0);
                console.log(date.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"}))
                return {...t,time:date}
            }).sort((a,b)=>a.time-b.time).map((t)=>{
                return {...t,time:t.time.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}
            })
            
            
            }
            circleColor="#F78B64"
            separator={true}
            lineColor="#F78B64"
            lineWidth={2}
            circleSize={10}
            timeStyle={styles.time}
            descriptionStyle={styles.description}
            eventContainerStyle={styles.eventContainer}
            titleStyle={styles.title}
            style={{
                marginTop:20
            }}
        >
            
        </Timeline>

        <Portal >
            <Modal visible={showModal} onDismiss={()=>{
                
             setShowModal(false)
            }} contentContainerStyle={{
                backgroundColor:"white",
                padding:20,
                margin:20,
                borderRadius:5,
            }}>
                <View style={{
                    gap:15,
                    
                }}>
                    <Text style={{
                        textAlign:"center",
                        fontSize:22,
                        fontWeight:"700",
                        color:"#402D5B",

                        
                    }}>
                        Schedule Event Timeline
                    </Text>
                    
                <TextInput label="Task Title" mode="outlined"
                value={title}
                onChangeText={(txt)=>{setTitle(txt)}}  
                    style={{fontSize:16,
                        
                    
                    }}
                    theme={{
                        colors:{
                            onSurfaceVariant:'#796299'
                        }
                    }}
                    outlineColor="#402D5B"
                    outlineStyle={{
                        borderWidth:2
                    }}
                    textColor="#402D5B"
                    
                    >

                    </TextInput>

                    <TextInput label="Task Description"  mode="outlined" multiline
                    value={desc}
                    onChangeText={(txt)=>{setDesc(txt)}}
                    style={{fontSize:16,
                        
                        
                    
                    }}
                    theme={{
                        colors:{
                            onSurfaceVariant:'#796299'
                        }
                    }}
                    outlineColor="#402D5B"
                    outlineStyle={{
                        borderWidth:2
                    }}
                    textColor="#402D5B"
                    
                    >

                    </TextInput>
                    
                    {showTime && <DateTimePicker mode="time" value={time} display="spinner" onChange={(t)=>{
                    setTime(new Date(t.nativeEvent.timestamp))
                    
                    setShowTime(false)

                    }}
                    
                    
                    />}

                    <TextInput label="Time"  mode="outlined" multiline
                    // value={note}
                    // onChangeText={(txt)=>{setNote(txt)}}
                    value={time.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})} 
                    style={{fontSize:16,
                        
                        
                    
                    }}
                    theme={{
                        colors:{
                            onSurfaceVariant:'#796299'
                        }
                    }}
                    outlineColor="#402D5B"
                    outlineStyle={{
                        borderWidth:2
                    }}
                    textColor="#402D5B"
                    right={<TextInput.Icon icon={'clock'}color="#796299"
                    onPress={
                        ()=>{setShowTime(true)}
                    }
                    
                    ></TextInput.Icon>}>
                    
                        
                    </TextInput>
                    
                    <Button mode="contained" onPress={()=>{
                      storage.load({
                        key:"data"
                        }).then((data)=>{
            
                        const ind=data.findIndex((e)=>e.id==event.id)
                        data[ind].schedule.push({
                            id:Date.now().toString(36) + Math.random().toString(36).substr(2),
                            title:title,
                            description:desc,
                            time:time.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})
                        })
                            
                        
                        setEvent(data[ind])
                        storage.save({
                            key:"data",
                            data:data
                        
                        }).then(()=>{
                            setTitle("")
                            setDesc("")
                            setTime(new Date())
                            setShowModal(false)
                        }).catch((e)=>{
                            console.log('error',e.message)
                        })
                        
                        }).catch((e)=>{
                            console.log('error',e.message)
                        })
      
                    }}
                    style={{
                    borderRadius:5,
                    backgroundColor:'#402D5B',
                    width:175,
                    alignSelf:"center",
                    
                }}
                    labelStyle={{
                        fontSize:18,
                    }}
                >
                    Add
                </Button>
                </View>
            </Modal>
        </Portal>

        
        <IconButton icon="plus" mode="contained" iconColor="white" onPress={()=>setShowModal(true)} style={{
            position:"absolute",
            // display:events.length?"flex":"none",
            bottom:20,
            right:20,
            borderRadius:5,
            backgroundColor:'#402D5B',
            height:50,
            width:50
            
        }}>
            
            </IconButton>
        
        
    </View>
   
   
     );
}
 
export default Schedule;