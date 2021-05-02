import http from "../../http-common";
const tutorManagement = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getTokenAccount(context, email) {
      const response = await http.post(
        `auth/authenticate`,
        {},
        {
          params: { email },
        }
      );
      return response;
    },
  },
};
export default tutorManagement;
