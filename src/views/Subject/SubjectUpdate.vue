<template>
  <div>
    <el-dialog
      title="Subject Update"
      :visible="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      v-if="dialogVisible"
      width="75%"
      top="5vh"
      @close="handleClose"
      :close-on-click-modal="false"
      v-loading="loading"
      :destroy-on-close="true"
    >
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <h3>Subject Information</h3>
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
            <el-form-item label="Manager Name" prop="manager">
              <el-select
                v-model="subject.manageBy"
                placeholder="Select Manager"
                filterable
                class="manager-select"
              >
                <el-option
                  v-for="item in getManagers"
                  :key="item.id"
                  :label="item.fullname"
                  :value="item.id"
                >
                  <span style="float: left">{{ item.fullname }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.email
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Description" prop="description">
              <el-input
                type="textarea"
                v-model="subject.description"
                :autosize="{ minRows: 3, maxRows: 5 }"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleClose">Cancel</el-button>
              <el-button type="primary" @click="submitBtn('subjectForm')"
                >Submit</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" :offset="0" class="border">
          <h3>Classes have subject</h3>
          <el-form
            :model="classHasSubjectObj"
            ref="classHasSubjectForm"
            label-width="120px"
            :inline="true"
            size="normal"
          >
            <el-form-item label="Class" prop="class">
              <el-select
                v-model="classHasSubjectObj.classId"
                placeholder="Select Class"
                filterable
                class="class-select"
              >
                <el-option
                  v-for="item in getClasses"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addClassBtn()" :disabled="addClassDiable"
                >Add Class</el-button
              >
            </el-form-item>
          </el-form>
          <el-table :data="getClassHasSubject" border stripe max-height="400px">
            <el-table-column
              type="index"
              label="No."
              align="center"
            ></el-table-column>
            <el-table-column prop="className" label="Class"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "subject-update",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
    },
    filter: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters([
      "getSubject",
      "getManagers",
      "getClasses",
      "getClassHasSubject",
      "getClassHasSubjectObj",
    ]),
    subject: {
      get() {
        return this.getSubject;
      },
      set(value) {
        this.setSubject(value);
      },
    },
    addClassDiable:{
      get(){
        return (this.subject.status === "Active") ? false : true
      }
    },
    classHasSubjectObj: {
      get() {
        return this.getClassHasSubjectObj;
      },
      set(val) {
        this.setClassHasSubjectObj(val);
      },
    },
  },

  data() {
    return {
      userId: 0, // userid logged in system
      loading: false,
    };
  },
  mounted() {
    this.userId = JSON.parse(localStorage.getItem("user")).id;
  },
  methods: {
    ...mapMutations(["setSubject", "setClassHasSubjectObj"]),
    ...mapActions([
      "updateSubject",
      "insertClassHasSubjectAction",
      "filterSubjectAction",
      "getClassHasSubjectByIdAction",
      "getClassByClassHasSubjectNotExistAction",
    ]),
    submitBtn() {
      this.$confirm(
        "This will permanently update the subject information. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(async () => {
        this.loading = true;
        this.subject.updatedBy = this.userId;
        const response = await this.updateSubject();
        if (response) {
          if (response.status === 204) {
            this.$message({
              message: "Update successfully!!",
              type: "success",
            });
            await this.filterSubjectAction(this.filter);
            this.handleClose();
            this.loading = false;
          } else {
            this.loading = false;
            this.$message({
              message: "Update fail!!",
              type: "error",
            });
          }
        } else {
          this.loading = false;
          this.$message({
            message: "Update fail!!",
            type: "error",
          });
        }
      });
    },

    handleClose() {
      this.$emit("close");
    },
    addClassBtn() {
      this.$confirm(
        "This will permanently add the subject information. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(async () => {
        this.loading = true;
        const response = await this.insertClassHasSubjectAction();
        if (response.status === 204) {
          this.$message({
            message: "Insert successfully!!",
            type: "success",
          });
          await this.getClassHasSubjectByIdAction(this.subject.id);
          await this.getClassByClassHasSubjectNotExistAction(this.subject.id);
          this.classHasSubjectObj.classId = this.getClasses[0].id;
        } else {
          this.$message({
            message: "Update fail!!",
            type: "error",
          });
        }
        this.loading = false;
      });
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