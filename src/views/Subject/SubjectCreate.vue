<template>
  <div>
    <el-dialog
      title="Create New Subject"
      :visible="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="50%"
      top="5vh"
      :close-on-click-modal="false"
      @close="handleClose"
      v-if="dialogVisible"
    >
      <el-form
        :model="subject"
        ref="subjectForm"
        :rules="rules"
        label-width="120px"
        :inline="false"
        size="normal"
        v-loading="loading"
      >
        <el-form-item label="Subject Name" prop="name">
          <el-input type="text" v-model="subject.name"></el-input>
        </el-form-item>
        <el-form-item label="Manager Name" prop="manager">
          <el-select
            v-model="subject.manageBy"
            placeholder="Select Manager"
            filterable
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
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "subject-create",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
    },
    filter:{
      type:Object
    }
  },
  computed: {
    ...mapGetters(["getSubject", "getManagers"]),
    subject: {
      get() {
        return this.getSubject;
      },
      set(value) {
        this.setSubject(value);
      },
    },
  },

  data() {
    var checkName = (rule, value, callback) => {
      let val = value.trim();
      if (!val) {
        return callback(new Error("Please input subject name"));
      } else if (val.length > 50) {
        callback(new Error("Subject name max length is 50"));
      } else
        setTimeout(async () => {
          if (val) {
            var res = await this.checkSubjectExistAction(val);
            if (res.data) {
              callback(new Error("Subject name already exists"));
            } else {
              callback();
            }
          }
        }, 1000);
    };
    return {
      loading : false,
      rules: {
        name: [
          {
            required: true,
            message: "Please input subject name",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "Length should be 1 to 50",
            trigger: "blur",
          },
          { validator: checkName, trigger: "blur" },
        ],
      }
    };
  },
  methods: {
    ...mapActions([
      "insertSubject",
      'filterSubjectAction',
      "checkSubjectExistAction",
    ]),
    ...mapMutations(["setSubject"]),

    handleClose() {
      this.$emit("close");
      this.resetForm("subjectForm");
    },

    submitBtn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(
            "This will permanently create new subject. Continue?",
            "Warning",
            {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
              type: "warning",
            }
          ).then(async () => {
            this.loading = true
            const res = await this.insertSubject();
            if (res === 204) {
              this.$message({
                message: "Insert successfully!!",
                type: "success",
              });
              this.handleClose();
              await this.filterSubjectAction(this.filter);
              this.loading = false
            } else {
              this.loading = false
              this.$message({
                message: "Insert fail!!",
                type: "error",
              });
            }
            this.loading = false
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs[formName].clearValidate();
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