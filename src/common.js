import {Alert,Platform} from 'react-native'

// meu ip a partir de var de ambiente linux
const ServerIpAddr = process.env.IP_WIRELESS

const server = Platform.OS === 'ios' ? 'http://localhost:3000'
  : 'http://192.188.120.16:3000'

{/*const server = `http://${ServerIpAddr}:3000`*/}

function showError(err){
  Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err} - ${server}`)
}

export {server,showError}
