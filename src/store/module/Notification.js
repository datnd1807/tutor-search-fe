import http from "../../http-common";
const notification = {
    state: {
        notifi: {
            id: 0,
            message: "",
            title: "",
            sendToUser: "",
            isRead: false
        }
    },
    getters: {
        getNotification: (state) => {
            return state.notifi
        }
    },
    mutations: {
        setNotification(state, notification) {
            state.notifi = notification
        }
    },
    actions: {
        async insertNotificationMessageAction(context) {
            let url = '/notifications'
            let data = {
                title: context.state.notifi.title,
                message: context.state.notifi.message,
                sendToUser: context.state.notifi.sendToUser,
                isRead: false
            }
            try {
                const res = await http.post(url, data)
                return res
            } catch (error) {
                console.log(error);
            }
        }
    }
}

export default notification