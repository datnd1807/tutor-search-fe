import { Promise, resolve } from 'core-js'
import http from '../../http-common'

const classes = {
    state: {
        classes: [], // list of classes
        classData: {}, // filterd paging response data
        classObj:{}
    },
    getters: {
        getClasses: (state) => {
            return state.classes
        },
        getClassData: (state) => {
            return state.classData
        },
        getClassObj: (state) =>{
            return state.classObj
        }
    },
    mutations: {
        setClasses(state, classes) {
            state.classes = classes
        },
        setClassData(state, data) {
            state.classData = data
        },
        setClassObj(state, data){
            state.classObj = data
        }
    },
    actions: {
        async getClassByIdAction(context) {
            let url = `/classes/${context.state.classObj.id}`
            try {
                const res = await http.get(url)
                if (res.status === 200) {                 
                    context.commit('setClassObj', res.data)                   
                }
            } catch (error) {
                console.log(error);
            }
        },
        async insertClassAction(context) {
            let url = '/classes'
            let data = {
                name: context.state.classObj.name,
                description: context.state.classObj.description,
                status: context.state.classObj.status,
                updatedBy: context.state.classObj.updatedBy,
                createdBy: context.state.classObj.createdBy
            }
            try {
                const res = await http.post(url, data)
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async updateClassAction(context) {
            let url = `/classes/${context.state.classObj.id}`
            let data = {
                id: context.state.classObj.id,
                name: context.state.classObj.name,
                description: context.state.classObj.description,
                status: context.state.classObj.status,
                updatedBy: context.state.classObj.updatedBy,
                createdBy: context.state.classObj.createdBy,
                createdDate: context.state.classObj.createdDate
            }
            try {
                const res = await http.put(url, data)
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async inactiveClassAction(context) {
            let url = `/classes/deactive/param?classId=${context.state.classObj.id}&managerId=${context.state.classObj.updatedBy}`
            try {
                const res = await http.put(url)
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async checkClassNameExistAction(context, name) {
            let url = `/classes/check-exist`
            try {
                const res = await http.get(url, {params:{name : name}})
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async filterClassAction(context, filter) {
            let url = '/classes/filter'
            try {
                const res = await http.get(url, { params: filter })
                if (res.data) {
                    context.commit('setClassData', res.data)
                } else {
                    let data = {
                        data: [],
                        currentPage: 0,
                        pageSize: 0,
                        totalCount: 0,
                        totalPages: 0
                    }
                    context.commit('setClassData',data)
                }
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async getClassByClassHasSubjectNotExistAction(context, subjectId){
            let url = `classes/get-by-class-has-subject-not-exist?subjectId=${subjectId}`
            try {
                const res = await http.get(url)
                if(res.status === 200){
                    context.commit('setClasses', res.data)
                }else{
                    let data = []
                    context.commit('setClasses', data)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default classes
