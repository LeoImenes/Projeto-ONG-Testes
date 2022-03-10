import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView} from 'react-native';

import global from "../../Global/Style"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MeuPerfil({navigation}){
    const [funcionario, setFuncionario] = useState("");

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        let value = await AsyncStorage.getItem('userdata');
        if(value !== null) {
            value = JSON.parse(value);
            setFuncionario(value);

            fetch(`http://10.87.207.27:3000/funcionarios/${value.id_funcionario}`)
            .then(resp => {return resp.json()})
            .then(data => {
                console.log(data);
            })
            .catch( err => { console.log(err) })
        }
     }

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
     }

    return(
        <View style={global.body}>
            <Image style={global.image} source={require("../../assets/logo.png")}/>
            {
                funcionario.map((item, index) => {
                    return(
                        <View>
                            <View style={{
                                width: "100%",
                                height: "20%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-evenly"
                                }}>
                                <Image source={require("../../assets/user.png")} style={global.imageUser}/>
                                <Text style={global.textInfo}>Matrícula: {item.matricula}</Text>
                            </View>
                        </View>
                    )
                })
            }
            
            <View style={css.scrollView}>
                <ScrollView>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nome:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>RG:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>CPF:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Nascimento:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Cargo:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Sexo:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                    <View style={global.info}>
                        <Text style={global.textInfo}>Data admissão:</Text>
                        <Text style={global.textInfo}>Info</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    scrollView: {
        width: "100%",
        height: 430
    }
})