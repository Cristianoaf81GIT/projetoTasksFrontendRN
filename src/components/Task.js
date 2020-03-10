import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles'
import Swipeable from 'react-native-swipeable'

/**
 * componente tarefa
  * */
export default props => {
  // utilizada para retornar
  // o marcador para tarefa
  // concluida
  let check = null
  
  // propriedade com valor de data
  // checa-se se fora concluida
  if (props.doneAt != null){
    // se atividade concluida retornamos
    // uma view com icone de 'confere'
    // indicando tarefa concluida
    check = (
      <View style={styles.done}>
	<Icon name='check' size={18}
	  color={commonStyles.colors.secondary}/>
      </View>
    )
  }else{
    // se atividade nao concluida 
    check = <View style={styles.pending}/>
  }

  // modificamos o estilo do texto
  // caso tarefa esteja concluida
  // neste caso o texto sera exibido
  // com line-through
  const descStyle = props.doneAt !== null ? {textDecorationLine:'line-through'} : {}


  // conteudo da esquerda do swipeable
  const leftContent = (
    <View style={styles.exclude}>
      <Icon name='trash' 
	size={20} 
	color='#FFF'/>
      <Text style={styles.excludeText}>
	Excluir
      </Text>
    </View>
  )

  const rightContent = [
    <TouchableOpacity  
      style={[styles.exclude, {justifyContent: 'flex-start', paddingLeft: 20}]}
      onPress={ ()=> props.onDelete(props.id) }>      
      <Icon name='trash' size={30} color='#FFF'/>
    </TouchableOpacity>,
  ]

  return(
    <Swipeable leftActionActivationDistance={200}
      onLeftActionActivate={ () => props.onDelete(props.id)  }
      leftContent={leftContent} rightButtons={rightContent}>

      <View style={styles.container}>
      
	<TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)} >
	  <View style={styles.checkContainer}>{check}</View>
	</TouchableWithoutFeedback>	
	
	<Text style={[styles.description,descStyle]}>
	  {props.desc}
	</Text>
	
	<Text style={styles.date}>
	  {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
	</Text>
        
      </View>    
    </Swipeable>
  )

}



const styles = StyleSheet.create({
  container:{
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#AAA', 
    padding: 8,    
  },
  checkContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '10%',
  },
  pending:{
    borderWidth: 1,
    height: 25,
    width: 25,
    borderRadius: 15,
    borderColor: '#555',
  },
  done:{
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: '#4d7031',
    alignItems: 'center',
    justifyContent: 'center',    
  },
  description:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 20,
  },
  date:{
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 10,
    padding: 5,
  },
  exclude:{
    flex: 1,
    backgroundColor: '#964233',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  excludeText:{
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 20,
    margin: 10,
  },

})
