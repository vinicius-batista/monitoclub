import firebaseApp from '../services/firebase'

const auth = firebaseApp.auth
const googleProvider = firebaseApp.googleProvider
const facebookProvider = firebaseApp.facebookProvider
const universities = firebaseApp.universities
const campus = firebaseApp.campus
const departaments = firebaseApp.departaments
const subjects = firebaseApp.subjects
const monitors = firebaseApp.monitors

const actions = {
  loginEmailPassword: async (context, {email, password}) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password)
  
      const user = {
        name: response.displayName,
        email: response.email,
        photoURL: response.photoURL
      }
      
      context.commit('setUser', user)
      context.commit('authenticated', response.refreshToken)
      
      return response
    } catch (err) {
      return err
    }
  },
  registerEmailPassword: async (context, {email, password, displayName}) => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password)
  
      const user = auth.currentUser
      user.updateProfile({
        displayName: displayName
      })
  
      return response
    } catch (err) {
      return err
    }
  },
  loginExternalAuth: async (context, provider) => {
    try {
      provider === 'google'
        ? provider = googleProvider
        : provider = facebookProvider
      
      const response = await auth.signInWithPopup(provider)
      
      const token = response.credential.accessToken
      const user = {
        name: response.user.displayName,
        email: response.user.email,
        photoURL: response.user.photoURL
      }
      
      context.commit('setUser', user)
      context.commit('authenticated', token)
      
      return response
    } catch (err) {
      return err
    }
  },
  logout: async (context) => {
    try {
      const response = await auth.signOut()
      context.commit('unauthenticated')
      return response
    } catch (err) {
      return err
    }
  },
  getAllUniversities: async (context) => {
    try {
      let response = await universities.once('value')
      const listUniversities = []
  
      response.forEach(async (university) => {
        listUniversities.push(university.val())
      })
  
      context.commit('setUniversities', listUniversities)
      return response
    } catch (err) {
      return err
    }
  },
  getCampus: async (context, universityId) => {
    try {
      const response = await campus
        .orderByChild('universidadeId')
        .equalTo(universityId)
        .once('value')
  
      const listCampus = []
      response.forEach((campus) => {
        listCampus.push(campus.val())
        context.commit('setOneCampus', campus.val())
      })
  
      return listCampus
    } catch (err) {
      return err
    }
  },
  getDepartaments: async (context, campusId) => {
    try {
      const response = await departaments
        .orderByChild('unidades_academicas_id')
        .equalTo(campusId)
        .once('value')
  
      const listDepartaments = []
      response.forEach((departament) => {
        listDepartaments.push(departament.val())
      })
      
      return listDepartaments
    } catch (err) {
      return err
    }
  },
  getSubjects: async (context, departamentId) => {
    try {
      const response = await subjects
                                  .orderByChild('departamentoId')
                                  .equalTo(departamentId)
                                  .once('value')
      const listSubjects = []
      response.forEach((subject) => {
        listSubjects.push(subject.val())
        context.commit('setOneSubject', subject.val())
      })
      
      return listSubjects
    } catch (err) {
      return err
    }
  },
  getMonitor: async (context, subjectId) => {
    try {
      const response = await monitors
                                    .orderByChild('materiaId')
                                    .equalTo(subjectId)
                                    .once('value')
      
      let monitorFinal = {}
      response.forEach((monitor) => {
        monitorFinal = monitor.val()
      })
      
      return monitorFinal
    } catch (err) {
      return err
    }
  },
  getSubjectById: async (context, subjectId) => {
    try {
      const response = await subjects
                                  .orderByChild('id')
                                  .equalTo(subjectId)
                                  .once('value')
      
      let subjectFinal = {}
      response.forEach((subject) => {
        context.commit('setOneSubject', subject.val())
        subjectFinal = subject.val()
      })
      
      return subjectFinal
    } catch (err) {
      return err
    }
  }
}

export default actions
