import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  mode: "history",
  routes: [

    {
      path: '/',
      redirect: 'dashboard',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/courses',
          name: 'courses management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Course/Courses.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/tutors',
          name: 'tutors management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tutor/Tutors.vue')
        },
        {
          path: '/tutees',
          name: 'tutees management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tutee/Tutees.vue')
        },
        {
          path: '/feedbacks',
          name: 'feedback confirmation',
          component: () => import(/* webpackChunkName: "demo" */ './views/Feedback/Feedback.vue')
        },
        {
          path: '/membership',
          name: 'membership & fees',
          component: () => import(/* webpackChunkName: "demo" */ './views/FeeMembership/Membership.vue')
        },
        {
          path: '/manager',
          name: 'manager management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Manager/Manager.vue')
        },
        {
          path: '/classes',
          name: 'classes and subjects management',
          component: () => import(/* webpackChunkName: "demo" */ './views/Class/Classes.vue')
        }
      ]
    },
    {
      path: '/login',
      redirect: 'login',
      component: AuthLayout,
      meta: { requiresVisitor: true },
      children: [
        {
          path: '/login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        }
      ]
    },
    {
      path: '/login',
      redirect: 'login',
      component: AuthLayout,
      meta: { requiresVisitor: true },
      children: [
        {
          path: '/login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        }
      ]
    },
    { path: '/404', meta: { requiresFail: true },component: () => import(/* webpackChunkName: "demo" */ './views/PageNotFound/PageNotFound.vue') },  
    { path: '/:pathMatch(.*)*', redirect: '/404' },  
  ]
})

