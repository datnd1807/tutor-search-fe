<template>
  <div>
    <template :model="data">
      <el-button
        type="info"
        icon="el-icon-view"
        size="small"
        circle
        @click="handleDialog(data.id)"
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
        @click="openDelete(data.id)"
      ></el-button>
      <el-button
        type="info"
        icon="el-icon-money"
        size="small"
        circle
        @click="openDialogTransaction(data.id)"
      ></el-button>
    </template>
    <el-dialog :visible.sync="dialogVisible" width="40%" top="20px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-user"></i>Tutor profile detail</span
      >
      <el-form ref="form" :model="data" :inline="true">
        <div class="row justify-content-center">
          <div class="avatar-tutor">
            <el-image
              style="width: 180px; height: 180px"
              :src="data.avatarImageLink"
              fit="cover"
            ></el-image>
          </div>
        </div>
        <div class="justify-content-end">
          <certificate :data="data"></certificate>
          <social-id :data="data"></social-id>
        </div>
        <hr class="my-4" />
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.fullname"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  label="Fullname"
                  v-model="data.fullname"
                  input-classes="form-control-alternative"
                  readonly
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.gender"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Gender"
                  input-classes="form-control-alternative"
                  v-model="data.gender"
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
                :content="data.educationLevel"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Education Level"
                  input-classes="form-control-alternative"
                  v-model="data.educationLevel"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.school"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="School"
                  input-classes="form-control-alternative"
                  v-model="data.school"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.birthday | formatDate"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Birthday"
                  input-classes="form-control-alternative"
                  :value="data.birthday | formatDate"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.email"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Email"
                  input-classes="form-control-alternative"
                  v-model="data.email"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.phone"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Phone"
                  input-classes="form-control-alternative"
                  v-model="data.phone"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.address"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Addess"
                  input-classes="form-control-alternative"
                  v-model="data.address"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.membershipName"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Membership"
                  input-classes="form-control-alternative"
                  v-model="data.membershipName"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.points.toString()"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Points"
                  input-classes="form-control-alternative"
                  v-model="data.points"
                  :readonly="true"
                />
              </el-tooltip>
            </div>
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="data.confirmerName"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Confirmed by"
                  input-classes="form-control-alternative"
                  v-model="data.confirmerName"
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
          </div>
          <div class="row">
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="listSubject"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input alternative="" label="Subject">
                  <textarea
                    rows="4"
                    class="form-control form-control-alternative"
                    v-model="listSubject"
                    :readonly="true"
                  ></textarea>
                </base-input>
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
          </div>
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
    <el-dialog
      :visible.sync="dialogTransaction"
      width="45%"
      top="20px"
      @close="handleClose()"
    >
      <span slot="title" class="fontSize"
        ><i class="el-icon-money"></i>Transaction</span
      >
      <div class="col d-flex justify-content-start">
        <label class="text-search mr-2">Search date</label>
        <el-date-picker
          v-model="valueDateTime"
          type="daterange"
          range-separator="/"
          start-placeholder="Start date"
          end-placeholder="End date"
          :picker-options="pickerOption"
          @change="searchByDate(valueDateTime)"
          :editable="false"
        >
        </el-date-picker>
      </div>
      <hr class="my-4" />
      <el-scrollbar wrap-style="max-height: 700px; min-height: 350px;">
        <div v-if="listTransaction.length == 0" class="center-screen">
          <p>No transaction</p>
        </div>
        <span
          class="height-form"
          v-for="(transaction, index) in listTransaction"
          :key="index"
        >
          <el-container style="height: 350px; border: 2px solid #e6e6e6">
            <el-form ref="form" :model="transaction" label-width="130px">
              <div class="col-lg-7 boldText">
                <el-form-item label="Fee name">
                  <el-input
                    v-model="transaction.feeName"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-lg-4 boldText">
                <el-form-item label="Fee">
                  <el-input
                    v-model="transaction.feePrice"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="row pl-3">
                <div class="col-lg-4 boldText">
                  <el-form-item label="Point used">
                    <el-input
                      v-model="transaction.usedPoints"
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-4 boldText">
                  <el-form-item label="Point archieved">
                    <el-input
                      v-model="transaction.archievedPoints"
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-lg-6 boldText">
                <el-form-item label="Time">
                  <el-input
                    :value="transaction.dateTime | formatDateTime"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="row pl-3">
                <div class="col-lg-4 boldText">
                  <el-form-item label="Total amount">
                    <el-input
                      v-model="transaction.totalAmount"
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </div>
                <div class="col-lg-4 boldText">
                  <el-form-item label="Amount">
                    <el-input
                      v-model="transaction.amount"
                      :readonly="true"
                    ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="col-lg-4 boldText">
                <el-form-item label="Status">
                  <div v-if="transaction.status == 'Successful'">
                    <el-tag type="success">{{ transaction.status }}</el-tag>
                  </div>
                  <div v-else>
                    <el-tag type="danger">{{ transaction.status }}</el-tag>
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </el-container>
        </span>
      </el-scrollbar>
    </el-dialog>
    <confirm-inactive
      :dialogVisible="confirmInactiveDialogVisible"
      @close="confirmInactiveDialogClose"
      :data="data"
    />
  </div>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Certificate from "./Certificate.vue";
import _ from "lodash";
import SocialId from "./SocialId";
import ConfirmInactive from "./ConfirmInactive.vue";
export default {
  components: { Certificate, SocialId, ConfirmInactive },
  name: "dialog-tutor",
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters(["getAllSubjects", "getTransactions", "getNotification"]),
    notification: {
      get() {
        return this.getNotification;
      },
      set(val) {
        this.setNotification(val);
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogTransaction: false,
      listSubject: "",
      listTransaction: [],
      valueDateTime: [],
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      confirmInactiveDialogVisible: false,
      tutor: {},
    };
  },
  methods: {
    ...mapActions([
      "disableTutorStatus",
      "enableTutorStatus",
      "getSubjectByTutorId",
      "getTransactionByTutorId",
      "insertNotificationMessageAction",
      "getCourseByTutorIdAction",
    ]),
    ...mapMutations(["setNotification"]),
    handleButtonAccept(check) {
      if (check == "Active" || check == "Denied") {
        return true;
      } else if (check == "Inactive") {
        return false;
      }
    },
    handleButtonDenine(check) {
      if (check == "Active") {
        return false;
      } else if (check == "Inactive") {
        return true;
      }
    },
    async openDelete(tutorId) {
      let res = await this.getCourseByTutorIdAction(tutorId);
      if (res.data === 0) {
        this.notification = {
          title: "Your account has been inactived",
          message: "",
          sendToUser: this.data.email,
          isRead: false,
        };
        this.confirmInactiveDialogVisible = true;
      } else {
        this.$alert(
          `This account still have ${res.data} active courses. Please inactive all courses.`,
          "You cannot inactive this account ",
          {
            center: true,
          }
        ).catch(() => {});
      }
    },
    confirmInactiveDialogClose() {
      this.confirmInactiveDialogVisible = false;
    },

    openActive() {
      this.$confirm("Do you want to active this tutor account?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.data.confirmedDate = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm"
          );
          this.data.confirmedBy = JSON.parse(localStorage.getItem("user")).id;
          const response = await this.enableTutorStatus(this.data);
          if (response.status == 204) {
            this.sendMessage(
              "Your account has been actived",
              "Your account has been actived",
              this.data.email
            );
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
    async openDialogTransaction(id) {
      await this.getTransactionByTutorId(id);
      this.listTransaction = this.getTransactions;
      this.dialogTransaction = true;
    },
    async handleDialog(id) {
      await this.getSubjectByTutorId(id);
      this.listSubject = "";
      this.dialogVisible = true;
      var list = this.getAllSubjects;
      for (const value of list) {
        if (this.listSubject != "") {
          this.listSubject = this.listSubject + ", " + value.name;
        } else {
          this.listSubject = value.name;
        }
      }
    },
    searchByDate(value) {
      if (value != null) {
        var firstDate = moment(new Date(value[0])).format("YYYY-MM-DD");
        var secondDate = moment(new Date(value[1])).format("YYYY-MM-DD");
        var searchDate = "";
        this.listTransaction = _.filter(this.listTransaction, function (data) {
          searchDate = moment(new Date(data.dateTime)).format("YYYY-MM-DD");
          if (searchDate >= firstDate && searchDate <= secondDate) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        this.listTransaction = this.getTransactions;
      }
    },
    handleClose() {
      this.valueDateTime = [];
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
      var formatter = moment(new Date(value)).format(
        "YYYY/MM/DD [at] HH:mm:ss"
      );
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
.avatar-tutor {
  .el-image {
    border-radius: 50%;
    box-shadow: 3px 3px 3px gray;
  }
}
.height-form {
  .el-form {
    margin-top: 20px;
  }
}
.boldText {
  font-weight: bold;
  .el-form-item {
    margin-bottom: 5px;
    margin-left: 1px;
  }
}
.text-search {
  margin-top: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #606266;
}
.center-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 30vh;
}
</style>