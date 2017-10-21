import FireBaseConfig from '../config'
import Firebase from 'firebase'

const FireBaseApp = Firebase.initializeApp(FireBaseConfig)

export default {
  database: FireBaseApp.database(),
  auth: FireBaseApp.auth(),
  googleProvider: new Firebase.auth.GoogleAuthProvider(),
  facebookProvider: new Firebase.auth.FacebookAuthProvider(),
  universities: FireBaseApp.database().ref('Universidades').orderByChild('name'),
  campus: FireBaseApp.database().ref('Unidades_Academicas'),
  departaments: FireBaseApp.database().ref('Departamentos'),
  subjects: FireBaseApp.database().ref('Materias'),
  monitors: FireBaseApp.database().ref('Monitores'),
  userById: (id) => FireBaseApp.database().ref(`Usuario/${id}`)
}
