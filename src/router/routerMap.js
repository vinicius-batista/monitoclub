import InitialPageComponent from '../components/InitalPage.vue'
import RegisterComponenent from '../components/Register.vue'
import DashboardComponent from '../components/MainDashboard.vue'
import CampusComponent from '../components/Campus.vue'
import SubjectComponent from '../components/Subject.vue'
import ProfileComponent from '../components/Profile.vue'
import HelpComponent from '../components/Help.vue'
import ForumMainComponent from '../components/ForumMain.vue'
import ForumTopicComponent from '../components/ForumTopic.vue'

export default [
  {
    path: '/',
    name: 'InitialPage',
    component: InitialPageComponent,
    meta: {
      auth: false,
      title: 'MonitoClub'
    }
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: RegisterComponenent,
    meta: {
      auth: false,
      title: 'Registre-se'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardComponent,
    meta: {
      auth: true,
      title: 'MonitoClub'
    }
  },
  {
    path: '/campus/:id',
    name: 'campus',
    component: CampusComponent,
    meta: {
      auth: true,
      title: 'Campus - MonitoClub'
    }
  },
  {
    path: '/subject/:id',
    name: 'subject',
    component: SubjectComponent,
    meta: {
      auth: true,
      title: 'Disciplina - MonitoClub'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileComponent,
    meta: {
      auth: true,
      title: 'Perfil - MonitoClub'
    }
  },
  {
    path: '/help',
    name: 'help',
    component: HelpComponent,
    meta: {
      title: 'Ajuda - MonitoClub',
      auth: true
    }
  },
  {
    path: '/forum/:id',
    name: 'forum.main',
    component: ForumMainComponent,
    meta: {
      title: 'Forum - MonitoClub',
      auth: true
    }
  },
  {
    path: '/forum/topic/:id',
    name: 'forum.topic',
    component: ForumTopicComponent,
    meta: {
      title: 'Forum - MonitoClub',
      auth: true
    }
  }
]

