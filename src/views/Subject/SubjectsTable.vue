<template>
  <div class="subject-dialog">
    <div class="card shadow">
      <div class="card-header border-0">
        <el-form
          :model="filterForm"
          ref="filterForm"
          :inline="true"
        >
          <el-form-item class="h1" label="Subject name">
            <el-input
              placeholder="Input subject"
              v-model="filterForm.subjectName"
            ></el-input>
          </el-form-item>
          <el-form-item class="h1 pl-2" label="Manager name">
            <el-input
              placeholder="Input manager"
              v-model="filterForm.managerName"
            ></el-input>
          </el-form-item>
          <el-form-item class="h1 pl-2" label="Status">
            <el-select
              placeholder="Choose status"
              v-model="filterForm.status"
              clearable
            >
              <el-option
                v-for="status in statuses"
                :key="status.value"
                :label="status.value"
                :value="status.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmitSearch"
              icon="el-icon-search"
              >Search</el-button
            >
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="end" :gutter="10" class="mr-2">
          <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="3" :offset="0">
            <el-button
              type="primary"
              size="default"
              @click="handleCreateBtnOpen"
              round
              icon="el-icon-plus"
              >Create Subject</el-button
            >
          </el-col>
        </el-row>
      </div>

      <div class="table-responsive">
        <el-table
          :data="subjectObj.data"
          border
          stripe
          height="580px"
          v-loading="loading"
        >
          <el-table-column
            type="index"
            label="No."
            align="center"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column prop="name" label="Name"> </el-table-column>
          <el-table-column prop="managerName" label="Manager Name">
          </el-table-column>
          <el-table-column
            prop="createdDate"
            label="Date created"
            align="center"
            :formatter="dateFormat"
          >
          </el-table-column>

          <el-table-column prop="status" label="Status" align="center" sortable>
            <template slot-scope="scope">
              <div v-if="scope.row.status == 'Active'">
                <el-tag type="success">{{ scope.row.status }}</el-tag>
              </div>
              <div v-else>
                <el-tag type="danger">{{ scope.row.status }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Action">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleDetailDlOpen(scope.$index, scope.row)"
                icon="el-icon-view"
                circle
                type="info"
              ></el-button>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleUpdateDlOpen(scope.$index, scope.row)"
              ></el-button>

              <el-button
                v-if="scope.row.status === 'Inactive'"
                size="small"
                type="success"
                icon="el-icon-success"
                circle
                @click="handleActive(scope.$index, scope.row)"
              ></el-button>
              <el-button
                v-if="scope.row.status === 'Active'"
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="space-between" class="mt-2">
          <el-col :span="8" :offset="1"
            >Showing
            {{ (subjectObj.currentPage - 1) * subjectObj.pageSize + 1 }} To
            {{
              (subjectObj.currentPage - 1) * subjectObj.pageSize + dataLength
            }}
            Of {{ subjectObj.totalCount }} Entries</el-col
          >
          <el-col
            :span="8"
            class="create-account-paging"
            style="text-align: right"
          >
            <el-pagination
              background
              :page-size="subjectObj.pageSize"
              :total="subjectObj.totalCount"
              layout="prev, pager, next"
              :current-page="subjectObj.currentPage"
              @current-change="setPage"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
    <subject-create
      :dialogVisible="createDialogVisible"
      :filter="filter"
      @close="handelCreateBtnClose"
    />
    <subject-detail
      :dialogVisible="detailDialogVisible"
      @close="handleDetailDlClose"
    />
    <subject-update
      :dialogVisible="updateDialogVisible"
      :filter="filter"
      @close="handleUpdateDlClose"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import SubjectCreate from "./SubjectCreate.vue";
import SubjectDetail from "./SubjectDetail.vue";
import SubjectUpdate from "./SubjectUpdate.vue";

export default {
  name: "subject-table",
  components: {
    SubjectCreate,
    SubjectDetail,
    SubjectUpdate,
  },

  computed: {
    ...mapGetters(["getSubject", "getSubjectObj", "getManagers", "getClasses"]),
    subject: {
      get() {
        return this.getSubject;
      },
      set(value) {
        this.setSubject(value);
      },
    },
    subjectObj: {
      get() {
        return this.getSubjectObj;
      },
      set(val) {
        this.setSubjectObj(val);
      },
    },
    dataLength: {
      get() {
        if (this.subjectObj.data) {
          return this.subjectObj.data.length;
        } else return 0;
      },
    },
  },

  data() {
    return {
      loading: false,
      title: "Subjects Table",
      createDialogVisible: false,
      updateDialogVisible: false,
      detailDialogVisible: false,
      userId: 0,
      filter: {},
      filterForm: {
        subjectName: "",
        managerName: "",
        status: "",
      },
      statuses: [{ value: "Active" }, { value: "Inactive" }],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions([
      "filterSubjectAction",
      "getSubjectById",
      "inactiveSubject",
      "getManagerByStatusAction",
      "getClassByClassHasSubjectNotExistAction",
      "getSubjectById",
      "activeSubjectAction",
      "getClassHasSubjectByIdAction",
      "getCountClassHasSubjectBySubjectAction",
    ]),
    ...mapMutations(["setSubject", "setSubjetObj", "setClassHasSubjectObj"]),

    init() {
      this.userId = JSON.parse(localStorage.getItem("user")).id;
    },

    async loadingPage() {
      this.loading = true;
      await this.filterSubjectAction(this.filter);
      this.loading = false;
    },

    /**
     * handle when click delete icon button
     */
    async handleDelete(index, row) {
      let subjectObj = {
        id: row.id,
        updatedBy: this.userId,
      };
      const checkClassHasSubject = await this.getCountClassHasSubjectBySubjectAction(
        row.id
      );
      if (checkClassHasSubject.data === 0) {
        this.$confirm(
          "This will permanently delete the class. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        )
          .then(async () => {
            try {
              const res = await this.inactiveSubject(subjectObj);
              if (res.status === 204) {
                this.$message({
                  type: "success",
                  message: "Delete completed successfully",
                });
                await this.loadingPage();
              } else {
                this.$message({
                  type: "error",
                  message: "Delete fail!!",
                });
              }
            } catch (error) {
              this.$message({
                type: "error",
                message: error,
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Delete canceled",
            });
          });
      } else {
        this.$alert(
          `This subject is being used in ${checkClassHasSubject.data} classes. Please inactive all.`,
          "You cannot inactive this row ",
          {
            center: true,
          }
        ).catch(() => {});
      }
    },
    async setPage(val) {
      (this.filter.pageNumber = val), await this.loadingPage();
    },
    /**
     * handle when click create new subject button
     */
    async handleCreateBtnOpen() {
      await this.getManagerByStatusAction("Active");
      this.subject = {
        name: "",
        manageBy: this.getManagers[0].id,
        description: "",
        updatedBy: this.userId,
        createdBy: this.userId,
        status: "Active",
      };
      this.createDialogVisible = true;
    },
    /**
     * handle when click close button on create new subject dialog
     */
    handelCreateBtnClose() {
      this.createDialogVisible = false;
    },
    /**
     * handle when click update icon to show update dialog
     */
    async handleUpdateDlOpen(index, row) {
      await this.getSubjectById(row.id);
      await this.getManagerByStatusAction("Active");
      await this.getClassByClassHasSubjectNotExistAction(row.id);
      this.setClassHasSubjectObj({
        classId: this.getClasses[0].id,
        subjectId: row.id,
        createdBy: this.userId,
      });
      await this.getClassHasSubjectByIdAction(row.id);
      this.updateDialogVisible = true;
    },

    /**
     * handle when click close button on update subject dialog
     */
    handleUpdateDlClose() {
      this.updateDialogVisible = false;
    },
    /**
     * handle when click show detail button
     */
    async handleDetailDlOpen(index, row) {
      const response1 = await this.getSubjectById(row.id);
      this.detailDialogVisible = true;
    },
    /**
     * handle when click close detail button
     */
    handleDetailDlClose() {
      this.detailDialogVisible = false;
    },
    /**
     * handle format date time string
     */
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD [at] HH:mm:ss");
    },

    handleActive(index, row) {
      let subject = {
        id: row.id,
        updatedBy: this.userId,
      };
      this.$confirm(
        "This will permanently active the subject. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          try {
            const res = await this.activeSubjectAction(subject);
            if (res.status === 204) {
              this.$message({
                type: "success",
                message: "Update completed successfully",
              });
              await this.loadingPage();
            } else {
              this.$message({
                type: "error",
                message: "Update fail!!",
              });
            }
          } catch (error) {
            this.$message({
              type: "error",
              message: error,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Update canceled",
          });
        });
    },
    indexMethod(index) {
      return (
        (this.subjectObj.currentPage - 1) * this.subjectObj.pageSize + index + 1
      );
    },
    onSubmitSearch() {
      this.filter = {};
      if (this.filterForm) {
        if (this.filterForm.subjectName) {
          this.filter.subjectName = this.filterForm.subjectName;
        }
        if (this.filterForm.managerName) {
          this.filter.managerName = this.filterForm.managerName;
        }
        if (
          this.filterForm.status === "Active" ||
          this.filterForm.status === "Inactive"
        ) {
          this.filter.status = this.filterForm.status;
        }
      } else {
        this.filter = {};
      }
      this.loadingPage(this.filter);
    },
  },
};
</script>
<style lang='scss' scoped>
.pageSize {
  .el-select {
    width: 70px;
  }
}
.create-account-paging {
  text-align: right;
}
</style>
