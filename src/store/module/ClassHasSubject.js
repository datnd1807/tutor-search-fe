import http from '../../http-common'
const classHasSubject = {
    state:{
        classHasSubject:[],
        classHasSubjectObj:{}
    },
    getters:{
        getClassHasSubject:(state)=>{
            return state.classHasSubject
        },
        getClassHasSubjectObj:(state) =>{
            return state.classHasSubjectObj
        }
    },
    mutations:{
        setClassHasSubject(state, data){
            state.classHasSubject = data
        },
        setClassHasSubjectObj(state, data){
            state.classHasSubjectObj = data
        }
    },
    actions:{
        async getClassHasSubjectsAction(context, filter){
            let url = '/class-has-subject/filter'
            try{
                const res =await http.get(url,{params: filter})
                if(res.status == 200){
                    context.commit('setClassHasSubject', res.data)
                    return res
                }
                
            }catch(err){
                console.log(err);
            }
        },
        async inactiveClassHasSubjectAction(context, id){
            let url = `class-has-subject/inactive/${id}`
            try {
                const res = await http.put(url)
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async activeClassHasSubjectAction(context, id){
            let url = `class-has-subject/active/${id}`
            try {
                const res = await http.put(url)
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async getClassHasSubjectByIdAction(context, id) {
            let url = `/class-has-subject/subject/${id}`
            try {
                const response = await http.get(url)
                if (response.status === 200) {
                    context.commit('setClassHasSubject', response.data)
                }else{
                    context.commit('setClassHasSubject',[])
                }
                return response
            } catch (error) {
                console.log(error);
            }
        },
        async insertClassHasSubjectAction(context) {
            let url = `class-has-subject`
            let data = {
                classId: context.state.classHasSubjectObj.classId,
                subjectId: context.state.classHasSubjectObj.subjectId,
                status: 'Active',
                createdBy: context.state.classHasSubjectObj.createdBy
            }
            try {
                const res = await http.post(url, data)
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async getClassHasSubjectACtion(context) {
            try {
                const response = await http.get('/class-has-subject/all')
                if (response.status === 200) {
                    context.commit('setClassHasSubject', response.data)
                }
                return response
            } catch (error) {
                console.log(error);
            }
        },
        async getCountClassHasSubjectByClassAction(context, classId){
            let url = `class-has-subject/check-by-class?id=${classId}`
            try {
                const res = await http.get(url)
                if(res.status === 200){
                    return res
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getCountClassHasSubjectBySubjectAction(context, subjectId){
            let url = `class-has-subject/check-by-subject?id=${subjectId}`
            try {
                const res = await http.get(url)
                if(res.status === 200){
                    return res
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
export default classHasSubject