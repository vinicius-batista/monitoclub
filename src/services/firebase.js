import FireBaseConfig from '../config'
import Firebase from 'firebase'

const FireBaseApp = Firebase.initializeApp(FireBaseConfig)

export default {
  database: FireBaseApp.database(),
  auth: FireBaseApp.auth(),
  googleProvider: new Firebase.auth.GoogleAuthProvider(),
  facebookProvider: new Firebase.auth.FacebookAuthProvider()
}
