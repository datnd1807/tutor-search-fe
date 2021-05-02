import http from "../../http-common";

const feedbackManagement = {
  state: {
    feedbacks: [],
  },
  getters: {
    getFeedback: (state) => {
      if (state.feedbacks.length != 0) {
        return state.feedbacks.sort((a, b) => {
          if (
            new Date(a.createdDate).getTime() >
            new Date(b.createdDate).getTime()
          )
            return -1;
          else if (
            new Date(a.createdDate).getTime() <
            new Date(b.createdDate).getTime()
          )
            return 1;
          else return 0;
        });
      } else {
        return [];
      }
    },
  },
  mutations: {
    setFeedback(state, feedbacks) {
      if (feedbacks.length != 0) return (state.feedbacks = feedbacks);
      else return (state.feedbacks = []);
    },
  },
  actions: {
    async getFeedbacks(context, managerId) {
      const response = await http.get(`/feedbacks/manager/${managerId}`);
      if (response.status == 200) {
        let feedbacks = response.data;
        context.commit("setFeedback", feedbacks);
      }
      return response;
    },
    async getAllFeedbacks(context) {
      const response = await http.get(`/feedbacks/all`);
      if (response.status == 200) {
        let feedbacks = response.data;
        context.commit("setFeedback", feedbacks);
      }
      return response;
    },
    async acceptFeedbackTutee(context, feedback) {
      const response = await http.put(`/feedbacks/${feedback.id}`, {
        id: feedback.id,
        tuteeId: feedback.tuteeId,
        tutorId: feedback.tutorId,
        comment: feedback.comment,
        rate: feedback.rate,
        description: feedback.description,
        createdDate: feedback.createdDate,
        confirmedDate: feedback.confirmedDate,
        tuteeName: feedback.tuteeName,
        tutorName: feedback.tutorName,
        confirmedBy: feedback.confirmedBy,
        status: "Active",
      });
      if (response.status == 204) {
        if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
          context.dispatch(
            "getFeedbacks",
            JSON.parse(localStorage.getItem("user")).id
          );
        } else {
          await context.dispatch("getAllFeedbacks");
        }
      }
      return response;
    },
    async deniesFeedbackTutee(context, feedback) {
      const response = await http.delete(`/feedbacks/${feedback.id}`);
      if (response.status == 200) {
        if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
          await context.dispatch(
            "getFeedbacks",
            JSON.parse(localStorage.getItem("user")).id
          );
        } else {
          await context.dispatch("getAllFeedbacks");
        }
      }
      return response;
    },
  },
};
export default feedbackManagement;
