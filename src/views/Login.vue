<template>
  <div class="row justify-content-center">
    <div class="col-lg-5">
      <div class="card bg-secondary shadow border-0">
        <div class="avatar-tutor">
          <el-image
            style="width: 445px; height: 280px"
            :src="image"
            fit="cover"
          ></el-image>
        </div>
        <div class="card-body py-lg-5">
          <div class="text-muted justify-content-center text-center mt-2 mb-3">
            <el-button
              class="design-button-login"
              type="primary"
              @click="login()"
              size="mini"
            >
              <img
                src="../assets/Webp.net-resizeimage.jpg"
                class="size-logo mr-2"
              />
              Sign in with Google</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Firebase from "../firebase.js";
export default {
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
      image: require("../assets/boy-studying-with-book.jpg"),
    };
  },
  methods: {
    login() {
      Firebase.login();
    },
  },
};
</script>
<style scoped lang="scss">
.sizeImage {
  height: 100px;
  width: 10px;
}
.size-logo {
  height: 35px;
  width: 35px;
}
.design-button-login {
  padding: 1px 10px 1px 1px;
}
</style>
