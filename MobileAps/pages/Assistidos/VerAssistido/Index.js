import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity} from 'react-native';

import global from "../../Global/Style"
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

export default function VerAssistido({navigation, route}){
    const id = route.params;

    const[assistido, setAssistido] = useState([]) 
    const[relatorio, setRelatorio] = useState("")
    const[value, onChangeText] = useState("");

    const[editar, setEditar] = useState(false)
    const[familiar, setFamiliar] = useState(false)

    const[nome, setNome] = useState("");
    const[nomeSocial, setNomeSocial] = useState("");
    const[rg, setRg] = useState("");
    const[cpf, setCpf] = useState("");
    const[antCriminal, setAntCriminal] = useState("");
    const[sexo,setSexo] = useState("");
    const[nascimento, setNascimento] = useState("");
    const[estdCivil, setEstdCivil] = useState("");
    const[naturalidade, setNaturalidade] = useState("");
    const[cartCid, setCartCid] = useState("");
    const[cartSus, setCartSus] = useState("");
    const[foto, setFoto] = useState(assistido.foto_depois);

    const[DadosFamiliar, setDadosFamiliar] = useState([])
    const[nomeFamiliar, setNomeFamiliar] = useState("");
    const[rgFamiliar, setRgFamiliar] = useState("");
    const[parentescoFamiliar, setParentescoFamiliar] = useState("");
    const[emailFamiliar, setEmailFamiliar] = useState("");
    const[telefoneFamiliar, setTelefoneFamiliar] = useState("");
    const[enderecoFamiliar, setEnderecoFamiliar] = useState("");

    useEffect(() => {
        setAssistido(id);
    })

    const limpar = () => {
        
    }

    const formatDate = (nasc) => {
        let dia = nasc.getDate();
        dia = (dia < 10) ? "0" + dia : dia;
        let mes = nasc.getMonth() + 1;
        mes = (mes < 10) ? "0" + mes : mes;
        let ano = nasc.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const salvarRelatorio = () => {
        setRelatorio(value)
    }

    const editarDados = () => {
        setEditar(true)
    }

    const novoFamiliar = () => {
        setEditar(false)
    }

    useFocusEffect(
        React.useCallback(() => {
        fetch(`http://10.87.207.27:3000/assistido/busca_familiar/${id.id_assistido}`)
        .then(resp => {return resp.json()})
        .then(data => {
            setDadosFamiliar(data)
        })
        .catch(err => {
            console.log(err) 
        });
    }, [])
    );

    const salvarEdicao = () => {
        let ano = nascimento.split('/')[2]
            let mes = nascimento.split('/')[1]
            let dia = nascimento.split('/')[0]
            
            let Assistido = {
                id_assistido: assistido.id_assistido,
                nome_completo: nome,
                nome_social: nomeSocial,
                rg: rg,
                cpf: cpf,
                antecedente_criminal: antCriminal,
                data_nascimento: `${ano}-${mes}-${dia}`,
                estado_civil: estdCivil,
                naturalidade: naturalidade,
                sexo: sexo,
                cartao_cidadao: cartCid,
                cartao_sus: cartSus,
                foto_depois: foto
            }
        
            fetch(`http://10.87.207.27:3000/assistido/update`, {
            // fetch(`http://192.168.0.103:3000/assistidos`, {
              "method": "PUT",
              "headers": {
                  "Content-Type": "application/json"
              },
              "body": JSON.stringify(Assistido),
            })
            .then(resp => {return resp.json()})
            .then(async data => {
                ToastAndroid.show('Atualizado!', ToastAndroid.SHORT)
                setEditar(false)
                // if(data.err !== undefined) {
                //     if(data.err.includes("Duplicate entry"))
                //         ToastAndroid.show('CPF já existente!', ToastAndroid.SHORT)
                // } else {
                //     ToastAndroid.show('Atualizado!', ToastAndroid.SHORT)
                //     setEditar(false)
                // }
            })
            .catch(err => {
                console.log(err) 
            });
    }

    const cadastrarFamiliar = () => {
        let familiar = {
            id_assistido: assistido.id_assistido,
            nome_completo: nome,
            rg: rg,
            telefone: telefone,
            email: email,
            parentesco: parentesco,
        }

        // fetch(`http://192.168.0.103:3000/assistido/familiar`, {
        fetch(`http://10.87.207.27:3000/assistido/familiar`, {
          "method": "POST",
          "headers": {
              "Content-Type": "application/json"
          },
          "body": JSON.stringify(familiar),
        })
        .then(resp => {return resp.json()})
        .then(data => {
          console.log(data)
          setFamiliar(false)
        })
        .catch(err => { console.log(err) });
    }

    return(
        <View style={global.body}>
            <View style={global.header}>
                <Ionicons name="arrow-back-circle-outline" style={{marginLeft: 5}} size={35} color="#166B8A" onPress={() => {navigation.navigate('ListarAssistidos')}} />
                <View style={global.cardTitle}>
                        <Text style={global.textTitle}>CASA ACOLHEDORA</Text>
                        <Text style={global.textTitle}>IRMÃ ANTÔNIA</Text>
                </View>
            </View>
            <View style={global.scroll}>
                <ScrollView>
                    {
                        (editar === false)
                        ?
                        <View>
                            <View style={css.images}>
                                <View>
                                    <Image source={(assistido.foto_antes !== null && assistido.foto_antes !== undefined && assistido.foto_antes !== "") ? {uri:assistido.foto_antes} : require("../../assets/user1.png")} style={global.imageUser}/>
                                    <Text style={css.title}>Antes</Text>
                                </View>
                                <View>
                                    <Image source={(assistido.foto_depois !== null && assistido.foto_depois !== undefined && assistido.foto_depois !== "") ? {uri:assistido.foto_depois} : require("../../assets/user1.png")} style={global.imageUser}/>
                                    <Text style={css.title}>Depois</Text>
                                </View>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nome:</Text>
                                <Text style={global.textInfo}>{assistido.nome_completo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nome social:</Text>
                                <Text style={global.textInfo}>{assistido.nome_social}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>RG:</Text>
                                <Text style={global.textInfo}>{assistido.rg}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>CPF:</Text>
                                <Text style={global.textInfo}>{assistido.cpf}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Nascimento:</Text>
                                <Text style={global.textInfo}>{formatDate(new Date(assistido.data_nascimento))}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Naturalidade:</Text>
                                <Text style={global.textInfo}>{assistido.naturalidade}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Sexo:</Text>
                                <Text style={global.textInfo}>{assistido.sexo}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Estado civíl:</Text>
                                <Text style={global.textInfo}>{assistido.estado_civil}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Cartão cidadão:</Text>
                                <Text style={global.textInfo}>{assistido.cartao_cidadao}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Cartão do SUS:</Text>
                                <Text style={global.textInfo}>{assistido.cartao_sus}</Text>
                            </View>
                            <View style={global.info}>
                                <Text style={global.textInfo}>Antecedente:</Text>
                                <Text style={global.textInfo}>{assistido.antecedente_criminal}</Text>
                            </View>
                            <TouchableOpacity style={css.button} onPress={() => {editarDados()}}>
                                <Text style={global.buttonText1}>Editar dados</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View>
                            <TextInput value={assistido.nome_completo} onChangeText={setNome} placeholder="Nome..." place style={global.info}></TextInput>
                            <TextInput value={assistido.nome_social} onChangeText={setNomeSocial} placeholder="Nome social..." place style={global.info}></TextInput>
                            <TextInput value={assistido.rg} onChangeText={setRg} placeholder="RG..." style={global.info}></TextInput>
                            <TextInput value={assistido.cpf} onChangeText={setCpf} placeholder="CPF..." style={global.info}></TextInput>
                            <TextInput value={assistido.antecedente_criminal} onChangeText={setAntCriminal} placeholder="Antecedente criminal..." style={global.info}></TextInput>
                            <View style={{width: "80%", alignSelf: "center", borderBottomWidth: 2}}>
                                <Picker
                                    selectedValue={sexo}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSexo(itemValue)
                                }>
                                    <Picker.Item label="Sexo..." value="" style={{color: "gray"}}/>
                                    <Picker.Item label="Feminino" value="Feminino" />
                                    <Picker.Item label="Masculino" value="Masculino" />
                                    <Picker.Item label="Outro" value="Outro" />
                                </Picker>
                            </View>
                            <TextInput value={formatDate(new Date(assistido.data_nascimento))} onChangeText={setNascimento} placeholder="Nascimento..." style={global.info}></TextInput>
                            <TextInput value={assistido.estado_civil} onChangeText={setEstdCivil} placeholder="Estado civil..." style={global.info}></TextInput>
                            <TextInput value={assistido.naturalidade} onChangeText={setNaturalidade} placeholder="Naturalidade..." style={global.info}></TextInput>
                            <TextInput value={assistido.cartao_cidadao} onChangeText={setCartCid} placeholder="Cartão cidadão..." style={global.info}></TextInput>
                            <TextInput value={assistido.cartao_sus} onChangeText={setCartSus} placeholder="Cartão do SUS..." style={global.info}></TextInput>
                            <TouchableOpacity style={css.button} onPress={() => {salvarEdicao()}}>
                                <Text style={global.buttonText1}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <Text style={css.title}>Dados do Familiar</Text>
                    <View style={{width: "100%"}}>
                        <ScrollView horizontal>
                        {
                            (DadosFamiliar !== null && DadosFamiliar !== undefined)
                            ?
                            DadosFamiliar.map((item, index) => {
                                {console.log(item)}
                                return(
                                    <View key={index} style={{width: 370, height: 350}}>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Nome:</Text>
                                            <Text style={global.textInfo}>{item.nome_familiar}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Parentesco:</Text>
                                            <Text style={global.textInfo}>{item.parentesco}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Telefone:</Text>
                                            <Text style={global.textInfo}>{item.telefone_familiar}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>E-mail:</Text>
                                            <Text style={global.textInfo}>{item.email_familiar}</Text>
                                        </View>
                                        <View style={global.info}>
                                            <Text style={global.textInfo}>Endereço:</Text>
                                            <Text style={global.textInfo}>{item.endereco_familiar}</Text>
                                        </View> 
                                        <FontAwesome name="circle" size={20} color="#166B8A" style={{alignSelf: "center", marginTop: 5}} />
                                    </View>
                                )
                            })
                            :
                            <View style={{display: "flex", flexDirection: "row", width: 370, height: 40, justifyContent: "center", alignItems: "center"}}>
                                <Text style={{color: "gray", fontSize: 18, marginRight: 10}}>Nenhum familiar cadastrado</Text>
                                <Entypo name="emoji-sad" size={20} color="gray" />
                            </View>
                        }
                        </ScrollView>
                    </View>
                    {
                        (familiar === true)
                        ?
                            <View>
                                <Text style={css.title}>Novo Familiar</Text>
                                <TextInput value={nomeFamiliar} onChangeText={setNomeFamiliar} placeholder="Nome..." place style={global.info}></TextInput>
                                <TextInput value={rgFamiliar} onChangeText={setRgFamiliar} placeholder="RG..." style={global.info}></TextInput>
                                <TextInput value={parentescoFamiliar} onChangeText={setParentescoFamiliar} placeholder="Parentesco..." style={global.info}></TextInput>
                                <TextInput value={telefoneFamiliar} onChangeText={setTelefoneFamiliar} placeholder="Telefone..." style={global.info}></TextInput>
                                <TextInput value={emailFamiliar} onChangeText={setEmailFamiliar} placeholder="E-mail..." style={global.info}></TextInput>
                                <TextInput value={enderecoFamiliar} onChangeText={setEnderecoFamiliar} placeholder="Endereço..." style={global.info}></TextInput>
                                <TouchableOpacity style={css.button} onPress={() => {cadastrarFamiliar()}}>
                                    <Text style={global.buttonText1}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        :
                            <TouchableOpacity style={css.button} onPress={() => { setFamiliar(true)}}>
                                <Text style={global.buttonText1}>Novo Familiar</Text>
                            </TouchableOpacity>
                    }
                    <Text style={css.title}>Observações</Text>
                    <TextInput multiline
                                numberOfLines={5}
                                maxLength={20000}
                                onChangeText={text => onChangeText(text)}
                                value={value}
                                style={css.textArea}></TextInput>
                    <TouchableOpacity style={css.button} onPress={() => {salvarRelatorio()}}>
                        <Text style={global.buttonText1}>Novo</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
    images: {
        width: "100%",
        height: "13%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize:18,
        alignSelf: 'center',
        marginTop: 15,
        color: "#166B8A"
    },
    textArea: {
        width: "90%",
        alignSelf: 'center',
        padding: 10,
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 15
    },
    button:{
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