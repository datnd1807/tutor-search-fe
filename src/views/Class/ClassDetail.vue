<template>
  <div>
    <el-dialog
      title="Class Detail"
      :visible="dialogVisible"
      v-if="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="50%"
      top="5vh"
      @close="handleClose"
    >
      <el-form
        :model="classObj"
        ref="classData"
        label-width="120px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Class Name" prop="name">
          <el-input type="text" v-model="classObj.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="Created by" prop="createdBy">
          <el-input
            type="text"
            v-model="classObj.creatorName"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Date created" prop="createdDate">
          <el-input
            type="text"
            v-model="createdDate"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Update By" prop="updatedBy">
          <el-input
            type="text"
            v-model="classObj.updaterName"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Update Date" prop="updatedDate">
          <el-input
            type="text"
            v-model="createdDate"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item :label="classObj.status" prop="status">
          <el-switch
            v-model="classObj.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="Active"
            inactive-value="Inactive"
            disabled
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            type="textarea"
            v-model="classObj.description"
            :autosize="{ minRows: 3, maxRows: 5 }"
            readonly
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "class-detail",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["getClassObj"]),
    classObj: {
      get() {        
        return this.getClassObj;
      },
    },
    createdDate: {
      get(){
        return moment(this.getClassObj.createdDate).format("YYYY-MM-DD [at] HH:mm:ss")
      }
    },
    updatedDate:{
      get(){
        return moment(this.getClassObj.updatedDate).format("YYYY-MM-DD [at] HH:mm:ss")
      }
    }
  },

  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
  watch: {
    visbleSync(val) {
      this.$emit("update:dialogVisible", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>