import React, { Component } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  DatePickerIOS,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  YellowBox,
  DatePickerAndroid,
  Platform
} from 'react-native'

import moment from 'moment'
import commonStyles from '../commonStyles'


// modelo de estado inicial 
// para tarefa 
// @desc {string} descricao tarefa
// @date {date} data para conclusao tarefa
//const initialState = { desc: '', date: new Date() }

/**
 * componente que adicionara nova
 * tarefa a lista
 * @author cristianoaf81
  * */
export default class AddTask extends Component { 
  // estado inicial clonado de modelo
  //state = { ...initialState }
  
  constructor(props){
    super(props)
    this.state = this.getInitialState()
  }


  // cria o estado inicial 
  getInitialState(){
    return {
      desc: '',
      date: new Date()
    }
  }
  
  /**
   * funcao para adicionar tarefa a listagem
   * nota funcao onSave sera passada por props
    * */
  save = (props) => {
    if (!this.state.desc.trim()){
      Alert.alert('Dados inválidos','Informe uma descricao para a tarefa')
      return
    }
    const data = { ...this.state }
    this.props.onSave(data)
    //this.setState({...initialState})
  }

  /**
   * funcao chamada apenas no android
   * utilizada para renderizar um 
   * datepicker
   * */
  handleDateAndroidChanged = () => {
    DatePickerAndroid.open({
      date: this.state.date
    }).then( evt => {

      if (evt.action !== DatePickerAndroid.dismissedAction)
      {
	const momentDate = moment(this.state.date)
	momentDate.date(evt.day)
	momentDate.month(evt.month)
	momentDate.year(evt.year)
	this.setState( { date: momentDate.toDate() } )
      }

    })
  }


  render(){

    console.disableYellowBox = true
    let datePicker = null

    // verificamos a plataforma
    if(Platform.OS === 'ios'){
      datePicker = (
	
	    <DatePickerIOS 
	    mode='date' 
	    date={this.state.date}
	    onDateChange={ date => this.setState( { date } ) }/>
      )
    }else{
      datePicker = (
	<TouchableOpacity onPress={this.handleDateAndroidChanged}>
	  <Text style={styles.date}>

	    {moment(this.state.date).locale('pt-br')
	      .format('ddd, [de] MMMM [de] YYYY')}

	  </Text>
	</TouchableOpacity>
      )
    }

    return(
       
       <Modal onRequestClose={ this.props.onCancel }
	visible={ this.props.isVisible }
	animationType='slide' transparent={ true }
	onShow={ ()=> this.setState({ ...this.getInitialState() }) }>

	{/* area anterior ao modal (ao toca-la fecha-se o mesmo) */}	
	<TouchableWithoutFeedback onPress={ this.props.onCancel }>
	  
	    {/*area com transparencia*/}
	    <View style={styles.offset}>   
	    </View>

	</TouchableWithoutFeedback>
	{/* fim area anterior ao modal----------------------------*/}


	{/* area com o conteudo do modal */}
	<View style={ styles.container }>
	  
	  {/*header*/}
	  <Text style={ styles.header }>Nova Tarefa</Text>

	  {/*input para a descricao da tarefa*/}
	  <TextInput placeholder='Descrição...'
	    style={ styles.input }
	    onChangeText={ desc => this.setState( { desc } ) }
	    value={ this.state.desc }/>
	  {/*fim imput-----------------------*/}

	  {/*date picker  ios ou android*/}	 
	  
	  {datePicker}

	  {/*fim date picker*/}

	  {/*area dos botoes do modal*/}
	  <View style={{
	    flexDirection: 'row',
	    justifyContent: 'flex-end'
	  }}>
	  <TouchableOpacity onPress={this.props.onCancel}>
	    <Text style={styles.button}>Cancelar</Text>
	  </TouchableOpacity>

	  <TouchableOpacity onPress={this.save}>
	    <Text style={styles.button}>Salvar</Text>
	  </TouchableOpacity>

	  </View>
	  {/*fim area botoes---------*/}

	</View>
	{/* fim area modal---------------*/}

	{/* area apos o modal (tambem capaz de fechar o mesmo)*/}
	<TouchableWithoutFeedback 
	  onPress={this.props.onCancel}>
	  <View style={styles.offset}></View>
	</TouchableWithoutFeedback>
	{/* fim pos modal ------------------------------------*/}
      </Modal>
    )
  }


}



var styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    justifyContent: 'space-between',
  }, 
  offset:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  button:{
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.default,
  },
  header:{
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.default,
    color: commonStyles.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 15,
  },
  input:{
    fontFamily: commonStyles.fontFamily,
    width: '90%',
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  date:{
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'center',
  },
})
