import http from "../../http-common";
const membership = {
  state: {
    memberships: [],
    membership: {
      description: "",
      status: "Active",
      id: 0,
      name: "",
      pointRate: 0,
      pointAmount: 0,
      updaterFullname: "",
      updatedDate: "",
      creatorFullname: "",
      createdDate: "",
    },
    fees: [],
    fee: {
      description: "",
      status: "Active",
      id: 0,
      name: "",
      price: 0,
      updaterFullname: "",
      updatedDate: "",
      creatorFullname: "",
      createdDate: "",
    },
    commissions: [],
    commission: {
      description: "",
      status: "Active",
      id: 0,
      name: "",
      rate: 0,
      updaterFullname: "",
      updatedDate: "",
      creatorFullname: "",
      createdDate: "",
    },
  },
  getters: {
    getMemberships: (state) => {
      return state.memberships;
    },
    getMembership: (state) => {
      return state.membership;
    },
    getFees: (state) => {
      return state.fees;
    },
    getFee: (state) => {
      return state.fee;
    },
    getCommissions: (state) => {
      return state.commissions;
    },
    getCommission: (state) => {
      return state.commission;
    },
  },
  mutations: {
    setMemberships(state, membership) {
      return (state.memberships = membership);
    },
    setMembership(state, membership) {
      return (state.membership = membership);
    },
    updateMembership(state, membership) {
      const index = state.memberships.findIndex((m) => m.id == membership.id);
      if (index != -1) {
        state.memberships.splice(index, 1, membership);
      }
    },
    insertMembership(state, membership) {
      state.memberships.splice(state.membership.length - 1, 0, membership);
    },
    setFees(state, fee) {
      return (state.fees = fee);
    },
    setFee(state, fee) {
      return (state.fee = fee);
    },
    updateFee(state, fee) {
      const index = state.fees.findIndex((f) => f.id == fee.id);
      if (index != -1) {
        state.fees.splice(index, 1, fee);
      }
    },
    insertFee(state, fee) {
      state.fees.splice(state.fee.length - 1, 0, fee);
    },
    setCommissions(state, commissions) {
      return (state.commissions = commissions);
    },
    setCommission(state, commission) {
      return (state.commission = commission);
    },
    updateCommission(state, commission) {
      const index = state.commissions.findIndex((c) => c.id == commission.id);
      if (index != -1) {
        state.commissions.splice(index, 1, commission);
      }
    },
    insertCommission(state, commission) {
      state.commissions.splice(state.commission.length - 1, 0, commission);
    },
  },
  actions: {
    getAllMembership(context) {
      http.get("/memberships/all").then((response) => {
        let membership = response.data;
        context.commit("setMemberships", membership);
      });
    },
    async getMembershipById(context, membershipId) {
      const response = await http.get(`memberships/${membershipId}`);
      if (response.status == 200) {
        let membership = response.data;
        context.commit("setMembership", membership);
      }
      return response;
    },
    saveMembership(context, membership) {
      return new Promise((resolve) => {
        http
          .put(`/memberships/${membership.id}`, {
            description: membership.description,
            status: membership.status,
            id: membership.id,
            name: membership.name,
            pointRate: membership.pointRate,
            pointAmount: membership.pointAmount,
            updatedDate: membership.updatedDate,
            updatedBy: membership.updatedBy,
            createdBy: membership.createdBy,
            createdDate: membership.createdDate,
          })
          .then((response) => {
            if (response.status == 204) {
              context.commit(
                "updateMembership",
                JSON.parse(response.config.data)
              );
              context.dispatch("getAllMembership");
            }
            resolve(response.status);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      });
    },
    createMembership(context, membership) {
      return new Promise((resolve) => {
        http
          .post(`/memberships/`, {
            description: membership.description,
            status: membership.status,
            name: membership.name,
            pointRate: membership.pointRate,
            pointAmount: membership.pointAmount,
            updatedDate: membership.updatedDate,
            updatedBy: membership.updatedBy,
            createdBy: membership.createdBy,
            createdDate: membership.createdDate,
          })
          .then((response) => {
            if (response.status == 204) {
              context.commit(
                "insertMembership",
                JSON.parse(response.config.data)
              );
              context.dispatch("getAllMembership");
            }
            resolve(response.status);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      });
    },
    getAllFee(context) {
      http.get("/fees/all").then((response) => {
        let fee = response.data;
        context.commit("setFees", fee);
      });
    },
    async getFeeById(context, feeId) {
      const response = await http.get(`fees/${feeId}`);
      if (response.status == 200) {
        let fee = response.data;
        context.commit("setFee", fee);
      }
      return response;
    },
    saveFee(context, fee) {
      return new Promise((resolve) => {
        http
          .put(`/fees/${fee.id}`, {
            description: fee.description,
            status: fee.status,
            id: fee.id,
            name: fee.name,
            price: fee.price,
            updatedDate: fee.updatedDate,
            updatedBy: fee.updatedBy,
            createdBy: fee.createdBy,
            createdDate: fee.createdDate,
          })
          .then((response) => {
            if (response.status == 204) {
              context.commit("updateFee", JSON.parse(response.config.data));
              context.dispatch("getAllFee");
            }
            resolve(response.status);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      });
    },
    createFee(context, fee) {
      return new Promise((resolve) => {
        http
          .post(`/fees/`, {
            description: fee.description,
            status: fee.status,
            name: fee.name,
            price: fee.price,
            updatedDate: fee.updatedDate,
            updatedBy: fee.updatedBy,
            createdBy: fee.createdBy,
            createdDate: fee.createdDate,
          })
          .then((response) => {
            if (response.status == 204) {
              context.commit("insertFee", JSON.parse(response.config.data));
              context.dispatch("getAllFee");
            }
            resolve(response.status);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      });
    },
    getAllCommission(context) {
      http.get("/commissions/all").then((response) => {
        let commissions = response.data;
        context.commit("setCommissions", commissions);
      });
    },
    async getCommissionById(context, commissionId) {
      const response = await http.get(`commissions/${commissionId}`);
      if (response.status == 200) {
        let commission = response.data;
        context.commit("setCommission", commission);
      }
      return response;
    },
    saveCommission(context, commission) {
      return new Promise((resolve) => {
        http
          .put(`/commissions/${commission.id}`, {
            description: commission.description,
            status: commission.status,
            id: commission.id,
            name: commission.name,
            rate: commission.rate,
            updatedDate: commission.updatedDate,
            updatedBy: commission.updatedBy,
            createdBy: commission.createdBy,
            createdDate: commission.createdDate,
          })
          .then((response) => {
            if (response.status == 204) {
              context.commit(
                "updateCommission",
                JSON.parse(response.config.data)
              );
              context.dispatch("getAllCommission");
            }
            resolve(response.status);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      });
    },
    createCommission(context, commission) {
      return new Promise((resolve) => {
        http
          .post(`/commissions/`, {
            description: commission.description,
            status: commission.status,
            name: commission.name,
            rate: commission.rate,
            updatedDate: commission.updatedDate,
            updatedBy: commission.updatedBy,
            createdBy: commission.createdBy,
            createdDate: commission.createdDate,
          })
          .then((response) => {
            if (response.status == 204) {
              context.commit(
                "insertCommission",
                JSON.parse(response.config.data)
              );
              context.dispatch("getAllCommission");
            }
            resolve(response.status);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      });
    },
  },
};
export default membership;
