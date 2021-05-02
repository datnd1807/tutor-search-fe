<template>
  <div>
    <template :model="data">
      <el-badge class="item">
        <el-button size="medium" type="text" @click="handleDialog(data.id)"
          >Image</el-button
        >
      </el-badge>
      <el-dialog :visible.sync="dialogVisible" width="30%" top="20px">
        <span slot="title" class="fontSize"
          ><i class="el-icon-picture"></i>Image</span
        >
        <el-scrollbar
          v-if="images.length != 0"
          wrap-style="max-height: 700px; min-height: 350px;"
        >
          <el-image
            style="width: 550px; height: 300px"
            v-for="(url, index) in images"
            :key="index"
            :src="url"
            fit="contain"
            lazy
          ></el-image>
        </el-scrollbar>
        <p v-else class="center-screen">No images</p>
        <br />
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "extra-image",
  computed: {
    ...mapGetters(["getImage"]),
  },
  props: {
    data: {},
  },
  data() {
    return {
      dialogVisible: false,
      images: [],
    };
  },
  methods: {
    handleDialog(id) {
      this.dialogVisible = true;
      this.images = this.data.extraImages
        .trim()
        .slice(1, this.data.extraImages.length - 1)
        .split(",");
      if (this.images[0].length == 0) {
        this.images = "";
      }
    },
  },
};
</script>
<style scoped lang=scss>
.fontSize {
  font-size: 20px;
  font-weight: bold;
}
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 35vh;
}
</style>