<template>
  <div class="col">
    <template :model="data">
      <el-badge class="item">
        <el-button size="small" type="text" @click="handleDialog"
          >Social Id</el-button
        >
      </el-badge>
      <el-dialog :visible.sync="dialogVisible" width="30%" top="20px">
        <span slot="title" class="fontSize"
          ><i class="el-icon-user-solid"></i>Social Id</span
        >
          <el-image :src="data.socialIdUrl" fit="contain" lazy></el-image>
        <br />
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "social-id",
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
    handleDialog() {
      this.dialogVisible = true;
    },
  },
};
</script>
<style scoped lang=scss>
.fontSize {
  font-size: 20px;
  font-weight: bold;
}
</style>