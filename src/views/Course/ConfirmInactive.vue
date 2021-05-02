<template>
  <div class="confirm-inactive-course">
    <el-dialog
      :visible="dialogVisible"
      title="Enter the reason for inactive the course"
      width="50%"
      :close-on-click-modal="false"
      v-on:update:visible="visibleSync = $event"
      @close="handleClose"
    >
      <div>
        <el-form
          :model="notification"
          ref="form"
          :rules="rules"
          label-width="120px"
          :inline="false"
          size="normal"
          v-loading="loading"
        >
          <el-form-item label="Tutor name">
            <el-input v-model="data.tutorName" readonly></el-input>
          </el-form-item>
          <el-form-item label="Course name">
            <el-input v-model="data.name" readonly></el-input>
          </el-form-item>

          <el-form-item label="Reason: " prop="message">
            <el-input
              v-model="notification.message"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')"
              >Submit</el-button
            >
            <el-button @click="handleClose">Cancel</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
export default {
  name: "confirm-inactive",
  props: {
    dialogVisible: {
      type: Boolean,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      rules: {
        message: [
          {
            required: true,
            message: "Please input reason",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["getNotification"]),
    notification: {
      get() {
        return this.getNotification;
      },
      set(val) {
        this.setNotification(val);
      },
    },
  },
  methods: {
    ...mapActions(["insertNotificationMessageAction", "disableCourseStatus"]),
    ...mapMutations(["setNotification"]),
    handleClose() {
      this.$emit("close");
      this.resetForm("form");
    },
    async onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("Do you want to inactive this course?", "Warning", {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          })
            .then(async () => {
              this.loading = true;
              this.data.confirmedDate = moment(new Date()).format(
                "YYYY-MM-DDTHH:mm"
              );
              this.data.confirmedBy = JSON.parse(
                localStorage.getItem("user")
              ).id;
              const response = await this.disableCourseStatus(this.data);
              if (response.status == 204) {
                this.insertNotificationMessageAction();
                this.$message({
                  type: "success",
                  message: "Inactive completed",
                });
                this.loading = false;
                this.handleClose();
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "Update canceled",
              });
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
    visibleSync(val) {
      this.$emit("update:dialogVisible", val);
    },
  },
};
</script>