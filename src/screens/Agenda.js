import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Platform,
  YellowBox,
  //AsyncStorage
} from 'react-native'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/pt-br'
import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'
import commonStyles from '../commonStyles'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'
import { server, showError } from '../common'

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
])

console.disableYellowBox = true

/**
 * classe representando agenda
 * @author cristianoaf81
 * */
export default class Agenda extends Component {
  
  state = {

    tasks:[],
    visibleTasks:[],
    showDoneTasks: true,
    showAddTask: false,
  }

  /**
   * funcao para adicionar tarefas
    * */
  addTask = async task => {

    try{
      await axios.post(`${server}/tasks`,{
	desc: task.desc,
	estimateAt: task.date
      })

      this.setState({showAddTask: false}, this.loadTasks)

    }catch(err){
      showError(err)    
    }    
  }

  /**
   * Filtra as tarefas
    * */
  filterTasks = () => {
    let visibleTasks = null
    if(this.state.showDoneTasks){
      visibleTasks = [...this.state.tasks]
    }else{
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }
    this.setState({visibleTasks})    
  }


  /**
   * funcao para ativar filtro de tarefas
   * */
  toggleFilter= () => {

    this.setState( 
      { showDoneTasks: !this.state.showDoneTasks  },
      this.filterTasks )

  }

  /**
   * funcao chamada ao renderizar o componente
   * * */
  componentDidMount= async ()=>{
    this.loadTasks()
  }
  
  /**
   * funcao para marcar ou desmarcar
   * tarefa como concluida
    * */
  toggleTask = async id => {
    try{
      await axios.put(`${server}/tasks/${id}/toggle`)
      await this.loadTasks()
    }catch(err){
      showError(err)
    }    
    
  }

  loadTasks = async () => {
    try{
      const maxDate = moment().add({days:this.props.daysAhead})
	.format('YYYY-MM-DD 23:59')
      const res = await axios.get(`${server}/tasks?date=${maxDate}`)
      this.setState({tasks:res.data}, this.filterTasks)
    }catch(err){
      showError(err)
    }
  }

  deleteTask = async id => {
    try{
      await axios.delete(`${server}/tasks/${id}`)
      await this.loadTasks()
    }catch(err){
      showError(err)
    }
  }

  render(){
    let styleColor = null
    let image  = null
    
    switch(this.props.daysAhead){
      case 0:
	styleColor = commonStyles.colors.today
	image = todayImage
	break
      case 1:
	styleColor = commonStyles.colors.tomorrow
	image = tomorrowImage
	break
      case 7:
	styleColor = commonStyles.colors.week
	image = weekImage
	break
      default:
	styleColor = commonStyles.colors.month
	image = monthImage
	break
    }

    return(
      <View style={styles.container}>
	<AddTask isVisible={this.state.showAddTask}
	  onSave={this.addTask}
	  onCancel={()=>this.setState({showAddTask:false})}/>
	<StatusBar backgroundColor='#000'/>
	<ImageBackground source={image} style={styles.background}>
	  <TouchableOpacity onPress={this.toggleFilter}>
	    <View style={styles.iconBar}>
	      <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
		<Icon name='bars' size={20} color={commonStyles.colors.secondary}/>
	      </TouchableOpacity>
	      <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
		size={20} color={commonStyles.colors.secondary}/>
	    </View>
	  </TouchableOpacity>
	  <View style={styles.titleBar}>
	    <Text style={styles.title}>
	      {this.props.title}
	    </Text> 
	    <Text style={styles.subtitle}>
	      {moment().locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
	    </Text>
	  </View>
	</ImageBackground>
	<View style={styles.tasksContainer}>
	  {/*
	    ao utilizar array o react exige atributo key o keyextractor
	    obtemos a chave do componente
	    */}
	    <FlatList data={this.state.visibleTasks}
	      keyExtractor={item => `${item.id}`}
	      renderItem={ ( {item} ) => 
		  <Task {...item} onToggleTask={this.toggleTask}
		    onDelete={this.deleteTask}/> }/>

	  </View>
	  
	  <ActionButton buttonColor={styleColor}
	    onPress={ () => {this.setState({showAddTask: true})} }/>
	    
	  
      </View>
    )  
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  background:{
    flex:3,
  },
  titleBar:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  title:{
    fontFamily: commonStyles.fontFamily,
    color: 'white',
    fontSize: 35,
    marginLeft: 10,
    marginBottom: 7,
  },
  subtitle:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 30,
  },
  tasksContainer:{
    flex: 7,
  },
  iconBar:{
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  })
