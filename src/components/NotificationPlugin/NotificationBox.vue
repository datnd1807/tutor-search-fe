
<template>
  <div></div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/messaging";
import { mapActions } from "vuex";
import FirebaseAuth from "../../firebase";
export default {
  name: "NotificationBox",
  components: {},

  data() {
    return {
      from: "",
      subject: "",
      userimg: "",
      messaging: firebase.messaging(),
    };
  },

  methods: {
    ...mapActions([
      "getAllCoursesByAdmin",
      "getTutorPending",
      "getFeedbacks",
      "getAllFeedbacks",
      "getAllTutorsUpdating",
    ]),
    receiveMessage() {
      try {
        firebase.messaging().onMessage((payload) => {
          if (payload.notification.title == "Your account has been inactived") {
            FirebaseAuth.logout();
          } else if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
            var filter = {
              managerId: JSON.parse(localStorage.getItem("user")).id,
            };
            this.getAllCoursesByAdmin(filter);
            this.getFeedbacks(JSON.parse(localStorage.getItem("user")).id);
          } else {
            this.getAllFeedbacks();
            this.getAllCoursesByAdmin("");
          }
          this.getTutorPending();
          this.getAllTutorsUpdating();
          // debugger
          this.showNotification(
            payload.notification.title,
            payload.notification.body
          );
        });
      } catch (e) {
        console.log(e);
      }
    },
    showNotification(title, body) {
      this.$notify({
        title: title,
        message: body,
        type: "warning",
      });
    },
  },

  created() {
    this.receiveMessage();
  },

  validations: function () {
    return {};
  },

  computed: {},
};
</script>

<style scoped>
.notification-box {
  display: flex;
  position: absolute;
  right: 5px;
  bottom: 10px;
  width: 30%;
  height: 100px;
  background-color: #fff;
  z-index: 999;
}
#notification-close {
  position: absolute;
  color: #777;
  font: 14px;
  right: 5px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 2px;
  z-index: 10;
  cursor: pointer;
}

.notification-data {
  margin: 0 20px;
}
.notification-data p {
  margin: 10px 0;
}
.notification-notice p {
  font-size: 14px;
  font-weight: 400;
}
.notification-title p {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
}
.notification-time small {
  font-size: 12px;
}

.notification-wall-number small {
  font-size: 8px;
}
img {
  width: 30px;
}
</style>
view rawNotification box.txt hosted with ❤ by GitHub