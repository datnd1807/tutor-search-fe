<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 600px;
        background-image: url(img/theme/cover-img.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <span class="mask bg-gradient-info opacity-8"></span>

      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col">
            <h2 class="display-2 text-white">
              Hello,<br />{{ userProfile.fullname }}
            </h2>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col-xl-12 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image pro-avatar">
                  <img
                    v-if="userProfile.avatarImageLink != ''"
                    :src="userProfile.avatarImageLink"
                    class="rounded-circle"
                  />
                  <img v-else :src="avatar" class="rounded-circle" />
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            ></div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div
                    class="card-profile-stats d-flex justify-content-center mt-md-5"
                  ></div>
                </div>
              </div>
              <div class="col-xl-12 order-xl-1">
                <card shadow type="secondary">
                  <div slot="header" class="bg-white border-0">
                    <div class="row align-items-center">
                      <div class="col-8">
                        <h3 class="mb-0">My account</h3>
                      </div>
                      <div class="col-4 text-right">
                        <el-button
                          v-if="userProfile.roleId == 1"
                          type="primary"
                          size="small"
                          v-on:click="editProfile = false"
                          :disabled="disableButton"
                          >Edit</el-button
                        >
                        <el-button
                          v-if="userProfile.roleId == 1"
                          type="primary"
                          size="small"
                          @click="openSave()"
                          :disabled="disableButton"
                          >Save</el-button
                        >
                      </div>
                    </div>
                  </div>
                  <template>
                    <el-form
                      ref="form"
                      v-model="userProfile"
                      label-width="120px"
                      :inline="true"
                      v-loading="loading"
                    >
                      <h6 class="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <div class="pl-lg-5">
                        <div class="row">
                          <div class="col-lg-4">
                            <label class="text-search mr-2" for="select-role"
                              >Fullname</label
                            >
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-input
                                v-model="userProfile.fullname"
                                :readonly="editProfile"
                                v-on:input="checkFullname()"
                              ></el-input>
                            </div>
                            <div v-else>
                              <el-input
                                v-model="userProfile.fullname"
                                :readonly="editProfile"
                                v-on:input="checkFullname()"
                              ></el-input>
                            </div>
                            <el-alert
                              title="The fullname value must be letters and have a value between 1 ~ 50"
                              type="error"
                              show-icon
                              :hidden="disableAlertFullname"
                              :closable="false"
                            >
                            </el-alert>
                          </div>
                          <div class="col-lg-2">
                            <label class="text-search mr-2" for="select-role"
                              >Gender</label
                            ><br />
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-select
                                v-model="userProfile.gender"
                                placeholder="Select"
                              >
                                <el-option
                                  v-for="data in genderList"
                                  :key="data.gender"
                                  :label="data.gender"
                                  :value="data.gender"
                                  :disabled="editProfile"
                                ></el-option>
                              </el-select>
                            </div>
                            <div v-else>
                              <el-select
                                v-model="userProfile.gender"
                                placeholder="Select"
                              >
                                <el-option
                                  v-for="data in genderList"
                                  :key="data.gender"
                                  :label="data.gender"
                                  :value="data.gender"
                                  :disabled="editProfile"
                                ></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="col-lg-2.5">
                            <label class="text-search mr-2" for="select-role"
                              >Birthday</label
                            ><br />
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-date-picker
                                v-model="userProfile.birthday"
                                type="date"
                                placeholder="Pick a day"
                                :picker-options="pickerOption"
                                :readonly="editProfile"
                                :clearable="false"
                                @change="formatDate(userProfile.birthday)"
                                :editable="false"
                              >
                              </el-date-picker>
                            </div>
                            <div v-else>
                              <el-date-picker
                                v-model="userProfile.birthday"
                                type="date"
                                placeholder="Pick a day"
                                :picker-options="pickerOption"
                                :readonly="editProfile"
                                :clearable="false"
                                :editable="false"
                                @change="formatDate(userProfile.birthday)"
                              >
                              </el-date-picker>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-6">
                            <label class="text-search mr-2" for="select-role"
                              >Address</label
                            >
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-input
                                v-model="userProfile.address"
                                :readonly="editProfile"
                                v-on:input="checkAddress()"
                              ></el-input>
                            </div>
                            <div v-else>
                              <el-input
                                v-model="userProfile.address"
                                :readonly="editProfile"
                                v-on:input="checkAddress()"
                              ></el-input>
                            </div>
                            <el-alert
                              title="Address can not be blank"
                              type="error"
                              show-icon
                              :hidden="disableAlertAddess"
                              :closable="false"
                            >
                            </el-alert>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                      <!-- Address -->
                      <h6 class="heading-small text-muted mb-4">
                        Contact information
                      </h6>
                      <div class="pl-lg-5">
                        <div class="row">
                          <div class="col-lg-4">
                            <label class="text-search mr-2" for="select-role"
                              >Email</label
                            >
                            <el-input
                              v-model="userProfile.email"
                              :readonly="true"
                            ></el-input>
                          </div>
                          <div class="col-lg-3">
                            <label class="text-search mr-2" for="select-role"
                              >Phone</label
                            >
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-input
                                v-model="userProfile.phone"
                                :readonly="editProfile"
                                v-on:input="checkPhone"
                              ></el-input>
                            </div>
                            <div v-else>
                              <el-input
                                v-model="userProfile.phone"
                                :readonly="editProfile"
                                v-on:input="checkPhone"
                              ></el-input>
                            </div>
                            <el-alert
                              title="Phone must be a number (8 ~ 15)"
                              type="error"
                              show-icon
                              :hidden="disableAlertPhone"
                              :closable="false"
                            >
                            </el-alert>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                      <!-- Description -->
                      <h6 class="heading-small text-muted mb-4">About me</h6>
                      <div class="pl-lg-5">
                        <div class="form-group">
                          <label class="text-search mr-2" for="select-role"
                            >Description</label
                          >
                          <div v-if="editProfile == false" class="Light_Shadow">
                            <el-input
                              type="textarea"
                              maxlength="150"
                              v-model="userProfile.description"
                              :readonly="editProfile"
                            ></el-input>
                          </div>
                          <div v-else>
                            <el-input
                              type="textarea"
                              v-model="userProfile.description"
                              :readonly="editProfile"
                            ></el-input>
                          </div>
                        </div>
                      </div>
                    </el-form>
                  </template>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "user-profile",
  computed: {
    ...mapGetters(["getAccountManager"]),
    userProfile() {
      return this.getAccountManager;
    },
  },
  data() {
    return {
      avatar: "../assets/avatar_default.jpg",
      disableButton: false,
      editProfile: true,
      disableAlertFullname: true,
      disableAlertAddess: true,
      disableAlertPhone: true,
      loading: false,
      genderList: [{ gender: "Male" }, { gender: "Female" }],
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods: {
    ...mapActions(["getAccountManagerById", "updateAccount"]),
    formatDate(value) {
      var date = moment(new Date(value)).format("YYYY-MM-DD");
      this.userProfile.birthday = date;
    },
    checkFullname() {
      if (
        this.userProfile.fullname.trim() == "" ||
        !this.userProfile.fullname
          .toLowerCase()
          .match(
            /^[a-zA-Z\saàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹý]+$/
          ) ||
        this.userProfile.fullname.length > 100
      ) {
        this.disableAlertFullname = false;
      } else {
        this.disableAlertFullname = true;
      }
    },
    checkAddress() {
      if (
        this.userProfile.address == "" ||
        this.userProfile.address.length > 100
      ) {
        this.disableAlertAddess = false;
      } else {
        this.disableAlertAddess = true;
      }
    },
    checkPhone() {
      if (
        this.userProfile.phone == "" ||
        this.userProfile.phone.length > 15 ||
        this.userProfile.phone.length < 8 ||
        !this.userProfile.phone.match(/^[0-9]*$/)
      ) {
        this.disableAlertPhone = false;
      } else {
        this.disableAlertPhone = true;
      }
    },
    openSave() {
      if (
        this.disableAlertFullname &&
        this.disableAlertAddess &&
        this.disableAlertPhone &&
        !this.editProfile
      ) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.disableButton = true;
            this.loading = true;
            this.userProfile.createdBy = JSON.parse(
              localStorage.getItem("user")
            ).id;
            this.updateAccount(this.userProfile).then((response) => {
              if (response == 204) {
                this.disableButton = false;
                this.editProfile = true;
                this.loading = false;
                this.$message({
                  type: "success",
                  message: "Save completed",
                });
                localStorage.setItem("user", JSON.stringify(this.userProfile));
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
    init() {
      this.getAccountManagerById(JSON.parse(localStorage.getItem("user")).id);
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    if (JSON.parse(localStorage.getItem("user")) != null) {
      this.init();
    }
  },
};
</script>
<style scoped lang=scss >
.text-search {
  margin-top: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #606266;
}
.Light_Shadow {
  box-shadow: 0 3px 15px 0 rgba(252, 15, 15, 0.267);
}
.pro-avatar img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 1);
}
</style>
