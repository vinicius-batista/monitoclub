import { replys, topicos, userById } from '../../services/firebase'

const state = {
  topics: [],
  pageCount: 0
}

const getters = {
  getTopicPage: (state) => (pageNumber) => state.topics.slice((pageNumber * 10) - 10, (pageNumber * 10) - 1),
  getTopicById: (state) => (id) => state.topics.find(topic => topic.id === id)
}

const mutations = {
  setTopicos (state, topics) {
    state.topics = topics
    state.pageCount = Math.ceil(topics.length / 10)
  }
}

const actions = {
  getTopicos: async ({ dispatch, commit }, campusId) => {
    try {
      const response = await topicos
                            .orderByChild('unidadeAcademicaId')
                            .equalTo(campusId)
                            .once('value')
      
      let topicsVal = []
      response.forEach((topico) => {
        topicsVal.push(topico.val())
      })
      
      const searchUserInfo = async (topic) => {
        const userInfo = await dispatch('getUserBasicInfo', topic.usuarioId)
        
        return Object.assign(topic, userInfo)
      }
      
      const topicsFinal = await Promise.all(topicsVal.map(searchUserInfo))
      
      const sortFunct = (a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1
        }
        if (a.createdAt < b.createdAt) {
          return 1
        }
        return 0
      }
      
      topicsFinal.sort(sortFunct)
      
      commit('setTopicos', topicsFinal)
      
      return topicsFinal
    } catch (err) {
      throw err
    }
  },
  getUserBasicInfo: async (context, userId) => {
    try {
      const response = await userById(userId).once('value')
      
      const user = {
        userName: response.val().nome,
        userPhotoURL: response.val().photoURL
      }
      
      return user
    } catch (err) {
      throw err
    }
  },
  getReplys: async (context, topicId) => {
    try {
      const response = await replys
                                .orderByChild('topicId')
                                .equalTo(topicId)
                                .once('value')
  
      let replysVal = []
      response.forEach((topico) => {
        replysVal.push(topico.val())
      })
  
      const searchUserInfo = async (reply) => {
        const userInfo = await context.dispatch('getUserBasicInfo', reply.usuarioId)
    
        return Object.assign(reply, userInfo)
      }
  
      const replysFinal = await Promise.all(replysVal.map(searchUserInfo))
  
      const sortFunct = (a, b) => {
        if (a.createdAt > b.createdAt) {
          return 1
        }
        if (a.createdAt < b.createdAt) {
          return -1
        }
        return 0
      }
  
      replysFinal.sort(sortFunct)
      
      return replysFinal
    } catch (err) {
      throw err
    }
  },
  deleteTopic: async (context, topicId) => {
    try {
      await topicos.child(topicId).remove()
      const replysRef = await replys.orderByChild('topicId')
                                    .equalTo(topicId)
                                    .once('value')
      replysRef.forEach(reply => { reply.ref.remove() })
    } catch (err) {
      throw err
    }
  }
}

const moduleForum = {
  state,
  getters,
  mutations,
  actions
}

export default moduleForum
