/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import Agenda from './src/screens/Agenda'
import Navigator from './src/Navigator'
import {name as appName} from './app.json';
import {YellowBox} from 'react-native'


YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
])

console.disableYellowBox = true
console.ignoreWarnings = [
'Warning: componentWillMount is deprecated',
'Warning: componentWillUpdate is deprecated',
'Warning: componentWillReceiveProps is deprecated',
]
AppRegistry.registerComponent(appName, () => Navigator);
