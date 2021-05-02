import http from "../../http-common";
const tutorManagement = {
  state: {
    tutors: [],
    pagingTutor: [],
    tutorsPending: [],
    tutorsUpdating: [],
    totalTutorInMonth: 0,
    totalTutor: 0,
  },
  getters: {
    getTutors: (state) => {
      return state.tutors;
    },
    getPagingTutor: (state) => {
      return state.pagingTutor;
    },
    getTutorsPending: (state) => {
      if (state.tutorsPending.length != 0) {
        return state.tutorsPending.sort((a, b) => {
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
    getTutorsUpdating: (state) => {
      if (state.tutorsUpdating.length != 0) {
        return state.tutorsUpdating.sort((a, b) => {
          if (
            new Date(a.requestUpdateDate).getTime() >
            new Date(b.requestUpdateDate).getTime()
          )
            return -1;
          else if (
            new Date(a.requestUpdateDate).getTime() <
            new Date(b.requestUpdateDate).getTime()
          )
            return 1;
          else return 0;
        });
      } else {
        return [];
      }
    },
    getTutorInMonth: (state) => {
      return state.totalTutorInMonth;
    },
    getNumberTutor: (state) => {
      return state.totalTutor;
    },
  },
  mutations: {
    setTutors(state, tutors) {
      if (tutors != undefined) {
        state.tutors = tutors;
      } else {
        state.tutors = [];
      }
    },
    setPagingTutor(state, paging) {
      state.pagingTutor = paging;
    },
    setTutorPending(state, tutors) {
      if (tutors != "") {
        state.tutorsPending = tutors;
      } else {
        state.tutorsPending = [];
      }
    },
    setTutorUpdating(state, tutors) {
      if (tutors != "") {
        state.tutorsUpdating = tutors;
      } else {
        state.tutorsUpdating = [];
      }
    },
    setTotalTutorInMonth(state, totalTutorInMonth) {
      state.totalTutorInMonth = totalTutorInMonth;
    },
    updateTutors(state, tutor) {
      const index = state.tutors.findIndex((t) => t.id == tutor.id);
      if (index != -1) {
        state.tutors.splice(index, 1, tutor);
      }
    },
    getAllTutor(state, total) {
      state.totalTutor = total;
    },
  },
  actions: {
    async getAllTutorsByAdmin(context, filter) {
      const response = await http.get(`/tutors/filter`, {
        params: {
          TutorName: filter.tutorName,
          Email: filter.email,
          Status: filter.status,
          ManagerId: filter.managerId,
          PageNumber: filter.pageNumber,
        },
      });
      if (response.status != 404) {
        let tutors = response.data.data;
        let paging = response.data;
        context.commit("setTutors", tutors);
        context.commit("setPagingTutor", paging);
      }
      return response;
    },
    async denyTutorPending(context, tutor) {
      const response = await http.put(`/tutors/${tutor.id}`, {
        id: tutor.id,
        educationLevel: tutor.educationLevel,
        school: tutor.school,
        points: tutor.points,
        membershipId: tutor.membershipId,
        socialIdUrl: tutor.socialIdUrl,
        certificationUrl: tutor.certificationUrl,
        fullname: tutor.fullname,
        gender: tutor.gender,
        birthday: tutor.birthday,
        email: tutor.email,
        phone: tutor.phone,
        avatarImageLink: tutor.avatarImageLink,
        address: tutor.address,
        roleId: tutor.roleId,
        description: tutor.description,
        confirmedDate: tutor.confirmedDate,
        confirmedBy: tutor.confirmedBy,
        status: "Denied",
        createdDate: tutor.createdDate,
      });
      if (response.status == 204) {
        if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
          var filter = {
            managerId: JSON.parse(localStorage.getItem("user")).id,
          };
          context.dispatch("getAllTutorsByAdmin", filter);
        } else {
          context.dispatch("getAllTutorsByAdmin", "");
        }
      }
      await context.dispatch("getTutorPending");
      return response;
    },
    async enableTutorPending(context, tutor) {
      const response = await http.put(`/tutors/${tutor.id}`, {
        id: tutor.id,
        educationLevel: tutor.educationLevel,
        school: tutor.school,
        points: tutor.points,
        membershipId: tutor.membershipId,
        socialIdUrl: tutor.socialIdUrl,
        certificationUrl: tutor.certificationUrl,
        fullname: tutor.fullname,
        gender: tutor.gender,
        birthday: tutor.birthday,
        email: tutor.email,
        phone: tutor.phone,
        avatarImageLink: tutor.avatarImageLink,
        address: tutor.address,
        roleId: tutor.roleId,
        description: tutor.description,
        confirmedDate: tutor.confirmedDate,
        confirmedBy: tutor.confirmedBy,
        status: "Active",
        createdDate: tutor.createdDate,
      });
      if (response.status == 204) {
        if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
          var filter = {
            managerId: JSON.parse(localStorage.getItem("user")).id,
          };
          context.dispatch("getAllTutorsByAdmin", filter);
        } else {
          context.dispatch("getAllTutorsByAdmin", "");
        }
      }
      await context.dispatch("getTutorPending");
      return response;
    },
    async enableTutorStatus(context, tutor) {
      const response = await http.put(`/tutors/${tutor.id}`, {
        id: tutor.id,
        educationLevel: tutor.educationLevel,
        school: tutor.school,
        points: tutor.points,
        membershipId: tutor.membershipId,
        socialIdUrl: tutor.socialIdUrl,
        certificationUrl: tutor.certificationUrl,
        fullname: tutor.fullname,
        gender: tutor.gender,
        birthday: tutor.birthday,
        email: tutor.email,
        phone: tutor.phone,
        avatarImageLink: tutor.avatarImageLink,
        address: tutor.address,
        roleId: tutor.roleId,
        description: tutor.description,
        confirmedDate: tutor.confirmedDate,
        confirmedBy: tutor.confirmedBy,
        status: "Active",
        createdDate: tutor.createdDate,
      });
      if (response.status == 204) {
        await context.dispatch("getTutorPending");
        tutor.status = "Active";
        context.commit("updateTutors", tutor);
      }
      return response;
    },
    async disableTutorStatus(context, tutor) {
      try {
        let url = `/tutors/deactive/param?tutorId=${tutor.id}&managerId=${
          JSON.parse(localStorage.getItem("user")).id
        }`;
        const response = await http.put(url);
        if (response.status == 204) {
          (tutor.status = "Inactive"), context.commit("updateTutors", tutor);
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async getTutorPending(context) {
      const response = await http.get(`/tutors/status/Pending`);
      let tutors = response.data;
      context.commit("setTutorPending", tutors);
    },
    async getAllTutorsUpdating(context) {
      const response = await http.get(`/tutor-update-profile/all`);
      let tutors = response.data;
      if (response.status == 200) {
        context.commit("setTutorUpdating", tutors);
      }
      return response;
    },
    async enableTutorUpdating(context, tutor) {
      try {
        let response = await http.put(`/tutors/${tutor.id}`, {
          id: tutor.id,
          fullname: tutor.fullname,
          gender: tutor.gender,
          birthday: tutor.birthday,
          phone: tutor.phone,
          avatarImageLink: tutor.avatarImageLink,
          address: tutor.address,
          educationLevel: tutor.educationLevel,
          school: tutor.school,
          socialIdUrl: tutor.socialIdUrl,
          email: tutor.email,
          description: tutor.description,
          confirmedDate: tutor.confirmedDate,
          confirmedBy: tutor.confirmedBy,
          createdDate: tutor.createdDate,
          status: "Active",
          points: tutor.points,
          membershipId: tutor.membershipId,
          roleId: tutor.roleId,
        });
        if (response.status == 204) {
          const resImage = await context.dispatch("deleteImageByEmail", tutor);
          if (resImage.indexOf(400) < 0 && resImage.indexOf(500) < 0) {
            const response = await context.dispatch(
              "disableTutorUpdating",
              tutor
            );
            if (response.status == 204) {
              const response = await context.dispatch("getAllTutorsUpdating");
              if (response.status == 200) {
                if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
                  var filter = {
                    managerId: JSON.parse(localStorage.getItem("user")).id,
                  };
                  await context.dispatch("getAllTutorsByAdmin", filter);
                } else {
                  await context.dispatch("getAllTutorsByAdmin", "");
                }
              }
              return response;
            }
          }
        }
        return response;
      } catch (error) {
        console.log();
      }
    },
    async disableTutorUpdating(context, tutor) {
      const response = await http.delete(`/tutor-update-profile/${tutor.id}`);
      if (response.status == 204) {
        if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
          var filter = {
            managerId: JSON.parse(localStorage.getItem("user")).id,
          };
          context.dispatch("getAllTutorsByAdmin", filter);
        } else {
          context.dispatch("getAllTutorsByAdmin", "");
        }
        await context.dispatch("getAllTutorsUpdating");
      }
      return response;
    },
    getTotalTutorInMonth(context) {
      http.get(`/tutors/get-count-tutor-in-month`).then((response) => {
        context.commit("setTotalTutorInMonth", response.data);
      });
    },
    getTotalTutor(context) {
      http.get(`/tutors/count`).then((response) => {
        context.commit("getAllTutor", response.data);
      });
    },
  },
};
export default tutorManagement;
