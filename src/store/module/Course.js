import http from "../../http-common";
import profileManager from "./ProfileManager";
const courseManament = {
  state: {
    courses: [],
    course: {},
    pagingCourse: {},
  },
  getters: {
    getCourses: (state) => {
      return state.courses;
    },
    getPagingCourse: (state) => {
      return state.pagingCourse;
    },
  },
  mutations: {
    setCourses(state, courses) {
      if (courses != undefined) {
        state.courses = courses;
      } else {
        state.courses = [];
      }
    },
    setPagingCourse(state, paging) {
      state.pagingCourse = paging;
    },
    updateCourse(state, course) {
      const index = state.courses.findIndex((c) => c.id == course.id);
      if (index != -1) {
        state.courses.splice(index, 1, course);
      }
    },
  },
  actions: {
    async getAllCoursesByAdmin(context, filter) {
      try {
        const response = await http.get(`/courses/filter`, {
          params: {
            ManagerId: filter.managerId,
            SubjectName: filter.subjectName,
            CourseName: filter.courseName,
            TutorName: filter.tutorName,
            Status: filter.status,
            FromDate: filter.fromDate,
            ToDate: filter.toDate,
            PageNumber: filter.pageNumber,
          },
        });

        if (response.status != 404) {
          let courses = response.data.data;
          let paging = response.data;
          context.commit("setCourses", courses);
          context.commit("setPagingCourse", paging);
        }
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async disableCourseStatus(context, course) {
      let data = {};
      if (course.status == "Pending") {
        data = {
          description: course.description,
          status: "Denied",
          id: course.id,
          name: course.name,
          beginTime: course.beginTime,
          endTime: course.endTime,
          studyFee: course.studyFee,
          daysInWeek: course.daysInWeek,
          beginDate: course.beginDate,
          endDate: course.endDate,
          classHasSubjectId: course.classHasSubjectId,
          confirmedBy: course.confirmedBy,
          confirmedDate: course.confirmedDate,
          createdBy: course.createdBy,
          createdDate: course.createdDate,
          maxTutee: course.maxTutee,
          location: course.location,
          extraImages: course.extraImages,
        };
      } else {
        data = {
          description: course.description,
          status: "Inactive",
          id: course.id,
          name: course.name,
          beginTime: course.beginTime,
          endTime: course.endTime,
          studyFee: course.studyFee,
          daysInWeek: course.daysInWeek,
          beginDate: course.beginDate,
          endDate: course.endDate,
          classHasSubjectId: course.classHasSubjectId,
          confirmedBy: course.confirmedBy,
          confirmedDate: course.confirmedDate,
          createdBy: course.createdBy,
          createdDate: course.createdDate,
          maxTutee: course.maxTutee,
          location: course.location,
          extraImages: course.extraImages,
        };
      }
      const response = await http.put(`/courses/${course.id}`, data);
      if (response.status == 204) {
        if (course.status == "Pending") {
          course.status = "Denied";
        } else {
          course.status = "Inactive";
        }
        context.commit("updateCourse", course);
      }
      return response;
    },
    async enableCourseStatus(context, course) {
      let data = {
        description: course.description,
        status: "Unpaid",
        id: course.id,
        name: course.name,
        beginTime: course.beginTime,
        endTime: course.endTime,
        studyFee: course.studyFee,
        daysInWeek: course.daysInWeek,
        beginDate: course.beginDate,
        endDate: course.endDate,
        classHasSubjectId: course.classHasSubjectId,
        confirmedBy: course.confirmedBy,
        confirmedDate: course.confirmedDate,
        createdBy: course.createdBy,
        createdDate: course.createdDate,
        maxTutee: course.maxTutee,
        location: course.location,
        extraImages: course.extraImages,
      };

      const response = await http.put(`/courses/${course.id}`, data);
      if (response.status == 204) {
        course.status = "Unpaid";
        course.confirmerName = profileManager.state.account.fullname;
        context.commit("updateCourse", course);
      }
      return response;
    },
    async getCourseByTutorIdAction(context, tutorId) {
      let url = `/courses/check-course-by-tutor/${tutorId}`;
      try {
        const res = await http.get(url);
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    async getCountCourseByClassHasSubjectAction(context, id) {
      let url = `courses/check-course-by-class-has-subject?id=${id}`;
      try {
        const res = await http.get(url);
        if (res.status === 200) {
          return res;
        } else {
          return 0;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
export default courseManament;
