<template>
  <div id="app">
    <NotificationBox />
    <notifications></notifications>
    <router-view />
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/messaging";
import FirebaseAuth from "./firebase";
import NotificationBox from "./components/NotificationPlugin/NotificationBox";
import { mapActions, mapGetters } from "vuex";
import VueCookies from "vue-cookies";
export default {
  components: {
    NotificationBox,
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  data() {
    return {
      data: {
        token: "",
        email: "",
      },
    };
  },
  methods: {
    ...mapActions([
      "getAccountByMail",
      "getTokenAccount",
      "insertTokenManager",
      "getAccountManagerById",
    ]),
    messageLoginFail() {
      this.$notify.error({
        title: "Error",
        message: "Cannot login this account",
        position: "top-left",
      });
    },
    async getTokenNotification(email) {
      try {
        await firebase
          .messaging()
          .getToken()
          .then(() => {
            return firebase
              .messaging()
              .getToken()
              .then((token) => {
                this.data = {
                  email: email,
                  token: token,
                };
                console.log(token);
                this.insertTokenManager(this.data);
              })
              .catch((err) => {
                console.log("Unable to get token.", err);
              });
          });
      } catch (e) {
        console.log(e);
      }
    },
    checkSession() {
      FirebaseAuth.auth.onAuthStateChanged(async (user) => {
        if (user) {
          localStorage.setItem("loading", true);
          const response = await this.getAccountByMail(user.email);
          if (response.data != false) {
            this.data.email = user.email;
            localStorage.setItem("user", JSON.stringify(response.data));
            const path = this.$router.currentRoute.path;
            if (path != "/login") {
              if (VueCookies.get("token") == null) {
                FirebaseAuth.logout();
              }
            } else {
              var token = await this.getTokenAccount(user.email);
              if (token.status == 200) {
                this.getTokenNotification(user.email);
                this.$cookies.set("token", token.data);
                var expireIn = new Date(new Date().getTime() + 1000 * 60 * 60); // set session 60 phut
                VueCookies.set("token", token.data, expireIn);
                await this.getAccountManagerById(
                  JSON.parse(localStorage.getItem("user")).id
                );
                this.$router.push("/dashboard").catch((err) => {});
              }
            }
          } else if (response.data == false) {
            FirebaseAuth.logout();
            this.messageLoginFail();
          }
        }
      });
    },
  },
  created() {
    this.checkSession();
  },
};
</script>
