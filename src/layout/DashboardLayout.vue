<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground">
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'el-icon-s-home text-blue',
            path: '/dashboard',
          }"
        />
        <el-badge is-dot :hidden="notiCourse" class="item">
          <sidebar-item
            :link="{
              name: 'Courses',
              icon: 'el-icon-s-management text-blue',
              path: '/courses',
            }"
          />
        </el-badge>
        <sidebar-item
          v-if="roleManager === 1"
          :link="{
            name: 'Classes and Subjects',
            icon: 'el-icon-s-platform text-blue',
            path: '/classes',
          }"
        />
        <el-badge is-dot :hidden="notiTutor" class="item">
          <sidebar-item
            :link="{
              name: 'Tutors',
              icon: 'el-icon-user-solid text-blue',
              path: '/tutors',
            }"
          />
        </el-badge>
        <sidebar-item
          :link="{
            name: 'Tutees',
            icon: 'el-icon-user-solid text-blue',
            path: '/tutees',
          }"
        />
        <el-badge is-dot :hidden="notiFeedback" class="item">
          <sidebar-item
            :link="{
              name: 'Feedbacks',
              icon: 'el-icon-s-claim text-blue',
              path: '/feedbacks',
            }"
          />
        </el-badge>
        <sidebar-item
          v-if="roleManager === 1"
          :link="{
            name: 'Membership and Fees',
            icon: 'el-icon-s-finance text-blue',
            path: '/membership',
          }"
        />
        <sidebar-item
          v-if="roleManager === 1"
          :link="{
            name: 'Managers',
            icon: 'el-icon-s-custom text-blue',
            path: '/manager',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar :dataProfile="dataProfile"></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";
import _ from "lodash";
import { mapActions, mapGetters } from "vuex";
import VueCookies from "vue-cookies";
export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  computed: {
    ...mapGetters([
      "getCourses",
      "getTutorsPending",
      "getFeedback",
      "getAccountManager",
      "getTutorsUpdating",
    ]),
    lengthTutorPending() {
      return this.getTutorsPending;
    },
    lengthTutorUpdate() {
      return this.getTutorsUpdating;
    },
    lengthFeedbackPending() {
      return this.getFeedback;
    },
    lengthCoursePending() {
      var coursePending = "";
      return _.filter(this.getCourses, function (data) {
        coursePending = data.status.includes("Pending");
        return coursePending;
      });
    },
    roleManager() {
      return JSON.parse(localStorage.getItem("user")).roleId;
    },
    notiCourse() {
      if (this.lengthCoursePending.length == 0) {
        return JSON.parse(localStorage.notiCourse);
      } else {
        return false;
      }
    },
    notiTutor() {
      if (
        this.lengthTutorPending.length == 0 &&
        this.lengthTutorUpdate.length == 0
      ) {
        return JSON.parse(localStorage.notiTutor);
      } else {
        return false;
      }
    },
    notiFeedback() {
      if (this.lengthFeedbackPending.length == 0) {
        return JSON.parse(localStorage.notiFeedback);
      } else {
        return false;
      }
    },
    dataProfile() {
      return this.getAccountManager;
    },
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
      links: [
        {
          name: "Accounts Management",
          icon: "ni ni-single-02 text-blue",
          path: "/accounts",
        },
        {
          name: "Managers Management",
          icon: "ni ni-single-02 text-blue",
          path: "/managers",
        },
      ],
      filter: {},
    };
  },
  methods: {
    ...mapActions([
      "getAllCoursesByAdmin",
      "getTutorPending",
      "getFeedbacks",
      "getAllFeedbacks",
      "getAllTutorsByAdmin",
      "getAllTutees",
      "getTotalTuteeInMonth",
      "getTotalTutorInMonth",
      "getAllTutorsUpdating",
      "getTotalTutor",
      "getAccountManagerById",
    ]),
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    async init() {
      if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
        this.filter.managerId = JSON.parse(localStorage.getItem("user")).id;
        this.getAllCoursesByAdmin(this.filter);
        this.getFeedbacks(JSON.parse(localStorage.getItem("user")).id);
        this.getAllTutorsByAdmin(this.filter);
      } else {
        this.getAllFeedbacks();
        this.getAllCoursesByAdmin("");
        this.getAllTutorsByAdmin("");
      }
      this.getTotalTutorInMonth();
      this.getTotalTuteeInMonth();
      this.getTutorPending();
      this.getAllTutorsUpdating();
      this.getAllTutees(this.filter);
      this.getTotalTutor();
      this.getAccountManagerById(JSON.parse(localStorage.getItem("user")).id);
    },
  },
  created() {
    if (VueCookies.get("token") != null) {
      (localStorage.notiCourse = true),
        (localStorage.notiTutor = true),
        (localStorage.notiFeedback = true);
      this.init();
    }
  },
  // async mounted() {
  //   await this.init();
  // },
};
</script>
<style lang="scss" scoped>
.item {
  margin-right: 30px;
}
</style>
