import { View, Text, ScrollView } from "react-native";
import { IconButton,Modal,Portal,TextInput,Card,Checkbox, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import * as Contacts from 'expo-contacts';
import storage from "../storage";

const Guestlist = ({navigation, route}) => {
    const [search,setSearch]=useState("")
    const [contacts,setContacts]=useState([])
    const [searchContacts,setSearchContacts]=useState([])
    const [showModal,setShowModal]=useState(false)
    const [event, setEvent] = useState(null)
    const [selectedContacts,setSelectedContacts]=useState([])
    const t=false

    useEffect(()=>{
        setSearchContacts(contacts.filter((c)=>c.name.startsWith(search)))

    },[contacts])

    useEffect(()=>{
        (async()=>{
        setEvent(route.params)
            
           const {status}=await Contacts.requestPermissionsAsync()
           if (status=="granted")
           {
            const {data}=await Contacts.getContactsAsync()
           const temp=data.slice(0,25).map((c)=>{c.check=route.params.guestlist.map((e)=>e.phoneNumbers[0].number).includes(c.phoneNumbers[0].number)
            return c
            })
            setContacts(temp)
            // setSearchContacts(temp)
            console.log(data[1])

           } 
        })()        
    },[])
    return !event ? (<View></View>):( 
        
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
            Guestlist
        </Text>
        
            </View>
        <ScrollView>
            {event.guestlist.map((g,i)=>(
                <Card key={i}
                style={{
                    marginBottom:15,
                    backgroundColor:"#FEF0ED",
                    elevation:0,
                    borderRadius:8,
                    position:'relative',
                    height:70,
                    // width:250,
                    // alignSelf:"center"
                    
                }}
                >
                    <Card.Content>
                        <Text style={{
                            fontWeight:"700",
                            fontSize:16,
                            color:"#402D5B",

                        }}>
                            {g.name} 
                            
                        </Text>
                        <Text style={{
                             color:"#402D5B",

                        }}>
                            {g.phoneNumbers[0].number}
                            </Text>
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
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
            
        <Portal >
            <Modal visible={showModal} onDismiss={()=>{
                
                setShowModal(false)
                
            }} contentContainerStyle={{
                backgroundColor:"white",
                elevation:0,
                borderRadius:8,
                padding:20,
                margin:20,
                // width:"80%",
                // maxHeight:"80%",
                // alignItems:"flex-start"
            }}
            style={{
                // alignItems:"center"

            }}

            >
            
            {/* <Text style={{
                fontSize:16
            }}>
                Select Contacts 
            </Text> */}
            <View>
            <TextInput label="Search" mode="outlined" value={search} onChangeText={text=>{setSearch(text)
        console.log(text)
        setSearchContacts(contacts.filter((c)=>c.name.startsWith(text)))
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
            <View>
            <ScrollView style={{
                maxHeight:300,
                marginBottom:30
            }}>
            {searchContacts.map((c,i)=>(
                <Card key={i} style={{
                    marginBottom:15,
                    backgroundColor:"#FEF0ED",
                    elevation:0,
                    borderRadius:8,
                    // position:'relative',
                    height:70,
                    paddingRight:20
                    
                }}
                mode="elevated">
                <Card.Content style={{
                    flexDirection:"row",
                    alignItems:"center",
                }}>
                <Checkbox status={c.check ? 'checked' : 'unchecked'}
                    onPress={() => {
                        const ind=contacts.findIndex((e)=>e.phoneNumbers[0].number==c.phoneNumbers[0].number)
                        // let tcontact=contacts
                        // tcontact[ind].check=!tcontact[ind].check
                        // let tsearchContact=searchContacts
                        // tsearchContact[i].check=!tsearchContact[i].check
                        setContacts(contacts.map((e)=>{
                            if (e.phoneNumbers[0].number==c.phoneNumbers[0].number)
                            {
                                e.check=!e.check
                            }
                            return e
                        }))
                        // setSearchContacts(searchContacts.map((e)=>{
                        //     if (e.phoneNumbers[0].number==c.phoneNumbers[0].number)
                        //     {
                        //         if (e.check==false)
                        //             e.check=true
                        //         else
                        //             e.check=false
                        //         console.log(e.check)
                        //     }
                        //     return e
                        // }))
                    }}>
    
                    </Checkbox>
                    <Text style={{
                        fontSize:16,
                        
                        
                        // textAlignVertical:"center"
                    }}>
                        {c.name} ({c.phoneNumbers[0].number}) 
                    </Text>
                    
                        
                    
                </Card.Content>
    
                </Card>
            ))}
            </ScrollView>
            <Button mode="contained" onPress={()=>{
                const selectedContacts=contacts.filter((e)=>e.check)

                    // if(note.trim().length==0 || title.trim().length==0)
                    // return

                    storage.load({
                        key:"data"
                        }).then((data)=>{
            
                        const ind=data.findIndex((e)=>e.id==event.id)
                        data[ind].guestlist=selectedContacts
                             
                        setEvent(data[ind])
                        storage.save({
                            key:"data",
                            data:data
                        
                        }).then(()=>{
                            
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
            </View>
            </Modal>
        </Portal>
        </View>


     );
}
 
export default Guestlist;