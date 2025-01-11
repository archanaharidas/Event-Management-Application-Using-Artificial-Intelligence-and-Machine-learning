import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { IconButton,ProgressBar } from "react-native-paper";
import storage from "../storage";
import { useIsFocused } from "@react-navigation/native";


const Event = ({navigation, route}) => {
    const isFocused = useIsFocused();
    const [event, setEvent] = useState({})
    const[day,setDay]=useState(0)
    const [total, setTotal] = useState(1)
    const [paid, setPaid] = useState(0)

    useEffect(()=>{
        storage.load({
            key:"data"
        }).then((data)=>{
            console.log(data)
            let event=data.find((e)=>e.id==route.params.id)
            setEvent(event)

            let totalAmount=0, paidAmount=0
        Object.keys(event.budget).forEach((key)=>{
            totalAmount+=Number(event.budget[key].expected)
            paidAmount+=Number(event.budget[key].paid)

        })
        setTotal(totalAmount)
        setPaid(paidAmount)

        }).catch((e)=>{
            console.log('error',e.message)
        })
        // setEvent(route.params)
        // console.log(route.params.date)
        setDay(Math.ceil((new Date(route.params.date).getTime()-new Date().getTime())/(86400000)))
    },[isFocused])
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
            
        <Text style={{
            fontSize:24,
            fontWeight:"700",
            marginBottom:12,
            paddingLeft:22

        }}>
            Events
        </Text>
        </View>
        <View style={{
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:"#F78B64",
            width:"full",
            height:80,
            borderRadius:5,
            borderBottomRightRadius:0,
            borderBottomLeftRadius:0,
            marginTop:10,
            elevation:3


        }}>
            <Text style={{
                fontSize:20,
                color:"white",
                fontWeight:"700"
            }}>
                {day} Days to go
            </Text>
        </View>
        <View style={{
            backgroundColor:"#FEF0ED",
            borderBottomLeftRadius:5,
            borderBottomRightRadius:5,
            padding:15,
            elevation:3

        }}>
            <Text style={{
              fontWeight:"700",
                fontSize:18,
                color:"#402D5B",

                
             }}>
                {event.name}
            </Text>
            <Text style={{
                color:"#402D5B",
                fontWeight:"500"
            }}>
                {new Date(event.date).toLocaleDateString()}
            </Text>
            
        </View>
        <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            marginTop:40,
            

        }}>
            <View>
            <IconButton icon={require("../assets/images/money.png")} 
           style={{
            height:65,
            width:90,
            backgroundColor:"#FEF0ED",
            borderRadius:5,
            
           }}
           size={35}
           iconColor="#402D5B"
           onPress={()=>navigation.navigate("Budget",event)}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600",
               color:"#402D5B",
               fontSize:16.2

            }}>
                Budget
            </Text>
            </View>

            <View>
            <IconButton icon={require("../assets/images/todo.png")}
             style={{
                height:65,
                width:90,
                backgroundColor:"#FEF0ED",
                borderRadius:5,
                
               }}
               size={32}
               iconColor="#402D5B"
               onPress={()=>navigation.navigate("Todo",event)}
            >
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600",
               color:"#402D5B",
               fontSize:16.2


            }}>
                To-Do
            </Text>
             </View>  

            <View>
            <IconButton icon={require("../assets/images/notes.png")}
             style={{
                height:65,
                width:90,
                backgroundColor:"#FEF0ED",
                borderRadius:5,
                
               }}
               size={32}
               iconColor="#402D5B"
               onPress={()=>navigation.navigate("Notes",event)}
            >
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600",
               color:"#402D5B",
               fontSize:16.2


            }}>
                Notes
            </Text>
            </View>
        </View>
        <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            marginTop:10,
            

        }}>
            <View style={{

            }}>
            <IconButton icon={require("../assets/images/schedule.png")}
             style={{
                height:65,
                width:90,
                backgroundColor:"#FEF0ED",
                borderRadius:5,
               }}
               size={36}
               iconColor="#402D5B"
               onPress={()=>navigation.navigate("Schedule",event)}
            >
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600",
               color:"#402D5B",
               fontSize:16.2,
               
            //    fontFamily:"Poppins"

            }}>
                Schedule
            </Text>
            </View>
            <View>
            <IconButton icon={require("../assets/images/guest.png")} 
           style={{
            height:65,
            width:90,
            backgroundColor:"#FEF0ED",
            borderRadius:5,
            
           }}
           size={35}
           iconColor="#402D5B"
           onPress={()=>navigation.navigate("Guestlist",event)}
           >
            
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600",
               color:"#402D5B",
               fontSize:16.2


            }}>
                Guestlist
            </Text>
            </View>

            <View>
            <IconButton icon={require("../assets/images/vendors.png")}
             style={{
                height:65,
                width:90,
                backgroundColor:"#FEF0ED",
                borderRadius:5,
                
               }}
               size={35}
               iconColor="#402D5B"
               onPress={()=>navigation.navigate("Vendors",event)}
            >
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600",
               color:"#402D5B",
               fontSize:16.2


            }}>
                Vendors
            </Text>
            </View>

            
            
        </View>
        {event && (<View>
            <View style={{
            marginTop:40,
            padding:12,
            backgroundColor:"#F8F3F9",
            borderRadius:5,
            elevation:2

        }}>
            <Text style={{
                marginBottom:15,
                fontSize:16,
                fontWeight:"700",
                color:"#402D5B",

            }}>
                Budget Progress ({Math.round(Math.min(1,paid/(total || 1))*100)}%)
            </Text>
                <ProgressBar progress={Math.min(1,paid/(total || 1))}
                color="#F78B64"
                style={{
                    height:13,
                    backgroundColor:"white"
                }}
                >

                </ProgressBar>
            </View>
            <View style={{
            marginTop:35,
            padding:12,
            backgroundColor:"#F8F3F9",
            borderRadius:5,
            elevation:2

        }}>
            <Text style={{
                marginBottom:15,
                fontSize:16,
                fontWeight:"700",
                color:"#402D5B",

            }}>
                To-Do Progress ({event.todo ? Math.round(event.todo.filter((e)=>e.check).length/(event.todo.length || 1) *100) : 0}%)
            </Text>
                <ProgressBar progress={event.todo ? event.todo.filter((e)=>e.check).length/(event.todo.length || 1) : 0}
                color="#F78B64"
                style={{
                    height:13,
                    backgroundColor:"white"
                }}
                >

                </ProgressBar>
            </View>
            </View>)}

        </View>
     );
}
 
export default Event;