import { useEffect, useState } from "react";
import { View,Image,ScrollView} from "react-native";
import { Button,IconButton,Text, TextInput,Modal,Portal,Card} from "react-native-paper";
import { DatePickerModal, DateTimePicker } from "react-native-paper-dates";
import storage from "../storage";

const Home = ({navigation}) => {
    const [search,setSearch]=useState("")
    const [events,setevents]=useState([])
    const [searchEvent,setSearchEvent]=useState([])
    const [showModal,setShowModal]=useState(false)
    const [showDate,setShowDate] = useState(false)
    const [date, setDate] = useState(new Date())
    const [name,setName]= useState("")
    const [location,setLocation]= useState("")
    const [timeoutid,setTimeoutid]=useState(null)
    
    useEffect(()=>{
        storage.load({
            key:"data"
        }).then((data)=>{
            console.log(data)
            setevents(data)
            setSearchEvent(data)
        }).catch((e)=>{
            console.log('error',e.message)
        })
    },[])
    return ( 
        
        <View style={{
            padding:30,
            paddingTop: 60,
            backgroundColor:"white",
            height:"100%",
            }}>
        <Text style={{
            fontSize:24,
            fontWeight:"700",
            marginBottom:12,
            
        }}>
            Home
        </Text>
        <TextInput label="Search" mode="outlined" value={search} onChangeText={text=>{setSearch(text)
        setSearchEvent(events.filter((e)=>e.name.toLowerCase().startsWith(text.toLowerCase())))
        }}
        
        style={{fontSize:18,
            marginBottom:15,
            
        
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
        textColor="#796299"
        
        left={<TextInput.Icon icon={'magnify'}color="#796299"></TextInput.Icon>}>

        </TextInput>
        {
            events.length?(
                <ScrollView >
                    {
                        (searchEvent??[]).map((event,i)=>(

                            <Card onPress={()=>navigation.navigate('Event',event)} key={i} style={{
                                marginBottom:15,
                                backgroundColor:"#FEF0ED",
                                elevation:0,
                                borderRadius:8,
                                position:'relative'

                            }}
                            mode="elevated"
                            >
                                
                                <Card.Content>
                                <Text style={{
                                    fontWeight:"700",
                                    fontSize:18,
                                    color:"#402D5B",

                                }}>
                                        {event.name}
                                    </Text>
                                    <Text style={{
                                    color:"#402D5B",
                                    fontWeight:"600"

                                    }}>
                                        {new Date(event.date).toLocaleDateString()}
                                    </Text>
                                    <Text style={{
                                        color:"#402D5B",

                                    }}>
                                        {event.location}
                                    </Text>
                                    <IconButton mode="contained" icon={"delete"}
                                    style={{
                                        position:'absolute',
                                        bottom:20,
                                        right:5,
                                        backgroundColor:"#FEF0ED"
                                    }}
                                    onPress={()=>{
                                        console.log(event)
                                        storage.save({
                                            key:"data",
                                            data:events.filter((e)=>e.id!=event.id)
                
                                        }).then(()=>{
                                            setevents(events.filter((e)=>e.id!=event.id))
                                            setSearchEvent(searchEvent.filter((e)=>e.id!=event.id))
                                            console.log("event saved")
                                        }).catch((e)=>{
                                            console.log("error",e.message)
                                        })
                
                                    }}
                                    >
                                    
                                    </IconButton>
                                </Card.Content>
                            </Card>
                        ))
                    }
                </ScrollView>
            ):(
                <View style={{
                    alignItems:"center",
                    // justifyContent:"center",
                }}>
                
                <Image source={require("../assets/images/ghost.png")}
                style={{
                    marginTop:80
                }}
                >
                    
                </Image>
                <Text style={{
                    fontSize:23,
                    fontWeight:"700",
                    marginTop:30,
                }}>
                    No events to see!
                </Text>
                <Text style={{
                    marginTop:12,
                    textAlign:"center",
                    
                }}>
                You have not yet planned any events.{"\n"}
                Create new events to see them on 
                your home page 
                </Text>
                <Button mode="contained" onPress={()=>setShowModal(true)}
                style={{
                    borderRadius:5,
                    backgroundColor:'#402D5B',
                    marginTop:18,
                }}
                    
                >
                    Create new event
                </Button>
                </View>

            )
        }
        <Portal >
            <Modal visible={showModal} onDismiss={()=>{
                setDate(new Date())
                setShowModal(false)
                setName("")
                setLocation("")
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
                        
                    }}>
                        Create an Event
                    </Text>
                    
                <TextInput label="Event Name" mode="outlined" value={name} onChangeText={text=>setName(text)}
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
                    <TextInput label="Event Date" mode="outlined" value={date.toLocaleDateString()}
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
                    right={<TextInput.Icon icon={'calendar'}color="#796299" onPress={()=>setShowDate(true)}></TextInput.Icon>}
                    >

                    </TextInput>
                    <DatePickerModal locale="en" label="Event Date" mode='single' visible={showDate} onConfirm={(data)=>{
                        console.log(data)
                        setShowDate(false)
                        setDate(data?.date??new Date())
                    }} onDismiss={()=>{
                        setShowDate(false)
                    }} ></DatePickerModal>
                    <TextInput label="Event Location" mode="outlined" value={location} onChangeText={text=>setLocation(text)}
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
                    <Button mode="contained" onPress={()=>{
                        if(name.trim().length==0 || location.trim().length==0)
                        {
                            return
                        }
                        let event={
                            id:Date.now().toString(36) + Math.random().toString(36).substr(2),
                            name:name,
                            date:date,
                            location:location,
                            notes:[],
                            todo:[],
                            guestlist:[],
                            vendors:[],
                            schedule:[],
                            budget:{
                                Gifts:{expected:"0",paid:"0"},
                                Food:{expected:"0",paid:"0"},
                                Music:{expected:"0",paid:"0"},
                                Flowers:{expected:"0",paid:"0"},
                                Photo:{expected:"0",paid:"0"},
                                Accomodation:{expected:"0",paid:"0"},
                                Transportation:{expected:"0",paid:"0"},
                                Misc:{expected:"0",paid:"0"},
                            }
                        }
                        setShowModal(false)
                        setName("")
                        setLocation("")
                        setDate(new Date())

                        storage.save({
                            key:"data",
                            data:[...events,event]

                        }).then(()=>{
                            setevents([...events,event])
                            setSearchEvent([...events,event])
                            setSearch("")
                            console.log("event saved")
                        }).catch((e)=>{
                            console.log("error",e.message)
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
                    Create
                </Button>
                </View>
            </Modal>
        </Portal>
        <IconButton icon="plus" mode="contained" iconColor="white" onPress={()=>setShowModal(true)} style={{
            position:"absolute",
            display:events.length?"flex":"none",
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
 
export default Home ;