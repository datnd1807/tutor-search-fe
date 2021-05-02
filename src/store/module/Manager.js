import http from "../../http-common";
const managerManagement = {
  state: {
    managers: [],
    pagingManager: {},
    manager: {},
  },
  getters: {
    getManagers: (state) => {
      return state.managers;
    },
    getPagingManager: (state) => {
      return state.pagingManager;
    },
    getManager: (state) => {
      return state.manager;
    },
  },
  mutations: {
    setManagers(state, managers) {
      if (managers != undefined) {
        state.managers = managers;
      } else {
        state.managers = [];
      }
    },
    setManager(state, manager) {
      state.manager = manager;
    },
    setPagingManager(state, paging) {
      state.pagingManager = paging;
    },
    updateManager(state, managers) {
      const index = state.managers.findIndex((m) => m.id == managers.id);
      if (index != -1) {
        state.managers.splice(index, 1, managers);
      }
    },
  },
  actions: {
    async getAllManagers(context, filter) {
      const response = await http.get(`/managers/filter`, {
        params: {
          ManagerName: filter.managerName,
          Status: filter.status,
          Email: filter.email,
          PageNumber: filter.pageNumber,
        },
      });
      if (response.status != 404) {
        let manager = response.data.data;
        let paging = response.data;
        context.commit("setManagers", manager);
        context.commit("setPagingManager", paging);
      }
      return response;
    },
    async disableStatusManager(context, manager) {
      const response = await http.put(`/managers/${manager.id}`, {
        description: manager.description,
        status: "Inactive",
        fullname: manager.fullname,
        gender: manager.gender,
        birthday: manager.birthday,
        email: manager.email,
        phone: manager.phone,
        avatarImageLink: manager.avatarImageLink,
        address: manager.address,
        roleId: manager.roleId,
        id: manager.id,
        createdBy: manager.createdBy,
      });
      if (response.status == 204) {
        manager.status = "Inactive";
        context.commit("updateManager", manager);
      }
      return response;
    },
    async enableStatusManager(context, manager) {
      const response = await http.put(`/managers/${manager.id}`, {
        description: manager.description,
        status: "Active",
        fullname: manager.fullname,
        gender: manager.gender,
        birthday: manager.birthday,
        email: manager.email,
        phone: manager.phone,
        avatarImageLink: manager.avatarImageLink,
        address: manager.address,
        roleId: manager.roleId,
        id: manager.id,
        createdBy: manager.createdBy,
      });
      if (response.status == 204) {
        manager.status = "Active";
        context.commit("updateManager", manager);
      }

      return response;
    },
    async insertManager(context, manager) {
      try {
        const response = await http.post(`/managers`, {
          description: manager.description,
          status: manager.status,
          fullname: manager.fullname,
          gender: manager.gender,
          birthday: manager.birthday,
          email: manager.email,
          phone: manager.phone,
          avatarImageLink: manager.avatarImageLink,
          address: manager.address,
          roleId: manager.roleId,
          createdBy: manager.createdBy,
        });

        if (response.status == 204) {
          var filter = {
            pageNumber: 1,
          };
          await context.dispatch("getAllManagers", filter);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async insertAccountManager(context, account) {
      try {
        const response = await http.post(`/accounts`, {
          description: account.description,
          status: account.status,
          email: account.email,
          roleId: account.roleId,
        });

        if (response.status == 204) {
          await context.dispatch("insertManager", account);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    },
    async checkMailExisted(context, account) {
      const response = await http.get(
        `accounts/check-email-exist/${account.email}`
      );
      if (response.data == false) {
        await context.dispatch("insertAccountManager", account);
        return response.data;
      } else {
        return response.data;
      }
    },
    async getManagerByMail(context, mail) {
      const response = await http.get(`/managers/email/${mail}`);
      return response;
    },
    async getManagerById(context, managerId) {
      const response = await http.get(`managers/${managerId}`);
      if (response.status == 200) {
        let manager = response.data;
        context.commit("setManager", manager);
      }
      return response;
    },
    async updateProfileManager(context, manager) {
      const response = await http.put(`managers/${manager.id}`, {
        fullname: manager.fullname,
        description: manager.description,
        gender: manager.gender,
        birthday: manager.birthday,
        email: manager.email,
        phone: manager.phone,
        address: manager.address,
        id: manager.id,
        roleId: manager.roleId,
        status: manager.status,
        avatarImageLink: manager.avatarImageLink,
        createdBy: manager.createdBy,
        createdDate: manager.createdDate,
      });
      if (response.status == 204) {
        context.commit("updateManager", manager);
      }
      return response;
    },
    async getManagerByStatusAction(context, status) {
      let url = `managers/get-by-status?status=${status}`;
      try {
        const res = await http.get(url);
        if (res.status === 200) {
          context.commit("setManagers", res.data);
        } else {
          let data = [];
          context.commit("setManagers", data);
        }
        return res;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default managerManagement;
