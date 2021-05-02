<template>
  <div>
    <el-tabs type="border-card" @tab-click="handleClickTab()">
      <el-tab-pane label="Fees">
        <el-form
          v-model="dataFee"
          ref="form"
          label-width="150px"
          class="boldText"
          v-loading="loading"
        >
          <div class="row pl-3 pt-3">
            <el-form-item label="Fee" class="col-lg-4">
              <el-select
                v-model="valueDropDownFee"
                placeholder="Fees name"
                v-on:change="getValueFee(valueDropDownFee)"
              >
                <el-option
                  v-for="data in modelDataFee"
                  :key="data.id"
                  :label="data.name"
                  :value="data.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :disabled="disableButtonEdit"
                @click="editFee()"
                >Edit</el-button
              >
              <el-button
                type="primary"
                :disabled="disableButtonSave"
                @click="saveFees()"
                >Save</el-button
              >
            </el-form-item>
          </div>
          <el-form-item label="Price" class="col-lg-3">
            <div v-if="disableEditFee == false" class="Light_Shadow">
              <el-input
                :readonly="disableEditFee"
                v-model="dataFee.price"
                v-on:input="checkPrice()"
                placeholder="USD"
              ></el-input>
            </div>
            <div v-else>
              <el-input
                :readonly="disableEditFee"
                v-model="dataFee.price"
                placeholder="USD"
              ></el-input>
            </div>
          </el-form-item>
          <div class="row pl-3">
            <el-form-item label="Updated by" class="col-lg-4">
              <el-input
                :readonly="disableEditFee"
                v-model="dataFee.updaterFullname"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row pl-3">
            <el-form-item label="Updated date" class="col-lg-4">
              <el-input
                :readonly="disableEditFee"
                :value="dataFee.updatedDate | formatDateTime"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="Description" class="col-lg-5">
            <div v-if="disableEditFee == false" class="Light_Shadow">
              <el-input
                type="textarea"
                resize="none"
                v-model="dataFee.description"
                :readonly="disableEditFee"
                maxlength="150"
              ></el-input>
            </div>
            <div v-else>
              <el-input
                type="textarea"
                resize="none"
                v-model="dataFee.description"
                :readonly="disableEditFee"
              ></el-input>
            </div>
          </el-form-item>
          <div class="col-lg-4">
            <el-alert
              title="Price must be number"
              type="error"
              show-icon
              :hidden="disableAlertPrice"
              :closable="false"
            >
            </el-alert>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="Commission">
        <el-form
          v-model="dataFee"
          ref="form"
          label-width="150px"
          class="boldText"
          v-loading="loading"
        >
          <div class="row pl-3 pt-3">
            <el-form-item label="Commission name" class="col-lg-4">
              <el-select
                v-model="valueDropDownCommission"
                placeholder="Commission name"
                v-on:change="getValueCommission(valueDropDownCommission)"
              >
                <el-option
                  v-for="data in modelDataCommisstion"
                  :key="data.id"
                  :label="data.name"
                  :value="data.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                :disabled="disableButtonEdit"
                @click="editFee()"
                >Edit</el-button
              >
              <el-button
                type="primary"
                :disabled="disableButtonSave"
                @click="saveCommissions()"
                >Save</el-button
              >
            </el-form-item>
          </div>
          <el-form-item label="Commission rate" class="col-lg-3">
            <div v-if="disableEditFee == false" class="Light_Shadow">
              <el-input
                :readonly="disableEditFee"
                v-model="dataCommission.rate"
                v-on:input="checkCommissionRate()"
                placeholder="0.1"
              ></el-input>
            </div>
            <div v-else>
              <el-input
                :readonly="disableEditFee"
                v-model="dataCommission.rate"
                placeholder="10% = 0.1"
              ></el-input>
            </div>
          </el-form-item>
          <div class="row pl-3">
            <el-form-item label="Updated by" class="col-lg-4">
              <el-input
                :readonly="disableEditFee"
                v-model="dataCommission.updaterFullname"
              ></el-input>
            </el-form-item>
          </div>
          <div class="row pl-3">
            <el-form-item label="Updated date" class="col-lg-4">
              <el-input
                :readonly="disableEditFee"
                :value="dataCommission.updatedDate | formatDateTime"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item label="Description" class="col-lg-5">
            <div v-if="disableEditFee == false" class="Light_Shadow">
              <el-input
                type="textarea"
                resize="none"
                v-model="dataCommission.description"
                :readonly="disableEditFee"
                maxlength="150"
              ></el-input>
            </div>
            <div v-else>
              <el-input
                type="textarea"
                resize="none"
                v-model="dataCommission.description"
                :readonly="disableEditFee"
              ></el-input>
            </div>
          </el-form-item>
          <div class="col-lg-4">
            <el-alert
              title="Commission rate must be number (%)"
              type="error"
              show-icon
              :hidden="disableAlertPrice"
              :closable="false"
            >
            </el-alert>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "fee-detail",
  computed: {
    ...mapGetters(["getFees", "getFee", "getCommissions", "getCommission"]),
    modelDataFee() {
      return this.getFees;
    },
    modelDataCommisstion() {
      return this.getCommissions;
    },
  },
  filters: {
    formatDateTime(value) {
      if (value != undefined) {
        var formatter = moment(new Date(value)).format(
          "YYYY/MM/DD [at] HH:mm:ss"
        );
        return formatter;
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      dataFee: [],
      dataCommission: [],
      valueDropDownFee: null,
      valueDropDownCommission: null,
      disableButtonEdit: true,
      disableButtonSave: true,
      disableAlertPrice: true,
      disableEditFee: true,
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      "getAllFee",
      "saveFee",
      "getFeeById",
      "getAllCommission",
      "getCommissionById",
      "saveCommission",
    ]),
    async init() {
      const data1 = await this.getAllFee();
      const data2 = await this.getAllCommission();
    },
    checkPrice() {
      if (
        this.dataFee.price == "" ||
        !this.dataFee.price.match(/^\d*\.?\d*$/)
      ) {
        this.disableAlertPrice = false;
      } else {
        this.disableAlertPrice = true;
      }
    },
    checkCommissionRate() {
      if (
        this.dataCommission.rate == "" ||
        !this.dataCommission.rate.match(/^\d*\.?\d*$/)
      ) {
        this.disableAlertPrice = false;
      } else {
        this.disableAlertPrice = true;
      }
    },
    async getValueFee(feeId) {
      this.disableAlertPrice = true;
      this.disableButtonEdit = false;
      this.disableEditFee = true;
      const response = await this.getFeeById(feeId);
      if (response.status == 200) {
        this.dataFee = this.getFee;
      }
    },
    async getValueCommission(commissionId) {
      this.disableAlertPrice = true;
      this.disableButtonEdit = false;
      this.disableEditFee = true;
      const response = await this.getCommissionById(commissionId);
      if (response.status == 200) {
        this.dataCommission = this.getCommission;
      }
    },
    editFee() {
      this.disableEditFee = false;
      this.disableButtonSave = false;
    },
    saveFees() {
      if (this.disableAlertPrice) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            (this.loading = true),
              (this.dataFee.updatedBy = JSON.parse(
                localStorage.getItem("user")
              ).id);
            this.dataFee.updatedDate = moment(new Date()).format(
              "YYYY-MM-DDTHH:mm"
            );
            this.dataFee.price = parseFloat(this.dataFee.price);
            this.dataFee.status = "Active";
            this.dataFee.updaterFullname = JSON.parse(
              localStorage.getItem("user")
            ).fullname;
            this.saveFee(this.dataFee).then((response) => {
              if (response == 204) {
                this.disableEditFee = true;
                this.disableButtonSave = true;
                (this.loading = false),
                  this.$message({
                    type: "success",
                    message: "Save completed",
                  });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Save canceled",
            });
          });
      }
    },
    saveCommissions() {
      if (this.disableAlertPrice) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            (this.loading = true),
              (this.dataCommission.updatedBy = JSON.parse(
                localStorage.getItem("user")
              ).id);
            this.dataCommission.updatedDate = moment(new Date()).format(
              "YYYY-MM-DDTHH:mm"
            );
            this.dataCommission.rate = parseFloat(this.dataCommission.rate);
            this.dataCommission.status = "Active";
            this.dataCommission.updaterFullname = JSON.parse(
              localStorage.getItem("user")
            ).fullname;
            this.saveCommission(this.dataCommission).then((response) => {
              if (response == 204) {
                this.disableEditFee = true;
                this.loading = false;
                this.disableButtonSave = true;
                this.$message({
                  type: "success",
                  message: "Save completed",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Save canceled",
            });
          });
      }
    },
    disableCommission() {
      if (this.disableAlertPrice) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.dataCommission.updatedBy = JSON.parse(
              localStorage.getItem("user")
            ).id;
            this.dataCommission.updatedDate = moment(new Date()).format(
              "YYYY-MM-DDTHH:mm"
            );
            this.dataCommission.rate = parseFloat(this.dataCommission.rate);
            this.dataCommission.status = "Inactive";
            this.dataCommission.updaterFullname = JSON.parse(
              localStorage.getItem("user")
            ).fullname;
            this.saveCommission(this.dataCommission).then((response) => {
              if (response == 204) {
                this.disableEditFee = true;
                this.valueDropDownCommission = null;
                this.dataCommission = [];
                this.$message({
                  type: "success",
                  message: "Disable completed",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Save canceled",
            });
          });
      }
    },
    handleClickTab() {
      (this.dataFee = []),
        (this.dataCommission = []),
        (this.valueDropDownFee = null),
        (this.valueDropDownCommission = null),
        (this.disableButtonEdit = true),
        (this.disableAlertPrice = true),
        (this.disableEditFee = true);
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped lang=scss>
.boldText {
  font-weight: bold;
  .el-form-item {
    margin-bottom: 5px;
    margin-left: 1px;
  }
}
.sizeLabel {
  font-weight: bold;
  font-size: 18px;
}
.Light_Shadow {
  box-shadow: 0 3px 15px 0 rgba(252, 15, 15, 0.267);
}
</style>