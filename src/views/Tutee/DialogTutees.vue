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
        type="info"
        icon="el-icon-money"
        size="small"
        circle
        @click="openDialogTransaction(data.id)"
      ></el-button>
    </template>
    <el-dialog :visible.sync="dialogVisible" width="40%" top="20px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-user"></i>Tutee profile detail</span
      >
      <el-form ref="form" :model="data" :inline="true">
        <div class="row justify-content-center">
          <div class="avatar-tutee">
            <el-image
              style="width: 180px; height: 180px"
              :src="data.avatarImageLink"
              fit="cover"
            ></el-image>
          </div>
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
                <el-form-item label="Commission">
                  <el-input
                    v-model="transaction.name"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-lg-7 boldText">
                <el-form-item label="Course">
                  <el-input
                    v-model="transaction.courseName"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-lg-6 boldText">
                <el-form-item label="Time">
                  <el-input
                    :value="transaction.dateTime | formatDateTime"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="col-lg-7 boldText">
                <el-form-item label="Commission">
                  <el-input
                    v-model="transaction.commissionName"
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
                  <el-form-item label="Commission rate">
                    <el-input
                      v-model="transaction.commissionRate"
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
  </div>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "dialog-tutee",
  props: {
    data: Object,
  },
  computed: {
    ...mapGetters(["getTransactions"]),
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
    };
  },
  methods: {
    ...mapActions(["getTransactionByTuteeId"]),
    async openDialogTransaction(id) {
      await this.getTransactionByTuteeId(id);
      this.listTransaction = this.getTransactions;
      this.dialogTransaction = true;
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
.avatar-tutee {
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
  min-height: 85vh;
}
</style>