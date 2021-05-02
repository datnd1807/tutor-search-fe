<template>
  <div>
    <el-button
      type="primary"
      round
      icon="el-icon-plus"
      @click="dialogVisible = true"
      >Create account manager</el-button
    >
    <el-dialog
      title="Create account"
      :visible.sync="dialogVisible"
      width="70%"
      top="20px"
      @close="handleClose()"
    >
      <el-form
        ref="form"
        :model="form"
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
                :src="form.avatarImageLink"
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
            <div class="pt-2">
              <el-alert
                title="Choose image"
                type="error"
                show-icon
                :hidden="disableAlertImage"
                :closable="false"
              ></el-alert>
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
                    v-model="form.fullname"
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
                    >Email</label
                  >
                  <el-input
                    v-model="form.email"
                    placeholder="john1998@gmail.com"
                    v-on:input="checkEmail()"
                  ></el-input>
                  <el-alert
                    title="Email wrong format"
                    type="error"
                    show-icon
                    :hidden="disableAlertEmail"
                    :closable="false"
                  >
                  </el-alert>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6">
                  <label class="text-search mr-2" for="select-role"
                    >Phone</label
                  >
                  <el-input
                    v-model="form.phone"
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
                <div class="col-lg-4">
                  <label class="text-search mr-2" for="select-role"
                    >Birthday</label
                  ><br />
                  <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    size="normal"
                    placeholder="Pick a day"
                    class="form-control-alternative"
                    :picker-options="pickerOption"
                    @change="checkDate()"
                    :clearable="false"
                    :editable="false"
                  >
                  </el-date-picker>
                  <el-alert
                    title="Please choose your birthday"
                    type="error"
                    show-icon
                    :hidden="disableAlertBirthDay"
                    :closable="false"
                  >
                  </el-alert>
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
                    v-model="form.gender"
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
                <div class="col-lg-6">
                  <label class="text-search mr-2" for="select-role"
                    >Address</label
                  >
                  <el-input
                    v-model="form.address"
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
              </div>
            </div>
            <div class="pl-lg-4">
              <div class="form-group">
                <base-input alternative="" label="About Me">
                  <textarea
                    rows="4"
                    class="form-control form-control-alternative"
                    placeholder="A few words about you ..."
                    v-model="form.description"
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
import { mapActions } from "vuex";
import moment from "moment";
export default {
  name: "create-manager",
  data() {
    return {
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      dialogVisible: false,
      options: null,
      value1: null,
      form: {
        fullname: "",
        gender: "",
        birthday: "",
        email: "",
        description: "",
        phone: "",
        avatarImageLink: "",
        address: "",
        roleId: 2,
        status: "Active",
      },
      gender: [
        { id: "male", name: "Male" },
        { id: "female", name: "Female" },
      ],
      disableAlertFullname: true,
      disableAlertAddess: true,
      disableAlertEmail: true,
      disableAlertPhone: true,
      disableAlertBirthDay: true,
      disableAlertImage: true,
      disableAlertGender: true,
      caption: "",
      imageData: null,
      loading: false,
      disableButton: false,
    };
  },
  methods: {
    ...mapActions([
      "insertManager",
      "insertAccountManager",
      "checkMailExisted",
    ]),
    handleClose() {
      this.form.avatarImageLink = "";
    },
    checkDate() {
      if (this.form.birthday != "") {
        this.disableAlertBirthDay = true;
      } else {
        this.disableAlertBirthDay = false;
      }
    },
    checkFullname() {
      if (
        this.form.fullname.trim() == "" ||
        !this.form.fullname
          .toLowerCase()
          .match(
            /^[a-zA-Z\saàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹý]+$/
          ) ||
        this.form.fullname.length > 256
      ) {
        this.disableAlertFullname = false;
      } else {
        this.disableAlertFullname = true;
      }
    },
    checkAddress() {
      if (this.form.address == "" || this.form.address.length > 500) {
        this.disableAlertAddess = false;
      } else {
        this.disableAlertAddess = true;
      }
    },
    checkEmail() {
      if (
        this.form.email == "" ||
        this.form.email.length > 256 ||
        !this.form.email.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        )
      ) {
        this.disableAlertEmail = false;
      } else {
        this.disableAlertEmail = true;
      }
    },
    checkPhone() {
      if (
        this.form.phone == "" ||
        this.form.phone.length > 15 ||
        this.form.phone.length < 8 ||
        !this.form.phone.match(/^[0-9]*$/)
      ) {
        this.disableAlertPhone = false;
      } else {
        this.disableAlertPhone = true;
      }
    },
    checkImage() {
      if (this.form.avatarImageLink == "") {
        this.disableAlertImage = false;
      } else this.disableAlertImage = true;
    },
    checkGender() {
      if (this.form.gender == "") {
        this.disableAlertGender = false;
      } else {
        this.disableAlertGender = true;
      }
    },
    openSave() {
      this.checkDate();
      this.checkFullname();
      this.checkAddress();
      this.checkEmail();
      this.checkPhone();
      this.checkImage();
      this.checkGender();
      if (
        this.disableAlertFullname &&
        this.disableAlertAddess &&
        this.disableAlertEmail &&
        this.disableAlertPhone &&
        this.disableAlertImage &&
        this.disableAlertGender
      ) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.form.birthday = moment(new Date(this.form.birthday)).format(
              "YYYY-MM-DD"
            );
            this.form.createdBy = JSON.parse(localStorage.getItem("user")).id;
            this.loading = true;
            this.disableButton = true;
            this.onUpload();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Save canceled",
            });
          });
      }
    },
    click1() {
      this.$refs.input1.click();
    },
    onFileChange(e) {
      this.imageData = e.target.files[0];
      if (this.imageData.type.indexOf("image") != -1) {
        this.form.avatarImageLink = URL.createObjectURL(this.imageData);
        this.checkImage();
      } else {
        this.form.avatarImageLink = "";
      }
    },

    onUpload() {
      this.uploadValue = 0;
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
            this.form.avatarImageLink = url;
            const response = await this.checkMailExisted(this.form);
            if (response == false) {
              this.$message({
                type: "success",
                message: "Save completed",
              });
              this.loading = false;
              this.disableButton = false;
              this.dialogVisible = false;
            } else {
              this.$message({
                type: "error",
                message: "This email already exists",
              });
              this.loading = false;
              this.disableButton = false;
            }
          });
        }
      );
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