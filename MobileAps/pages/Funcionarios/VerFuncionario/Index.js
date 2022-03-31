import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, TextInput, ToastAndroid} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Feather} from '@expo/vector-icons';

import { useFocusEffect, CommonActions  } from '@react-navigation/native';

export default function VerFuncionario({navigation, route}){
    const {item} = route.params;

    const[atualizar, setAtualizar] = useState(false);
    const[nome, setNome] = useState("");
    const[matricula, setMatricula] = useState("")
    const[rg, setRg] = useState("");
    const[cpf, setCpf] = useState("");
    const[estdCivil, setEstdCivil] = useState("");
    const[sexo,setSexo] = useState("");
    const[email,setEmail] = useState("");
    const[senha,setSenha] = useState("");
    const[cargo, setCargo] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[dataAdmissao, setDataAdmissao]= useState("");
    const[dataDemissao, setDataDemissao]= useState("");

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
     }

     const Atualizar = () => {
        let anoDem = dataDemissao.split('/')[2]
        let mesDem = dataDemissao.split('/')[1]
        let diaDem = dataDemissao.split('/')[0]
        
        let funcionario = {
            matricula_funcionario: matricula,
            cargo: cargo,
            data_demissao: `${anoDem}-${mesDem}-${diaDem}`,
        }
    
        // fetch(`http://10.87.207.27:3000/funcionario`, {
        fetch(`http://192.168.0.103:3000/funcionarios`, {
          "method": "PUT",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(funcionario),
        })
        .then(resp => {return resp.json()})
        .then(data => {
            console.log(data)
            ToastAndroid.show('Funcionário atualizado!', ToastAndroid.SHORT)
            setAtualizar(false)
            setMatricula("")
            setCargo("")
            setDataDemissao("")
        })
        .catch(err => {
            console.log(err) 
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            readStorage();
        }, [])
    );

    const readStorage = async () => {
        // setNome(item.nome_completo);
        // setRg(item.rg);
        // setCpf(item.cpf);
        // setNascimento(formatDate(new Date(item.data_nascimento)))
        setCargo(item.cargo);
        setMatricula(item.matricula);
        setDataDemissao(item.data_demissao)
        // setSexo(item.sexo);
        // setDataAdmissao(formatDate(new Date(item.data_admissao)))
    }

    return(
        <View style={global.body}>
            {
                (atualizar !== true) ?
                <View style={css.body2}>
                    <View style={global.headerFunc}>
                        <View style={global.alignHeader}>
                            <Ionicons name="arrow-back-circle-outline" style={css.icon} size={35} color="#166B8A" onPress={() => {navigation.navigate('ListarFuncionario')}} />
                            <Image source={(item.foto === null || item.foto === "" || item.foto === "undefined") ? require("../../assets/user.png") : {uri: item.foto}} style={global.imageUser}/>
                        </View>
                        <View style={global.cardTitle}>
                            <Text style={global.textTitle}>CASA ACOLHEDORA</Text>
                            <Text style={global.textTitle}>IRMÃ ANTÔNIA</Text>
                        </View>
                    </View>
                    <View style={css.scroll}>
                        <ScrollView>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nome:</Text>
                                <Text style={global.textInfo}>{item.nome_completo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Matricula:</Text>
                                <Text style={global.textInfo}>{item.matricula}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>RG:</Text>
                                <Text style={global.textInfo}>{item.rg}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>CPF:</Text>
                                <Text style={global.textInfo}>{item.cpf}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nascimento:</Text>
                                <Text style={global.textInfo}>{formatDate(new Date(item.data_nascimento))}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Cargo:</Text>
                                <Text style={global.textInfo}>{item.cargo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Sexo:</Text>
                                <Text style={global.textInfo}>{item.sexo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>E-mail:</Text>
                                <Text style={global.textInfo}>{item.email}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Data admissão:</Text>
                                <Text style={global.textInfo}>{formatDate(new Date(item.data_admissao))}</Text>
                            </View>
                            {
                                (item.data_demissao !== null)
                                ?
                                    <View style={global.info}>
                                        <Text style={global.textInfo}>Data demissão:</Text>
                                        <Text style={global.textInfo}>{formatDate(new Date(item.data_demissao))}</Text>
                                    </View>
                                :
                                <TouchableOpacity style={global.cardButton1} onPress={() => {setAtualizar(true)}}>
                                    <Text style={global.buttonText1}>ATUALIZAR</Text>
                                </TouchableOpacity>
                            }
                        </ScrollView>
                    </View>
                </View>
                :
                <View style={css.body2}>
                    <View style={global.header}>
                        <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {setAtualizar(false)}} />
                        <View style={global.cardTitle}>
                            <Text style={global.textTitle}>Casa Acolhedora</Text>
                            <Text style={global.textTitle}>Irmã Antônia</Text>
                        </View>
                    </View>
                    <View style={{width: "100%", height: "80%", justifyContent: "space-evenly"}}>
                        <TextInput value={cargo} onChangeText={setCargo} placeholder="Cargo..." style={global.info}></TextInput>
                        <TextInput value={matricula} onChangeText={setMatricula} placeholder="Matricula..." style={global.info}></TextInput>
                        <TextInput value={dataDemissao} onChangeText={setDataDemissao} placeholder="Data demissão..." style={global.info}></TextInput>
                        <TouchableOpacity style={css.cardButton1} onPress={() => {Atualizar()}}>
                            <Text style={global.buttonText1}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            
        </View>
    )
}

const css = StyleSheet.create({
    scroll:{
        width: '100%',
        height: '70%',
    },
    body2:{
        width: "100%",
        height: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: "column",
        
    },
    cardButton1: {
      backgroundColor: "rgb(22,107,138)",
      width: "35%",
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      alignSelf: "center",
      marginTop: 20
    }
})