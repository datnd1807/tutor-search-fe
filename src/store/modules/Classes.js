
import http from '../../http-common'

const classes = {
    state: {
        classes: [],
        class:{}
    },
    getters: {
        getAllClasses: (state) => {
            return state.classes
        },
        getClass:(state) =>{
            return state.class
        }
    },
    mutations: {
        setClasses(state, classes) {
            state.classes = classes
        }
    },
    actions: {
        getAllClassesAction(context) {
            http.get('/classes/all').then((response) => {
                let classes = response.data
                context.commit('setClasses', classes)
            })
        },
        insertClass(data){
            let url = '/classes'
            http.post(url, data).then((response)=>{
                let status = response.status
                if(status === 200){
                    this.$message({
                        message:"Insert successfully!",type:'success'
                    })
                }else{
                    this.$message({
                        message:"Insert successfully!",type:'error'
                    })
                }
            })
        }
    }
}
export default classes
