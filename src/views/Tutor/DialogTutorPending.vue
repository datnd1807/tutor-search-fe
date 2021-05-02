<template>
  <div>
    <template :model="listTutorPending">
      <el-badge :value="listTutorPending.length" class="item">
        <el-button size="medium" @click="dialogVisible = true"
          >Confirm tutors</el-button
        >
      </el-badge>
    </template>
    <el-dialog :visible.sync="dialogVisible" width="50%" top="20px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-user"></i>List tutor pending</span
      >
      <el-table
        :data="listTutorPending"
        height="350"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="row">
              <div class="col">
                <li>Phone: {{ props.row.phone }}</li>
              </div>
              <div class="col">
                <li>Gender: {{ props.row.gender }}</li>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <li>Birthday: {{ props.row.birthday | formatDate }}</li>
              </div>
              <div class="col">
                <li>School: {{ props.row.school }}</li>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <li>Level: {{ props.row.educationLevel }}</li>
              </div>
              <div class="col">
                <li>Status: {{ props.row.status }}</li>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <li>
                  <el-popover
                    placement="top-start"
                    title="Description"
                    width="200"
                    trigger="hover"
                    :content="props.row.description"
                  >
                    <el-button type="text" slot="reference"
                      >Description</el-button
                    >
                  </el-popover>
                </li>
              </div>
              <div class="col">
                <li>
                  <el-popover
                    placement="top-start"
                    title="Address"
                    width="200"
                    trigger="hover"
                    :content="props.row.address"
                  >
                    <el-button type="text" slot="reference">Address</el-button>
                  </el-popover>
                </li>
              </div>
            </div>
            <div class="row">
              <certificate
                :data="listTutorPending[indexData(props.row)]"
              ></certificate>
              <social-id
                :data="listTutorPending[indexData(props.row)]"
              ></social-id>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Fullname" prop="fullname"> </el-table-column>
        <el-table-column label="Avatar">
          <template slot-scope="props">
            <el-popover placement="top" width="200" trigger="hover">
              <el-image :src="props.row.avatarImageLink"> </el-image>
              <el-button type="text" slot="reference">View</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Email" prop="email"> </el-table-column>
        <el-table-column
          prop="createdDate"
          label="Date created"
          :formatter="formatDateTime"
        ></el-table-column>

        <el-table-column label="Actions">
          <template slot-scope="props">
            <el-button
              type="primary"
              icon="el-icon-check"
              size="small"
              circle
              @click="openActive(props.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              @click="openDelete(props.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Certificate from "./Certificate.vue";
import SocialId from "./SocialId";
export default {
  components: { Certificate, SocialId },
  name: "dialog-tutor-pending",
  computed: {
    ...mapGetters(["getTutorsPending", "getNotification"]),
    listTutorPending() {
      return this.getTutorsPending;
    },
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
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      "enableTutorPending",
      "getAllImage",
      "insertNotificationMessageAction",
      "denyTutorPending",
    ]),
    ...mapMutations(["setTutorPending", "setNotification"]),
    indexData(conditionFn) {
      return this.listTutorPending.indexOf(conditionFn);
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
    openDelete(row) {
      this.$confirm("Do you want to delete this tutor account?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.loading = true;
          const index = this.listTutorPending.indexOf(row);
          this.listTutorPending[index].confirmedDate = moment(
            new Date()
          ).format("YYYY-MM-DDTHH:mm");
          this.listTutorPending[index].confirmedBy = JSON.parse(
            localStorage.getItem("user")
          ).id;
          const response = await this.denyTutorPending(this.listTutorPending[index]);
          if (response.status == 204) {
            this.sendMessage(
              "Your account has been denied",
              "Account Status",
              row.email
            );
            this.$message({
              type: "success",
              message: "Delete completed",
            });
            this.loading = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    openActive(row) {
      this.$confirm("Do you want to active this tutor account?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          this.loading = true;
          const index = this.listTutorPending.indexOf(row);
          this.listTutorPending[index].confirmedDate = moment(
            new Date()
          ).format("YYYY-MM-DDTHH:mm");

          this.listTutorPending[index].confirmedBy = JSON.parse(
            localStorage.getItem("user")
          ).id;
          const response = await this.enableTutorPending(
            this.listTutorPending[index]
          );
          if (response.status == 204) {
            this.sendMessage(
              "Your account has been actived",
              "Account Status",
              row.email
            );
            this.$message({
              type: "success",
              message: "Active completed",
            });
            this.loading = false;
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Active canceled",
          });
        });
    },
    formatDateTime(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD [at] hh:mm:ss");
    },
    async init() {
      let data = await this.getAllImage();
    },
  },
  filters: {
    formatDate(value) {
      var formatter = moment(new Date(value)).format("YYYY/MM/DD");
      return formatter;
    },
  },
  mounted() {
    this.init();
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
.avatar-tutor {
  .el-image {
    border-radius: 50%;
    box-shadow: 3px 3px 3px gray;
  }
}
</style>