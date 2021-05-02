<template>
  <div>
    <el-button
      type="info"
      icon="el-icon-edit"
      size="small"
      @click="editProfileManager(form.id)"
      circle
    ></el-button>
    <el-dialog
      title="Update account"
      :visible.sync="dialogVisible"
      width="70%"
      top="20px"
      @close="handleClose()"
    >
      <el-form
        ref="form"
        :model="dataManager"
        label-width="120px"
        :inline="true"
        class="demo-form-inline"
        v-loading="loading"
      >
        <h6 class="heading text-muted mb-2">User information</h6>
        <div class="row">
          <div class="col-lg-2">
            <div class="text-center">
              <img
                :src="dataManager.avatarImageLink"
                class="avatar img-circle img-thumbnail ava-img"
                alt=" "
              />
              <hr class="my-4" />
              <el-button type="primary" @click="click1">Upload image</el-button>
              <input
                type="file"
                ref="input1"
                style="display: none"
                @change="onFileChange"
                @click="$refs.input1.value = null"
                accept="image/x-png,image/gif,image/jpeg"
              />
            </div>
          </div>
          <div class="col-lg-10">
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <label class="text-search mr-2" for="select-role"
                    >Fullname</label
                  >
                  <el-input
                    v-model="dataManager.fullname"
                    placeholder="Fullname"
                    v-on:input="checkFullname()"
                  ></el-input>
                  <el-alert
                    title="The fullname value must be letters and have a value between 1 ~ 50"
                    type="error"
                    show-icon
                    :hidden="disableAlertFullname"
                    :closable="false"
                  >
                  </el-alert>
                </div>
                <div class="col-lg-6">
                  <label class="text-search mr-2" for="select-role"
                    >Phone</label
                  >
                  <el-input
                    v-model="dataManager.phone"
                    placeholder="0123456789"
                    v-on:input="checkPhone()"
                  ></el-input>
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
              <div class="row">
                <div class="col-lg-6">
                  <label class="text-search mr-2" for="select-role"
                    >Address</label
                  >
                  <el-input
                    v-model="dataManager.address"
                    v-on:input="checkAddress()"
                  ></el-input>
                  <el-alert
                    title="Address can not be blank"
                    type="error"
                    show-icon
                    :hidden="disableAlertAddess"
                    :closable="false"
                  >
                  </el-alert>
                </div>
                <div class="col-lg-4">
                  <label class="text-search mr-2" for="select-role"
                    >Birthday</label
                  ><br />
                  <el-date-picker
                    v-model="dataManager.birthday"
                    type="date"
                    size="normal"
                    placeholder="Pick a day"
                    class="form-control-alternative"
                    :picker-options="pickerOption"
                    :clearable="false"
                    :editable="false"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <label class="text-search mr-2">Gender</label><br />
                  <el-radio
                    class="mt-2"
                    v-for="item in gender"
                    :key="item.name"
                    :label="item.name"
                    v-model="dataManager.gender"
                    @change="checkGender()"
                  >
                  </el-radio>
                  <el-alert
                    title="Please choose gender"
                    type="error"
                    show-icon
                    :hidden="disableAlertGender"
                    :closable="false"
                  ></el-alert>
                </div>
              </div>
            </div>
            <div class="pl-lg-4">
              <div class="form-group">
                <base-input alternative="" label="About Me">
                  <textarea
                    rows="4"
                    class="form-control form-control-alternative"
                    placeholder="A few words about you ..."
                    v-model="dataManager.description"
                  ></textarea>
                </base-input>
              </div>
            </div>
          </div>
        </div>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false" :disabled="disableButton"
          >Cancel</el-button
        >
        <el-button type="primary" @click="openSave()" :disabled="disableButton"
          >Submit</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/storage";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "update-manager",
  computed: {
    ...mapGetters(["getManager"]),
  },
  props: {
    form: {
      type: Object,
    },
  },
  data() {
    return {
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dialogVisible: false,
      gender: [
        { id: "male", name: "Male" },
        { id: "female", name: "Female" },
      ],
      disableAlertFullname: true,
      disableAlertAddess: true,
      disableAlertPhone: true,
      disableAlertBirthDay: true,
      disableAlertGender: true,
      caption: "",
      imageData: {},
      loading: false,
      disableButton: false,
      dataManager: {},
    };
  },
  methods: {
    ...mapActions(["insertManager", "updateProfileManager", "getManagerById"]),
    async editProfileManager(id) {
      const response = await this.getManagerById(id);
      if (response.status == 200) {
        this.dialogVisible = true;
        this.dataManager = this.getManager;
      }
    },
    handleClose() {
      this.imageData = {};
    },
    checkFullname() {
      if (
        this.dataManager.fullname.trim() == "" ||
        !this.dataManager.fullname
          .toLowerCase()
          .match(
            /^[a-zA-Z\saàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹý]+$/
          ) ||
        this.dataManager.fullname.length > 50
      ) {
        this.disableAlertFullname = false;
      } else {
        this.disableAlertFullname = true;
      }
    },
    checkAddress() {
      if (
        this.dataManager.address == "" ||
        this.dataManager.address.length > 256
      ) {
        this.disableAlertAddess = false;
      } else {
        this.disableAlertAddess = true;
      }
    },
    checkPhone() {
      if (
        this.dataManager.phone == "" ||
        this.dataManager.phone.length > 15 ||
        this.dataManager.phone.length < 8 ||
        !this.dataManager.phone.match(/^[0-9]*$/)
      ) {
        this.disableAlertPhone = false;
      } else {
        this.disableAlertPhone = true;
      }
    },
    checkGender() {
      if (this.dataManager.gender == "") {
        this.disableAlertGender = false;
      } else {
        this.disableAlertGender = true;
      }
    },
    openSave() {
      this.checkFullname();
      this.checkAddress();
      this.checkPhone();
      this.checkGender();
      if (
        this.disableAlertFullname &&
        this.disableAlertAddess &&
        this.disableAlertPhone &&
        this.disableAlertGender
      ) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.loading = true;
            this.disableButton = true;
            this.onUpload();
          })
          .catch((err) => {
            this.$message({
              type: "info",
              message: "Save canceled",
            });
            console.log(err);
          });
      }
    },
    click1() {
      this.$refs.input1.click();
    },
    onFileChange(e) {
      this.imageData = e.target.files[0];
      if (this.imageData.type.indexOf("image") != -1) {
        this.dataManager.avatarImageLink = URL.createObjectURL(this.imageData);
      } else {
        this.dataManager.avatarImageLink = "";
      }
    },

    onUpload() {
      this.uploadValue = 0;
      if (this.imageData.name != undefined) {
        const storageRef = firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .put(this.imageData);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then(async (url) => {
              this.dataManager.avatarImageLink = url;
              const response = await this.updateProfileManager(
                this.dataManager
              );
              if (response.status == 204) {
                this.$message({
                  type: "success",
                  message: "Save completed",
                });
                this.loading = false;
                this.disableButton = false;
                this.dialogVisible = false;
              }
            });
          }
        );
      } else {
        this.updateProfileManager(this.dataManager).then((response) => {
          if (response.status == 204) {
            this.$message({
              type: "success",
              message: "Save completed",
            });
            this.loading = false;
            this.disableButton = false;
            this.dialogVisible = false;
          }
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.ava-img {
  height: 20vh;
  width: 10vw;
}
.text-search {
  margin-top: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #606266;
}
</style>