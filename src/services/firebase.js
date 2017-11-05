import FireBaseConfig from '../config'
import Firebase from 'firebase'

const FireBaseApp = Firebase.initializeApp(FireBaseConfig)

export const database = FireBaseApp.database()
export const auth = FireBaseApp.auth()
export const googleProvider = new Firebase.auth.GoogleAuthProvider()
export const facebookProvider = new Firebase.auth.FacebookAuthProvider()
export const universities = FireBaseApp.database().ref('Universidades').orderByChild('name')
export const campus = FireBaseApp.database().ref('Unidades_Academicas')
export const departaments = FireBaseApp.database().ref('Departamentos')
export const subjects = FireBaseApp.database().ref('Materias')
export const monitors = FireBaseApp.database().ref('Monitores')
export const userById = (id) => FireBaseApp.database().ref(`Usuario/${id}`)
export const topicos = FireBaseApp.database().ref().child('Topicos')
export const replys = FireBaseApp.database().ref().child('Respostas')
