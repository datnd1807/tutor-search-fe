import http from '../../http-common'

const subject = {

    state: {
        subjects: [], // list of subjects
        subject: {
            id: 0,
            name: "",
            description: "",
            status: "Active",
            updatedDate: "",
            updatedBy: 0,
            createdDate: "",
            createdBy: 0,
            manageBy: 0,
        },
        subjectObj: {}
    },
    getters: {
        /**
         * get list of subjects
         * @param {*} state 
         * @returns list of subjects
         */
        getAllSubjects: (state) => {
            return state.subjects
        },
        /**
         * get subject
         * @param {*} state 
         * @returns subject
         */
        getSubject: (state) => {
            return state.subject
        },
        getSubjectObj: (state) => {
            return state.subjectObj
        }
    },
    mutations: {
        setSubjects(state, subjects) {
            state.subjects = subjects
        },
        setSubject(state, data) {
            state.subject = data
        },
        setSubjectObj(state, data) {
            state.subjectObj = data
        }
    },
    actions: {
        async getAllSubjectsAction(context) {
            try {
                const result = await http.get('/subjects/all')
                if (result.status === 200)
                    context.commit('setSubjects', result.data)
                return result
            } catch (err) {
                console.log("[SubjectManagement.js] : " + err)
            }
        },
        async getSubjectById(context, id) {
            let url = `/subjects/${id}`
            try {
                const response = await http.get(url)
                if (response.status === 200) {
                    context.commit('setSubject', response.data)
                }
                return response
            } catch (error) {
                console.log(error);
            }
        },
        async insertSubject(context) {
            let url = '/subjects'
            let data = {
                name: context.state.subject.name,
                description: context.state.subject.description,
                status: context.state.subject.status,
                createdBy: context.state.subject.createdBy,
                updatedBy: context.state.subject.updatedBy,
                manageBy: context.state.subject.manageBy
            }
            try {
                const result = await http.post(url, data)
                return result.status
            } catch (error) {
                console.log(error)
            }

        },
        async checkSubjectExistAction(context, name) {
            try {
                let url = `/subjects/check-exist`
                const response = await http.get(url,{params:{name: name}})
                return response
            } catch (error) {
                console.log(error);
            }
        },
        async updateSubject(context) {
            // let time = new Date(context.state.subject.createdDate).toISOString()
            let url = `/subjects/${context.state.subject.id}`
            let data = {
                description: context.state.subject.description,
                status: context.state.subject.status,
                id: context.state.subject.id,
                name: context.state.subject.name,
                updatedBy: context.state.subject.updatedBy,
                createdBy: context.state.subject.createdBy,
                createdDate: context.state.subject.createdDate,
                manageBy: context.state.subject.manageBy,
            }
            try {
                const response = await http.put(url, data)
                return response
            } catch (error) {
                console.log(error);
            }
        },
        async inactiveSubject(context, subject) {
            let url = `subjects/deactive/param?subjectId=${subject.id}&managerId=${subject.updatedBy}`
            try {
                const res = await http.put(url)
                return res
            } catch (error) {
                console.log(error);
            }

        },      
        async getSubjectByTutorId(context, tutorId) {
            const response = await http.get(`/subjects/tutor/${tutorId}`);
            let subject = response.data;
            context.commit("setSubjects", subject);
            return response;
        },        
        async filterSubjectAction(context, filter) {
            let url = 'subjects/filter'
            try {
                const res = await http.get(url, { params: filter })
                if (res.status == 200) {
                    context.commit('setSubjectObj', res.data)
                } else {
                    let result = {
                        data:[],
                        currentPage:0,
                        pageSize:0,
                        totalCount:0,
                        totalPage:0,
                        hasNext:false,
                        hasPrevious: false
                    }
                    context.commit('setSubjectObj', result)
                }
            } catch (error) {
                console.log(error);
            }
        },
        async activeSubjectAction(context, subject){
            let url = `subjects/active?subjectId=${subject.id}&managerId=${subject.updatedBy}`
            try {
                const res = await http.put(url)
                return res
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default subject
