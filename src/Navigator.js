import React from 'react'
import { createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import Menu from './screens/Menu'
import Agenda from './screens/Agenda'
import Auth from './screens/Auth'
import commonStyles from './commonStyles'
import AuthOrApp from './screens/AuthOrApp'

const MenuRoutes = {
  Today:{
    name: 'Today',
    screen: props => <Agenda title='hoje' daysAhead={0} {...props}/>,
    navigationOptions:{
      title: 'Hoje'
    }
  },
  Tomorrow:{
    name: 'Tomorrow',
    screen: props => <Agenda title='Amanhã' daysAhead={1} {...props}/>,
    navigationOptions:{
      title: 'Amanhã'
    }
  },
  Week:{
    name: 'Week',
    screen: props => <Agenda title='Semana' daysAhead={7} {...props}/>,
    navigationOptions:{
      title:'Semana'
    }
  },
  Month:{
    name: 'Month',
    screen: props => <Agenda title='Mês' daysAhead={30} {...props}/>,
    navigationOptions:{
      title:'Mês'
    }
  }
}

const MenuConfig = {
  initialRouteName: 'Today',
  contentComponent: Menu,
  contentOptions:{
    labelStyle:{
      fontFamily: commonStyles.fontFamily,
      fontWeight: 'normal',
      fontSize: 20,
    },
    activeLabelStyle:{
      color: '#080',
    }
  }
}

const MenuNavigator = createDrawerNavigator(MenuRoutes, MenuConfig) 

const MainRoutes = {
  Loading:{
    name: 'Loading',
    screen: AuthOrApp
  },
  Auth: {
    name: 'Auth',
    screen: Auth
  },
  Home: {
    name: 'Home',
    screen: MenuNavigator /*Agenda*/
  }
}

const MainNavigator = 
  createSwitchNavigator( MainRoutes,{ initialRouteName: 'Loading' } )

export default MainNavigator
