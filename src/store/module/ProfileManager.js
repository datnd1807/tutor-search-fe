import http from "../../http-common";
const profiles = {
  state: {
    account: {},
  },
  getters: {
    getAccountManager: (state) => {
      return state.account;
    },
  },
  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
  },
  actions: {
    async getAccountManagerById(context, managerId) {
      const response = await http.get(`/managers/${managerId}`);
      if (response.status == 200) {
        let account = response.data;
        context.commit("setAccount", account);
      }
      return response;
    },
    updateAccount(context, account) {
      return new Promise((resolve) => {
        http
          .put("/managers/" + account.id, {
            fullname: account.fullname,
            description: account.description,
            gender: account.gender,
            birthday: account.birthday,
            email: account.email,
            phone: account.phone,
            address: account.address,
            id: account.id,
            roleId: account.roleId,
            status: account.status,
            avatarImageLink: account.avatarImageLink,
            createdBy: account.createdBy,
          })
          .then((response) => {
            context.commit("setAccount", account);
            resolve(response.status);
          });
      });
    },
  },
};
export default profiles;
