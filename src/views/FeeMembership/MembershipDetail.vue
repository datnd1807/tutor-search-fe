<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="pt-2 pl-3 mb-5">
      <el-tabs type="border-card">
        <el-tab-pane label="Membership">
          <el-form
            v-model="dataMembership"
            ref="form"
            label-width="150px"
            class="boldText"
            v-loading="loading"
          >
            <div class="row pl-3 pt-3">
              <el-form-item label="Membership" class="col-lg-4">
                <el-select
                  v-model="valueDropDownMembership"
                  placeholder="Membership"
                  v-on:change="getValueMembership(valueDropDownMembership)"
                  v-on:visible-change="setDataMembership"
                >
                  <el-option
                    v-for="data in modelDataMembership"
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
                  v-on:click="editMethod()"
                  >Edit</el-button
                >
                <el-button
                  type="primary"
                  v-on:click="saveMemberships()"
                  :disabled="disableButtonSave"
                  >Save</el-button
                >
              </el-form-item>
            </div>
            <div class="row pl-3">
              <el-form-item label="Point rate" class="col-lg-3">
                <div v-if="disableEditMembership == false" class="Light_Shadow">
                  <el-input
                    :readonly="disableEditMembership"
                    v-model="dataMembership.pointRate"
                    v-on:input="checkPointRate()"
                  ></el-input>
                </div>
                <div v-else>
                  <el-input
                    :readonly="disableEditMembership"
                    v-model="dataMembership.pointRate"
                    placeholder="10% = 0.1"
                  ></el-input>
                </div>
              </el-form-item>
              <el-form-item label="Point Amount" class="col-lg-3">
                <div v-if="disableEditMembership == false" class="Light_Shadow">
                  <el-input
                    :readonly="disableEditMembership"
                    v-model="dataMembership.pointAmount"
                    v-on:input="checkPointAmount()"
                  ></el-input>
                </div>
                <div v-else>
                  <el-input
                    :readonly="disableEditMembership"
                    v-model.lazy="dataMembership.pointAmount"
                  ></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="row pl-3">
              <el-form-item label="Updated by" class="col-lg-4">
                <el-input
                  :readonly="disableEditMembership"
                  v-model="dataMembership.updaterFullname"
                ></el-input>
              </el-form-item>
            </div>
            <div class="row pl-3">
              <el-form-item label="Date updated" class="col-lg-4">
                <el-input
                  :readonly="disableEditMembership"
                  :value="dataMembership.updatedDate | formatDateTime"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item label="Description" class="col-lg-5">
              <div v-if="disableEditMembership == false" class="Light_Shadow">
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="dataMembership.description"
                  :readonly="disableEditMembership"
                  maxlength="150"
                ></el-input>
              </div>
              <div v-else>
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="dataMembership.description"
                  :readonly="disableEditMembership"
                ></el-input>
              </div>
            </el-form-item>
            <div class="col-lg-4">
              <el-alert
                title="Point rate wrong format!!!"
                type="error"
                show-icon
                :hidden="disableAlertPointRate"
                :closable="false"
              >
              </el-alert>
              <el-alert
                title="Point amount wrong format!!!"
                type="error"
                show-icon
                :hidden="disableAlertPointAmount"
                :closable="false"
              >
              </el-alert>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <hr class="my-4" />
      <fee-detail></fee-detail>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import FeeDetail from "./FeeDetail";
export default {
  name: "membership-detail",
  components: {
    FeeDetail,
  },
  data() {
    return {
      statusList: [{ status: "Active" }, { status: "Disable" }],
      valueDropDownMembership: null,
      disableEditMembership: true,
      dataMembership: {},
      disableAlertPointRate: true,
      disableAlertPointAmount: true,
      disableButtonEdit: true,
      disableButtonSave: true,
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
    ...mapGetters(["getMemberships", "getMembership"]),
    modelDataMembership() {
      return this.getMemberships;
    },
  },
  watch: {},
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
  methods: {
    ...mapActions(["getAllMembership", "saveMembership", "getMembershipById"]),
    async init() {
      const data1 = await this.getAllMembership();
    },
    setDataMembership() {
      this.data = this.getMemberships;
    },
    async getValueMembership(membershipId) {
      this.disableAlertPointRate = true;
      this.disableAlertPointAmount = true;
      this.disableButtonEdit = false;
      this.disableEditMembership = true;
      const response = await this.getMembershipById(membershipId);
      if (response.status == 200) {
        this.dataMembership = this.getMembership;
      }
    },
    saveMemberships() {
      if (this.disableAlertPointRate && this.disableAlertPointAmount) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            (this.loading = true),
              (this.dataMembership.updatedBy = JSON.parse(
                localStorage.getItem("user")
              ).id);
            this.dataMembership.updatedDate = moment(new Date()).format(
              "YYYY-MM-DDTHH:mm"
            );
            this.dataMembership.pointRate = parseFloat(
              this.dataMembership.pointRate
            );
            this.dataMembership.pointAmount = parseFloat(
              this.dataMembership.pointAmount
            );
            this.dataMembership.status = "Active";
            this.dataMembership.updaterFullname = JSON.parse(
              localStorage.getItem("user")
            ).fullname;
            this.saveMembership(this.dataMembership).then((response) => {
              if (response == 204) {
                this.disableEditMembership = true;
                this.disableButtonSave = true;
                this.loading = false;
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
    checkPointRate() {
      if (
        this.dataMembership.pointRate == "" ||
        !this.dataMembership.pointRate.match(/^\d*\.?\d*$/)
      ) {
        this.disableAlertPointRate = false;
      } else {
        this.disableAlertPointRate = true;
      }
    },
    checkPointAmount() {
      if (
        this.dataMembership.pointAmount == "" ||
        !this.dataMembership.pointAmount.match(/^\d*\.?\d*$/)
      ) {
        this.disableAlertPointAmount = false;
      } else {
        this.disableAlertPointAmount = true;
      }
    },
    editMethod() {
      this.disableEditMembership = false;
      this.disableButtonSave = false;
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