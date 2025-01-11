import { View } from "react-native";
import { Button,IconButton,Text, TextInput,Modal,Portal,Card} from "react-native-paper";
import { useEffect, useState } from "react";
import storage from "../storage";
const Budget = ({navigation, route}) => {
    const [showModal,setShowModal]=useState(false)
    const [budget,setBudget]=useState("")
    const [amount,setAmount]=useState("")
    const [btype,setBtype]=useState("Gifts")
    const [event, setEvent] = useState(null)
    const [total, setTotal] = useState(0)
    const [paid, setPaid] = useState(0)
    
    useEffect(()=>{
        setEvent(route.params)
        
    },[])
    useEffect(()=>{
        if (!event) 
            return
        let totalAmount=0, paidAmount=0
        Object.keys(event.budget).forEach((key)=>{
            totalAmount+=Number(event.budget[key].expected)
            paidAmount+=Number(event.budget[key].paid)

        })
        setTotal(totalAmount)
        setPaid(paidAmount)

    },[event])
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
            Budget
        </Text>
            </View>

            <View style={{
            flexDirection:"row",
            justifyContent:"center",
            gap:80,
            marginTop:10,
            // marginLeft:30
             }}>
                <View>
            <IconButton 
            icon={require("../assets/images/giftacc.png")} 
           style={{
            height:75,
            width:75,
            backgroundColor:"#402D5B",
            borderRadius:5,
            borderColor:"white"
            
           }}
           size={35}
           iconColor="white"
           onPress={()=>{
            setBtype("Gifts")
            setBudget(event.budget.Gifts.expected)
            setAmount(event.budget.Gifts.paid)
            setShowModal(true)
            
           }}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600"
            }}>
                Gifts
            </Text>
            
                </View>
                <View>
                <IconButton icon={require("../assets/images/fooddrinks.png")} 
           style={{
            height:75,
            width:75,
            backgroundColor:"#402D5B",
            borderRadius:5,
            borderColor:"white"
            
           }}
           size={35}
           iconColor="white"
           onPress={()=>{
            setBtype("Food")
            setBudget(event.budget.Food.expected)
            setAmount(event.budget.Food.paid)
            setShowModal(true)
            
           }}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600"
            }}>
                Food & Drinks
            </Text>
            
                </View>
            
                
            </View>
            <View style={{
            flexDirection:"row",
            justifyContent:"center",
            gap:80,
            marginTop:10,
            // marginLeft:30
             }}>
                <View>
                <IconButton icon={require("../assets/images/musicshow.png")} 
           style={{
            height:75,
            width:75,
            backgroundColor:"#402D5B",
            borderRadius:5,
            borderColor:"white"
            
           }}
           size={35}
           iconColor="white"
           onPress={()=>{
            setBtype("Music")
            setBudget(event.budget.Music.expected)
            setAmount(event.budget.Music.paid)
            setShowModal(true)
            
           }}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600"
            }}>
                Music & Show
            </Text>
            
                </View>
                <View>
                <IconButton icon={require("../assets/images/flowerdec.png")} 
           style={{
            height:75,
            width:75,
            backgroundColor:"#402D5B",
            borderRadius:5,
            borderColor:"white"
            
           }}
           size={35}
           iconColor="white"
           onPress={()=>{
            setBtype("Flowers")
            setBudget(event.budget.Flowers.expected)
            setAmount(event.budget.Flowers.paid)
            setShowModal(true)
            
           }}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600"
            }}>
                Flowers
            </Text>
            
                </View>
            
                </View>

            <View style={{
            flexDirection:"row",
            justifyContent:"center",
            gap:80,
            marginTop:10,
            // marginLeft:30
             }}>
                <View>
                <IconButton icon={require("../assets/images/camera-video.png")} 
           style={{
            height:75,
            width:75,
            backgroundColor:"#402D5B",
            borderRadius:5,
            borderColor:"white"
            
           }}
           size={35}
           iconColor="white"
           onPress={()=>{
            setBtype("Photo")
            setBudget(event.budget.Photo.expected)
            setAmount(event.budget.Photo.paid)
            setShowModal(true)
            
           }}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600"
            }}>
                Photo & Video
            </Text>
            
                </View>
                <View>
                <IconButton icon={require("../assets/images/bed-single-01.png")} 
           style={{
            height:75,
            width:75,
            backgroundColor:"#402D5B",
            borderRadius:5,
            borderColor:"white"
            
           }}
           size={35}
           iconColor="white"
           onPress={()=>{
            setBtype("Accomodation")
            setBudget(event.budget.Accomodation.expected)
            setAmount(event.budget.Accomodation.paid)
            setShowModal(true)
            
           }}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600"
            }}>
                Accomodation
            </Text>
            
                </View>
            
                </View>

                <View style={{
            flexDirection:"row",
            justifyContent:"center",
            gap:80,
            marginTop:10,
            // marginLeft:30
             }}>
                <View>
                <IconButton icon={require("../assets/images/bus-01.png")} 
           style={{
            height:75,
            width:75,
            backgroundColor:"#402D5B",
            borderRadius:5,
            
            
           }}
           size={35}
           iconColor="white"
           onPress={()=>{
            setBtype("Transportation")
            setBudget(event.budget.Transportation.expected)
            setAmount(event.budget.Transportation.paid)
            setShowModal(true)
            
           }}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600"
            }}>
                Transportation
            </Text>
            
                </View>
                <View>
                <IconButton icon={require("../assets/images/more-horizontal-square-01.png")} 
           style={{
            height:75,
            width:75,
            backgroundColor:"#402D5B",
            borderRadius:5,
            borderColor:"white"
            
           }}
           size={35}
           iconColor="white"
           onPress={()=>{
            setBtype("Misc")
            setBudget(event.budget.Misc.expected)
            setAmount(event.budget.Misc.paid)
            setShowModal(true)
            
           }}
           >
           
            </IconButton>
            <Text style={{
               textAlign:"center",
               marginTop:8,
               fontWeight:"600"
            }}>
                Miscellaneous
            </Text>
            
                </View>
            
                </View>

            <View style={{
                height:150,
                width:265,
                backgroundColor:"#A293B9",
                alignSelf:"center",
                marginTop: 25,
                borderRadius:8
            }}>
                <Text
                style={{
                    textAlign:"center",
                    color:"white",
                    marginTop:15,
                    fontSize:16,
                    fontWeight:"700"
                }}>
                    Budget Summary
                </Text>
                <Text
                style={{
                    textAlign:"left",
                    color:"white",
                    marginTop:12,
                    fontSize:16,
                    fontWeight:"500",
                    marginLeft:18
                }}>
                    Total Amount: {total}
                </Text>

                <Text
                style={{
                    textAlign:"left",
                    color:"white",
                    marginTop:8,
                    fontSize:16,
                    fontWeight:"500",
                    marginLeft:18
                }}>
                    Paid Amount: {paid}
                </Text>

                <Text
                style={{
                    textAlign:"left",
                    color:"white",
                    marginTop:8,
                    fontSize:16,
                    fontWeight:"500",
                    marginLeft:18,
                    marginBottom:15,
                }}>
                    Pending Amount: {total-paid}
                </Text>
            </View>
            <Portal >
            <Modal visible={showModal} onDismiss={()=>{
                
                setShowModal(false)
                setBudget("")
                setAmount("")
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
                        Set {btype} Budget
                    </Text>
                    
                <TextInput label="Expected Budget" keyboardType="numeric" mode="outlined" value={budget} onChangeText={text=>setBudget(text)}
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
                    <TextInput label="Paid Amount" keyboardType="numeric" mode="outlined" value={amount} onChangeText={text=>setAmount(text)}
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
                    if (budget.trim().length==0 || amount.trim().length==0 || Number(budget)<Number(amount))
                        return
                    storage.load({
                        key:"data"
                    }).then((data)=>{
                        const ind=data.findIndex((e)=>e.id==event.id)
                        data[ind].budget[btype].expected=budget
                        data[ind].budget[btype].paid=amount
                        console.log(btype,budget,amount)
                        setEvent(data[ind])
                    storage.save({
                        key:"data",
                        data:data
                    
                    }).then(()=>{setShowModal(false)}).catch((e)=>{
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
                    Update
                </Button>
                </View>
            </Modal>
        </Portal>

        </View>

        
     );
}
 
export default Budget;