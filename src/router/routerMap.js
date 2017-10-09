import InitialPageComponent from '../components/InitalPage.vue'
import RegisterComponenent from '../components/Register.vue'
import DashboardComponent from '../components/MainDashboard.vue'

export default [
  {
    path: '/',
    name: 'InitialPage',
    component: InitialPageComponent,
    meta: {auth: false}
  },
  {
    path: '/auth/register',
    name: 'auth.register',
    component: RegisterComponenent,
    meta: {auth: false}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardComponent,
    meta: {auth: true}
  }
]

