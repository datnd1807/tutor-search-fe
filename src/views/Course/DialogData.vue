<template>
  <div>
    <template :model="data">
      <el-button
        type="info"
        icon="el-icon-view"
        size="small"
        circle
        @click="dialogVisible = true"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-check"
        size="small"
        circle
        :disabled="handleButtonAccept(data.status)"
        @click="openActive()"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="small"
        circle
        :disabled="handleButtonDenine(data.status)"
        @click="openDelete()"
      ></el-button>
    </template>
    <el-dialog :visible.sync="dialogVisible" width="40%" top="20px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-notebook-2"></i>Course detail</span
      >
      <el-form
        ref="form"
        :model="data"
        label-width="120px"
        :inline="true"
        class="demo-form-inline"
      >
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.name"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  label="Course name"
                  v-model="data.name"
                  input-classes="form-control-alternative"
                  readonly
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.subjectName"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Subject"
                  input-classes="form-control-alternative"
                  v-model="data.subjectName"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.studyFee.toString()"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Fee ($)"
                  input-classes="form-control-alternative"
                  v-model="data.studyFee"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.tutorName"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Tutor created"
                  input-classes="form-control-alternative"
                  v-model="data.tutorName"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.beginTime | formatTime"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Begin Time"
                  input-classes="form-control-alternative"
                  :value="data.beginTime | formatTime"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.endTime | formatTime"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="End Time"
                  input-classes="form-control-alternative"
                  :value="data.endTime | formatTime"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.beginDate | formatDate"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Begin day"
                  input-classes="form-control-alternative"
                  :value="data.beginDate | formatDate"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.endDate | formatDate"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="End day"
                  input-classes="form-control-alternative"
                  :value="data.endDate | formatDate"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.createdDate | formatDateTime"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Date created"
                  input-classes="form-control-alternative"
                  :value="data.createdDate | formatDateTime"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.confirmedDate | formatDateTime"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Confirmed date"
                  input-classes="form-control-alternative"
                  :value="data.confirmedDate | formatDateTime"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.maxTutee.toString()"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Number of tutee"
                  input-classes="form-control-alternative"
                  :value="data.maxTutee"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div v-if="data.status != 'Pending'" class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.confirmerName"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  v-if="data.status != 'Pending'"
                  alternative=""
                  label="Confirmed by"
                  input-classes="form-control-alternative"
                  :value="data.confirmerName"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.daysInWeek"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Weekdays"
                  input-classes="form-control-alternative"
                  v-model="data.daysInWeek"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.status"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Status"
                  input-classes="form-control-alternative"
                  v-model="data.status"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="row justify-content-end pr-4">
          <extra-image :data="data"></extra-image>
        </div>
        <!-- Description -->
        <div class="pl-lg-4">
          <div class="form-group">
            <el-tooltip
              class="item"
              effect="dark"
              :content="data.description"
              placement="top-start"
              :open-delay="1000"
            >
              <base-input alternative="" label="Description">
                <textarea
                  rows="4"
                  class="form-control form-control-alternative"
                  v-model="data.description"
                  :readonly="true"
                ></textarea>
              </base-input>
            </el-tooltip>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
    <confirm-inactive
      :dialogVisible="confirmCourseDialogVisible"
      :data="data"
      @close="confirmCourseDialogClose"
    />
  </div>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ConfirmInactive from "./ConfirmInactive.vue";
import ExtraImage from "./ExtraImage.vue";
export default {
  components: { ConfirmInactive, ExtraImage },
  name: "dialog-data",
  props: {
    data: Object,
  },
  data() {
    return {
      dialogVisible: false,
      confirmCourseDialogVisible: false,
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
    ...mapActions([
      "enableCourseStatus",
      "insertNotificationMessageAction",
    ]),
    ...mapMutations(["setNotification"]),
    handleButtonAccept(check) {
      if (
        check == "Active" ||
        check == "Ongoing" ||
        check == "Unpaid" ||
        check == "Inactive" ||
        check == "Denied"
      ) {
        return true;
      } else if (check == "Pending") {
        return false;
      }
    },
    handleButtonDenine(check) {
      if (
        check == "Active" ||
        check == "Ongoing" ||
        check == "Unpaid" ||
        check == "Pending"
      ) {
        return false;
      } else if (check == "Inactive" || check == "Denied") {
        return true;
      }
    },
    openDelete() {
      this.notification = {
        title: `Your course with name "${this.data.name}" has been rejected.`,
        message: "",
        sendToUser: this.data.tutorEmail,
        isRead: "false",
      };
      this.confirmCourseDialogVisible = true;
    },
    confirmCourseDialogClose() {
      this.confirmCourseDialogVisible = false;
    },
    openActive() {
      this.notification = {
        title: "Course Status",
        message: `Your course with name "${this.data.name}" has been actived.`,
        sendToUser: this.data.tutorEmail,
        isRead: "false",
      };
      this.$confirm("Do you want to active this course?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.data.confirmedDate = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm"
          );
          this.data.confirmedBy = JSON.parse(localStorage.getItem("user")).id;
          const response = await this.enableCourseStatus(this.data);
          if (response.status == 204) {
            this.insertNotificationMessageAction();
            this.$message({
              type: "success",
              message: "Active completed",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Active canceled",
          });
        });
    },
    async sendMessage(message, title, userEmail) {
      this.notification = {
        title: title,
        message: message,
        sendToUser: userEmail,
        isRead: "false",
      };
      const res = await this.insertNotificationMessageAction();
      if (res.status !== 204) {
        this.$message({
          type: "error",
          message: "Insert notification fail",
        });
      }
    },
  },
  filters: {
    formatDate(value) {
      var formatter = moment(new Date(value)).format("YYYY/MM/DD");
      return formatter;
    },
    formatDateTime(value) {
      if (value != null) {
        var formatter = moment(new Date(value)).format(
          "YYYY/MM/DD [at] HH:mm:ss"
        );
        return formatter;
      } else {
        return "";
      }
    },
    formatTime(value) {
      var formatter = moment(new Date(value)).format("HH:mm");
      return formatter;
    },
  },
};
</script>
<style scoped lang=scss>
.fontSize {
  font-size: 20px;
  font-weight: bold;
}
.labelColor {
  font-weight: bold;
  margin: 8px 8px;
}
</style>