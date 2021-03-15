import Vuex from 'vuex'
import Vue from 'vue'
import ProfileManager from './modules/ProfileManager'
import CourseManagement from './modules/CourseManagement'
import TutorManagement from './modules/TutorManagement'
import FeedbackManagement from './modules/FeedbackManagement'
import Accounts from './modules/Accounts'
import Roles from './modules/Roles'
import Classes from './modules/Classes'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        ProfileManager,
        CourseManagement,
        TutorManagement,
        FeedbackManagement,
        Accounts,
        Roles,
        Classes
    }
})