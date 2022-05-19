import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Modal, TextInput, Text, TouchableOpacity, ToastAndroid, Alert, Pressable } from 'react-native';

import global from "../Global/Style"
import { Ionicons, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import StatusBar from "../Components/StatusBar/Index"
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../Global/index'

export default function Financeiro({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [mostrarSaldo, setMostrarSaldo] = useState(true);
    const [mostrarFinancas, setMostrarFinancas] = useState(false);
    const [financas, setFinancas] = useState([])
    const [saldo, setSaldo] = useState();
    const [tipo, setTipo] = useState([{ "tipo": 0, "nome": "Despesa" }, { "tipo": 1, "nome": "Receita" }])
    const [valuePicker, setValuePicker] = useState();
    const [idFunc, setIdFunc] = useState();
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState()

    const getFunc = async () => {
        let value = await AsyncStorage.getItem('userdata');

        // fetch(`http://192.168.0.104:3000/funcionarios/${value}`)
        fetch(`http://10.87.207.20:3000/funcionarios/${value}`)
            .then(resp => { return resp.json() })
            .then(async data => {
                const id = JSON.parse(data[0].id_funcionario)
                setIdFunc(id)
            })
    }

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    useFocusEffect(
        React.useCallback(() => {
            getFunc()

            // fetch(`http://192.168.0.104:3000/funcionario/financas`)
            fetch(`http://10.87.207.20:3000/funcionario/financas`)
                .then(resp => { return resp.json() })
                .then(data => {
                    let tempR = [], tempD = [], rec = 0, des = 0;

                    data.forEach(item => {
                        console.log(item.tipo)
                        if (item.tipo == 0) {
                            tempD.push(item.valor);
                        } else {
                            tempR.push(item.valor);
                        }
                    })

                    tempD.forEach(item => {
                        // let somaRec = rec + item;
                        // rec = somaRec
                        des += item;
                    })

                    tempR.forEach(item => {
                        rec += item;
                    })

                    let dif = rec - des;
                    setSaldo(dif.toFixed(2))

                    setFinancas(data)

                })
                .catch(err => { console.log(err) });
        }, [])
    );

    const lancar = () => {
        let item = {
            "id_funcionario": 3,
            "tipo": valuePicker,
            "descricao": descricao,
            "valor": parseFloat(valor),
        }

        // fetch(`http://192.168.0.104:3000/funcionario/financas`, {
        fetch(`http://10.87.207.20:3000/funcionario/financas`, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(item),
        })
            .then(resp => { return resp.json() })
            .then(async data => {
                if (data.err !== undefined) {
                    ToastAndroid.show('Falha ao lançar!', ToastAndroid.SHORT)
                } else {
                    ToastAndroid.show('Resgitro efetuado!', ToastAndroid.SHORT)
                    setDescricao("")
                    setValor("")
                    setValuePicker()
                }
            })
    }

    return (
        <View style={global.body}>
            <StatusBar />
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{ marginLeft: 5 }} size={35} color="#166B8A" onPress={() => { navigation.navigate('Home'), limpar() }} />
                <View style={global.cardTitle}>
                    <Text style={global.textTitle}>Casa Acolhedora</Text>
                    <Text style={global.textTitle}>Irmã Antônia</Text>
                </View>
            </View>
            <View style={css.saldo}>
                <Text style={css.textPattern}>Saldo: R$ </Text>
                <Text style={[css.text, (saldo < 0) ? { color: "red" } : { color: "green" }, (mostrarSaldo === true) ? {} : { color: "black" }]}>{(mostrarSaldo === true) ? saldo : "•••"}</Text>
                <TouchableOpacity style={{}} onPress={() => { setMostrarSaldo(!mostrarSaldo) }}>
                    {
                        (mostrarSaldo === true)
                            ?
                            <FontAwesome name="eye" size={28} color="black" />
                            :
                            <FontAwesome name="eye-slash" size={28} color="black" />
                    }
                </TouchableOpacity>
            </View>
            <View style={css.historico}>
                <View style={{ flexDirection: "row", width: "100%", minHeight: 40, justifyContent: "space-evenly", alignItems: "center" }}>
                    <Text style={css.textPattern}>Histórico</Text>
                    <TouchableOpacity style={{ width: "10%", maxHeight: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => { setMostrarFinancas(!mostrarFinancas) }}>
                        {
                            (mostrarFinancas === true)
                                ?
                                <AntDesign name="up" size={24} color="black" />
                                :
                                <AntDesign name="down" size={24} color="black" />
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", maxHeight: 420 }}>
                    <ScrollView>
                        {
                            (mostrarFinancas === true)
                                ?
                                financas.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={css.card} key={index}>
                                            <View style={css.div}>
                                                {
                                                    (item.tipo === 0)
                                                        ?
                                                        <MaterialIcons name="money-off" size={25} color="orangered" />
                                                        :
                                                        <MaterialIcons name="attach-money" size={25} color="green" />
                                                }

                                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.descricao}</Text>
                                            </View>
                                            <View style={[css.div, { justifyContent: "space-evenly" }]}>
                                                <Text style={{ fontSize: 16 }}>R$ {item.valor.toFixed(2)}</Text>
                                                <Text>{formatDate(new Date(item.data_lancamento))}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                <View></View>
                        }
                    </ScrollView>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("O modal foi fechado!")
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={css.centeredView}>
                    <View style={css.modalView}>
                        <View style={css.inputs}>
                            <Picker selectedValue={valuePicker} onValueChange={(itemValue, itemIndex) => setValuePicker(itemValue)}>
                                <Picker.Item label={"Tipo..."} value={""} style={{ color: "gray" }} />
                                {
                                    tipo.map((item, index) => {
                                        return (

                                            <Picker.Item label={item.nome} value={item.tipo} key={index} />
                                        )
                                    })
                                }
                            </Picker>
                        </View>
                        {/* <TextInput value={nome} onChangeText={setNome} placeholder="Nome..." style={global.info}></TextInput> */}
                        <TextInput value={descricao} onChangeText={setDescricao} placeholder='Descrição...' placeholderTextColor="gray" style={css.inputs}></TextInput>
                        <TextInput value={valor} onChangeText={setValor} placeholder='Valor...' placeholderTextColor="gray" style={css.inputs}></TextInput>
                        <Pressable
                            style={[css.button, css.buttonClose, { marginTop: 20, marginBottom: 20 }]}
                            onPress={() => { setModalVisible(!modalVisible), lancar() }}
                        >
                            <Text style={global.buttonText1}>Salvar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[global.cardButton1, { width: 160, height: 50 }]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={global.buttonText1}>Lançar</Text>
            </Pressable>
        </View>
    )
}

const css = StyleSheet.create({
    saldo: {
        width: "80%",
        height: 100,
        backgroundColor: "whitesmoke",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
        width: "60%"
    },
    card: {
        width: "100%",
        minHeight: 70,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        padding: 2,
        paddingRight: 5,
        justifyContent: "space-evenly"
    },
    textPattern: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20
    },
    historico: {
        width: "90%",
        backgroundColor: "whitesmoke",
        marginTop: 10
    },
    div: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    modalView: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        width: 150,
        height: 50,
        justifyContent: 'center',
        borderRadius: 20,
        padding: 1,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    buttonClose: {
        backgroundColor: "#b0c4de",
    },
    cards: {
        width: 200,
        height: 60,
        borderBottomWidth: 2,
        marginTop: 10,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 10,
    },
    inputs: {
        width: 230,
        height: 45,
        borderBottomWidth: 2,
        borderBottomColor: "lightgray",
        marginTop: 10,
        padding: 2
    }
})