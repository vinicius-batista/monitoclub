import InitialPageComponent from '../components/InitalPage.vue'
import RegisterComponenent from '../components/Register.vue'
import DashboardComponent from '../components/MainDashboard.vue'
import CampusComponent from '../components/Campus.vue'
import SubjectComponent from '../components/Subject.vue'

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
      title: 'Disciplina - MonitorClub'
    }
  }
]

