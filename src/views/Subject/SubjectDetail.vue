<template>
  <div>
    <el-dialog
      title="Subject Detail"
      :visible="dialogVisible"
      v-if="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="50%"
      top="5vh"
      @close="handleClose"
      lock-scroll
    >
      <el-form
        :model="subject"
        ref="subjectForm"
        label-width="120px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Subject Name" prop="name">
          <el-input type="text" v-model="subject.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="Manager Name" prop="managerName">
          <el-input
            type="text"
            v-model="subject.managerName"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item label="Created By" prop="createdBy">
          <el-input
            type="text"
            v-model="subject.creatorName"
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
        <el-form-item label="Updated By" prop="updatedBy">
          <el-input
            type="text"
            v-model="subject.updaterName"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Updated Date" prop="updatedDate">
          <el-input
            type="text"
            v-model="updatedDate"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            type="textarea"
            v-model="subject.description"
            :autosize="{ minRows: 3, maxRows: 5 }"
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
  name: "subject-detail",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["getSubject"]),
    subject: {
      get() {
        return this.getSubject;
      },
    },
    updatedDate:{
      get(){
        return moment(this.subject.updatedDate).format(
          "YYYY-MM-DD [at] HH:mm:ss"
        );
      }
    },
    createdDate:{
      get(){
        return moment(this.subject.createdDate).format(
          "YYYY-MM-DD [at] HH:mm:ss"
        );
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