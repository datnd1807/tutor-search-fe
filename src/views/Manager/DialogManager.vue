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
        @click="openDelete()"
      ></el-button>
    </template>
    <el-dialog :visible.sync="dialogVisible" width="40%" top="20px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-user"></i>Manager profile detail</span
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
        <div class="row justify-content-end pr-4">
          <update-profile :form="data"></update-profile>
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
                ></base-input>
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
                :content="data.address"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input
                  alternative=""
                  label="Address"
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
          </div>
          <div class="row">
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
          <div class="row">
            <div class="col-lg-6">
              <el-tooltip
                class="item"
                effect="dark"
                :content="subjectList"
                placement="top-start"
                :open-delay="1000"
              >
                <base-input alternative="" label="Subject managed">
                  <textarea
                    rows="4"
                    class="form-control form-control-alternative"
                    v-model="subjectList"
                    :readonly="true"
                  ></textarea>
                </base-input>
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
    <confirm-inactive :dialogVisible="confirmInactiveVisible" :data="data" @close="confirmInactiveVisibleClose"/>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import UpdateProfile from "./UpdateProfile";
import ConfirmInactive from './ConfirmInactive.vue';
export default {
  name: "dialog-manager",
  components: {
    UpdateProfile,
    ConfirmInactive,
  },
  props: {
    data: Object,
  },
  computed: {
    ...mapState(["subjects"]),
    ...mapGetters(["getAllSubjects"]),
    getSubjectName() {
      return this.getAllSubjects;
    },
    
  },
  data() {
    return {
      dialogVisible: false,
      subjectList: "",
      confirmInactiveVisible : false
    };
  },
  methods: {
    ...mapActions(["enableStatusManager"]),
    handleButtonAccept(check) {
      if (check == "Active") {
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
    openDelete() {
      this.confirmInactiveVisible = true
    },
    confirmInactiveVisibleClose(){
      this.confirmInactiveVisible = false
    },
    
    openActive() {
      this.$confirm("Do you want to active this manager account?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.data.createdBy = JSON.parse(localStorage.getItem("user")).id;
          const response = await this.enableStatusManager(this.data);
          if (response.status == 204) {
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
    handleDialog(id) {
      this.subjectList = "";
      this.dialogVisible = true;
      var list = Object.values(this.getSubjectName).filter(
        (user) => user.manageBy === id
      );
      for (const value of list) {
        if (this.subjectList != "") {
          this.subjectList = this.subjectList + ", " + value.name;
        } else {
          this.subjectList = value.name;
        }
      }
    },
  },
  filters: {
    formatDateTime(value) {
      var formatter = moment(new Date(value)).format(
        "YYYY/MM/DD [at] hh:mm:ss"
      );
      return formatter;
    },
    formatDate(value) {
      var formatter = moment(new Date(value)).format("YYYY/MM/DD");
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
    margin: 0px 250px;
    border-radius: 50%;
    box-shadow: 3px 3px 3px gray;
  }
}
</style>