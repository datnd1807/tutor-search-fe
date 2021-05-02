<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive">
      <el-tabs type="border-card">
        <el-tab-pane label="Pending" v-loading="loading">
          <el-scrollbar wrap-style="max-height: 700px; min-height: 350px;">
            <div v-if="listFeedbacks.length == 0" class="center-screen">
              <p>No feedback</p>
            </div>
            <span
              class="height-form"
              v-for="(feedback, index) in listFeedbacks"
              :key="index"
            >
              <el-form
                v-if="feedback.status == 'Pending'"
                ref="form"
                :model="feedback"
                label-width="130px"
              >
                <div class="col-lg-4 boldText">
                  <el-form-item label="Sent by">
                    <div class="Light_Shadow">
                      <el-input
                        v-model="feedback.tuteeName"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-4 boldText">
                  <el-form-item label="Receiver">
                    <div class="Light_Shadow">
                      <el-input
                        v-model="feedback.tutorName"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-7 boldText">
                  <el-form-item label="Content">
                    <div class="Light_Shadow">
                      <el-input
                        type="textarea"
                        v-model="feedback.comment"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-4 boldText pt-2">
                  <el-form-item label="Date created">
                    <div class="Light_Shadow">
                      <el-input
                        :value="feedback.createdDate | formatDateTime"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <el-form-item label="Rate" class="position-rate boldText">
                  <el-rate v-model="feedback.rate" disabled></el-rate>
                </el-form-item>
                <div class="col-12 text-right">
                  <el-button type="primary" @click="acceptFeedback(index)"
                    >Accept</el-button
                  >
                  <el-button type="danger" @click="deniesFeedback(index)"
                    >Delete</el-button
                  >
                </div>
                <hr class="my-4" />
              </el-form>
            </span>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "feedback-comfirmation",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["feedbacks"]),
    ...mapGetters(["getFeedback"]),
    listFeedbacks() {
      return this.getFeedback;
    },
  },

  filters: {
    formatDateTime(value) {
      if (value != null) {
        var formatter = moment(new Date(value)).format(
          "YYYY/MM/DD [at] HH:mm:ss"
        );
        return formatter;
      } else {
        return null;
      }
    },
  },
  methods: {
    ...mapActions([
      "getFeedbacks",
      "acceptFeedbackTutee",
      "deniesFeedbackTutee",
      "getFeedbacksAfterConfirm",
      "getAllFeedbacks",
    ]),
    async init() {
      if (JSON.parse(localStorage.getItem("user")).roleId == 2) {
        const data1 = await this.getFeedbacks(
          JSON.parse(localStorage.getItem("user")).id
        );
      } else {
        const data1 = await this.getAllFeedbacks();
      }
    },
    acceptFeedback(index) {
      this.$confirm("Do you want to accept this feedback?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.loading = true;
          this.listFeedbacks[index].confirmedDate = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm:ss"
          );
          this.listFeedbacks[index].confirmedBy = JSON.parse(
            localStorage.getItem("user")
          ).id;
          const response = await this.acceptFeedbackTutee(
            this.listFeedbacks[index]
          );
          if (response.status == 204) {
            this.loading = false;
            this.$message({
              type: "success",
              message: "Accept completed",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    deniesFeedback(index) {
      this.$confirm("Do you want to delete this feedback?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.loading = true;
          this.listFeedbacks[index].confirmedDate = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm:ss"
          );
          this.listFeedbacks[index].confirmedBy = JSON.parse(
            localStorage.getItem("user")
          ).id;
          const response = await this.deniesFeedbackTutee(
            this.listFeedbacks[index]
          );
          if (response.status == 200) {
            this.loading = false;
            this.$message({
              type: "success",
              message: "Delete completed",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped lang=scss>
.position-rate {
  .el-rate {
    margin: 11px 10px;
  }
}
.boldText {
  font-weight: bold;
  .el-form-item {
    margin-bottom: 5px;
    margin-left: 1px;
  }
}
.height-form {
  .el-form {
    margin-top: 20px;
  }
}
.Light_Shadow {
  box-shadow: 0 0.5px 3px 0 rgba(26, 24, 24, 0.267);
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