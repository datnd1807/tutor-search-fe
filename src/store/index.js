import Vuex from 'vuex'
import Vue from 'vue'
import ProfileManager from './module/ProfileManager'
import Course from './module/Course'
import Tutor from './module/Tutor'
import Feedback from './module/Feedback'
import MembershipAndFee from './module/MembershipAndFee'
import Manager from './module/Manager'
import Account from './module/Account'
import Class from './module/Class'
import Subject from "./module/Subject"
import Image from "./module/Image"
import Transaction from "./module/Transaction"
import Tutee from "./module/Tutee"
import GenerateToken from "./module/GenerateToken"
import Notification from './module/Notification'
import ClassHasSubject from './module/ClassHasSubject'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        ProfileManager,
        Course,
        Tutor,
        Feedback,
        MembershipAndFee,
        Manager,
        Account,
        Class, 
        Subject,
        Image,
        Transaction,
        Tutee,
        GenerateToken,
        Notification,
        ClassHasSubject
    }
})