import http from "../../http-common";
const tutorManagement = {
  state: {
    tutees: [],
    totalTuteeInMonth: 0,
    pagingTutee: [],
  },
  getters: {
    getTutees: (state) => {
      return state.tutees;
    },
    getPagingTutee: (state) => {
      return state.pagingTutee;
    },
    getTuteeInMonth: (state) => {
      return state.totalTuteeInMonth;
    },
  },
  mutations: {
    setTutees(state, tutees) {
      if (tutees != undefined) {
        state.tutees = tutees;
      } else {
        state.tutees = [];
      }
    },
    setPagingTutee(state, paging) {
      state.pagingTutee = paging;
    },
    setTotalTuteeInMonth(state, totalTuteeInMonth) {
      state.totalTuteeInMonth = totalTuteeInMonth;
    },
  },
  actions: {
    async getAllTutees(context, filter) {
      const response = await http.get(`/tutees/filter`, {
        params: {
          TuteeName: filter.tuteeName,
          Email: filter.email,
          PageNumber: filter.pageNumber,
        },
      });
      if (response.status != 404) {
        let tutees = response.data.data;
        let paging = response.data;
        context.commit("setTutees", tutees);
        context.commit("setPagingTutee", paging);
      }
      return response
    },
    getTotalTuteeInMonth(context) {
      http.get(`/tutees/get-count-tutee-in-month`).then((response) => {
        context.commit("setTotalTuteeInMonth", response.data);
      });
    },
  },
};
export default tutorManagement;
