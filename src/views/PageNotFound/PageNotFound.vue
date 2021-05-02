<template>
  <div class="center-screen">
    <el-image
      style="width: 140px; height: 140px"
      :src="image"
      fit="cover"
    ></el-image>
    <div class="pt-2">
      <p class="font-weight-bold h3">This page isn't available. Sorry about that.</p>
      <el-button icon="el-icon-back" type="danger" round @click="backPage"
        >Back</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: require("../../../public/img/icons/404-error.png"),
    };
  },
  methods: {
    backPage() {
      if (localStorage.getItem("user") == null) {
          this.$router.push("/login").catch((err) => {});
      }else{
          this.$router.push("/").catch((err) => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 85vh;
}
</style>