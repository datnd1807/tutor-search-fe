<template>
  <div class="confirm-inactive-tutor">
    <el-dialog
      title="Enter the reason for inactive the account"
      :visible="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      :close-on-click-modal="false"
      width="50%"
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
            <el-input v-model="data.fullname" readonly></el-input>
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
            <el-button @click="handleClose()">Cancel</el-button>
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
    ...mapActions(["insertNotificationMessageAction", "disableTutorStatus"]),
    ...mapMutations(["setNotification"]),
    handleClose() {
      this.$emit("close");
      this.resetForm("form");
    },
    async onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(
            "Do you want to delete this tutor account?",
            "Warning",
            {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
              type: "warning",
            }
          )
            .then(async () => {
              this.loading = true;
              this.data.confirmedDate = moment(new Date()).format(
                "YYYY-MM-DDTHH:mm"
              );
              this.data.confirmedBy = JSON.parse(
                localStorage.getItem("user")
              ).id;
              const response = await this.disableTutorStatus(this.data);
              if (response.status == 204) {
                this.loading = false;
                this.insertNotificationMessageAction();
                this.$message({
                  type: "success",
                  message: "Inactive completed",
                });
                this.handleClose("form");
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "Delete canceled",
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