import { View } from "react-native";
import { useEffect, useState } from "react";
import { Button,IconButton,Text, TextInput,Modal,Portal,Card} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import storage from "../storage";
const Notes = ({navigation, route}) => {
    const [search,setSearch]=useState("")
    const [showModal,setShowModal]=useState(false)
    const [event, setEvent] = useState(null)
    const [title,setTitle]=useState("")
    const [note,setNote]=useState("")
    const [editNote,setEditNote]=useState({})
    const [showEditModal,setShowEditModal]=useState(false)



    useEffect(()=>{
        setEvent(route.params)
        
    },[])
    return ( 
        <View style={{
            // padding:30,
            paddingTop: 60,
            backgroundColor:"white",
            height:"100%",
            }}>
        <View style={{
            paddingLeft:30,
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
            Notes
        </Text>
            </View>
            
            
        <ScrollView>
        <View style={{
            flexDirection:"row" ,
            marginBottom:20,
            marginTop:10,
            flexWrap:"wrap",
            gap:15,
            justifyContent:"center"
            
        }}>
        
        {event && event.notes.map((n,i)=>(
            
            <Card key={i}
            onPress={()=>{
                setEditNote(n)
                setShowEditModal(true)
            }}
            style={{
                // marginBottom:15,
                backgroundColor:"#FEF0ED",
                elevation:0,
                borderRadius:8,
                position:'relative',
                height:150,
                width:150
            }}
            mode="elevated">
            <Card.Content>
            <Text style={{
                fontWeight:"700",
                color:"#402D5B",

               }}>
                {n.title}
               </Text>
                <Text numberOfLines={6} style={{
                    overflow:"hidden",
                    color:"#402D5B",

                    
                }}>
                    {n.note}
                </Text>
            </Card.Content>

        </Card>
        ))}
        </View>
        </ScrollView>
        <Portal >
            <Modal visible={showModal} onDismiss={()=>{
                
                setTitle("")
                setNote("")
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
                        Add a Note
                    </Text>
                    
                <TextInput label="Title" mode="outlined"
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
                    <TextInput label="Note"  mode="outlined" multiline
                    value={note}
                    onChangeText={(txt)=>{setNote(txt)}}
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
                    if(note.trim().length==0 || title.trim().length==0)
                    return

                    storage.load({
                        key:"data"
                        }).then((data)=>{
            
                        const ind=data.findIndex((e)=>e.id==event.id)
                        data[ind].notes.push({
                            id:Date.now().toString(36) + Math.random().toString(36).substr(2),
                            title:title,
                            note:note,
                        })
                            
                        
                        setEvent(data[ind])
                        storage.save({
                            key:"data",
                            data:data
                        
                        }).then(()=>{
                            setTitle("")
                            setNote("")
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
        

        <Portal >
            <Modal visible={showEditModal} onDismiss={()=>{
                
                setShowEditModal(false)
                
            }} contentContainerStyle={{
                backgroundColor:"#FEF0ED",
                elevation:0,
                borderRadius:8,
                padding:20,
                margin:20,
                width:"80%",
                
            }}
            style={{
                alignItems:"center"
            }}
            >
                <View style={{
                    gap:15,
                    
                }}>
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}>
                <Text style={{
                fontWeight:"700"
               }}>
                {editNote.title}
               </Text>
               <IconButton mode="contained" icon={"delete"} onPress={()=>{
                        storage.load({
                            key:"data"
                            }).then((data)=>{
        
                            const ind=data.findIndex((e)=>e.id==event.id)
                            
                            data[ind].notes=data[ind].notes.filter((e)=>e.id!=editNote.id)
                                
                            
                            setEvent(data[ind])
                            setShowEditModal(false)
                            storage.save({
                                key:"data",
                                data:data
                            
                            }).then(()=>{}).catch((e)=>{
                                console.log('error',e.message)
                            })
                            
                            }).catch((e)=>{
                                console.log('error',e.message)
                            })
                    }}
                        style={{
                            backgroundColor:"#FEF0ED",
                            
                        }}
                        size={20}
                        >
                            
                        </IconButton>
               </View>
                <Text style={{
                    
                    
                }}>
                    {editNote.note}
                </Text>
                    
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
 
export default Notes;