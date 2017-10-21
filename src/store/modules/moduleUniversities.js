import firebaseApp from '../../services/firebase'

const universities = firebaseApp.universities
const campus = firebaseApp.campus
const departaments = firebaseApp.departaments
const subjects = firebaseApp.subjects
const monitors = firebaseApp.monitors

const state = {
  universities: [],
  campus: [],
  subjects: []
}

const getters = {
  oneCampus: (state) => (id) => state.campus.find(campus => campus.id === id),
  oneSubject: (state) => (id) => state.subjects.find(subject => subject.id === id),
  universitiesName: (state) => state.universities.map(university => university.name)
}

const mutations = {
  setUniversities (state, universities) {
    state.universities = universities
  },
  setOneCampus (state, campus) {
    const searchMethod = campusSearch => campusSearch.id === campus.id
    if (state.campus.find(searchMethod) === undefined) {
      state.campus.push(campus)
    }
  },
  setOneSubject (state, subject) {
    const searchMethod = subjectSearch => subjectSearch.id === subject.id
    if (state.subjects.find(searchMethod) === undefined) {
      state.subjects.push(subject)
    }
  }
}

const actions = {
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
  getCampusById: async (context, campusId) => {
    try {
      const response = await campus.child(campusId).once('value')
      return response.val()
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

const moduleUniversities = {
  state,
  getters,
  mutations,
  actions
}

export default moduleUniversities
