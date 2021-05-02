<template>
  <div>
    <div class="card shadow">
      <div class="card-header border-0">
        <el-form
          :model="filterForm"
          ref="filterForm"
          :inline="true"
        >
          <el-form-item class="h1 pl-2" label="Class name">
            <el-input
              placeholder="Input class"
              v-model="filterForm.className"
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
        <el-row type="flex" justify="end">
          <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="3" :offset="0">
            <el-button
              icon="el-icon-plus"
              type="primary"
              round
              @click="handleCreateBtn"
              >Create Class</el-button
            >
          </el-col>
        </el-row>
      </div>

      <div class="table-responsive">
        <el-table
          :data="classData.data"
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
          <el-table-column prop="name" label="Name"  align="center">
          </el-table-column>
          <el-table-column
            prop="createdDate"
            label="Date created"
            align="center"
            :formatter="dateFormat"
          >
          </el-table-column>

          <el-table-column prop="status" label="Status" align="center">
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
            {{ (classData.currentPage - 1) * classData.pageSize + 1 }} To
            {{ (classData.currentPage - 1) * classData.pageSize + dataLength }}
            Of {{ classData.totalCount }} Entries</el-col
          >
          <el-col
            :span="8"
            class="create-account-paging"
            style="text-align: right"
          >
            <el-pagination
              background
              :page-size="classData.pageSize"
              :total="classData.totalCount"
              layout="prev, pager, next"
              :current-page="classData.currentPage"
              @current-change="setPage"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>

    <update-class
      :dialogVisible="updateDialogVisible"
      @close="handleUpdateDlClose"
    />
    <class-detail
      :dialogVisible="detailDialogVisible"
      @close="handleDetailDlClose"
    />
    <create-class
      :dialogVisible="dialogVisible"
      @close="handleClose"
      :filter="filter"
    />
  </div>
</template>
<script>
import CreateClass from "./CreateClass.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import UpdateClass from "./UpdateClass.vue";
import ClassDetail from "./ClassDetail.vue";
export default {
  name: "classes-table",
  components: {
    CreateClass,
    UpdateClass,
    ClassDetail,
  },

  mounted() {
    this.userId = JSON.parse(localStorage.getItem("user")).id;
  },
  computed: {
    ...mapGetters(["getClassData", "getClassObj"]),

    classData: {
      get() {
        return this.getClassData;
      },
      set(val) {
        this.setClassData(val);
      },
    },
    classObj: {
      get() {
        return this.getClassObj;
      },
      set(val) {
        this.setClassObj(val);
      },
    },
    dataLength: {
      get() {
        if (this.classData.data) {
          return this.classData.data.length;
        } else return 0;
      },
    },
  },

  data() {
    return {
      loading: false,
      title: "Classes Table",
      dialogVisible: false,
      updateDialogVisible: false,
      detailDialogVisible: false,
      filter: {},
      filterForm: {
        className: "",
        status: "",
      },
      statuses: [{ value: "Active" }, { value: "Inactive" }],
      listClasses: [],
      userId: 0,
    };
  },
  methods: {
    ...mapActions([
      "getClassByIdAction",
      "inactiveClassAction",
      "updateClassAction",
      "filterClassAction",
      "getCountClassHasSubjectByClassAction",
    ]),
    ...mapMutations(["setClassData", "setClassObj"]),

    async loadingPage() {
      this.loading = true;
      await this.filterClassAction(this.filter);
      this.loading = false;
    },

    async handleDelete(index, row) {
      const checkClassHasSubject = await this.getCountClassHasSubjectByClassAction(
        row.id
      );
      if (checkClassHasSubject.data === 0) {
        this.$confirm(
          "This will permanently inactive the class. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        )
          .then(async () => {
            this.classObj = {
              id: row.id,
              updatedBy: this.userId,
            };
            var res = await this.inactiveClassAction();
            if (res.status === 204) {
              this.$message({
                type: "success",
                message: "Update completed",
              });
              await this.loadingPage();
            } else {
              this.$message({
                type: "error",
                message: "Update fail",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Update canceled",
            });
          });
      } else {
        this.$alert(
          `This class is being used in ${checkClassHasSubject.data} subjects. Please inactive all.`,
          "You cannot inactive this row ",
          {
            center: true,
          }
        ).catch(() => {});
      }
    },
    handleActive(index, row) {
      this.$confirm(
        "This will permanently active the class. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          this.classObj = {
            id: row.id,
            name: row.name,
            description: row.description,
            updatedBy: this.userId,
            createdBy: row.createdBy,
            createdDate: row.createdDate,
            status: "Active",
          };
          var res = await this.updateClassAction();
          if (res.status === 204) {
            this.$message({
              type: "success",
              message: "Update completed",
            });
            await this.loadingPage();
          } else {
            this.$message({
              type: "error",
              message: "Update fail",
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
    async setPage(val) {
      this.currentPage = val;
      (this.filter.pageSize = this.pageSize),
        (this.filter.pageNumber = this.currentPage);
      await this.loadingPage();
    },

    handleCreateBtn() {
      this.classObj = {
        createdBy: this.userId,
        updatedBy: this.userId,
        name: "",
        status: "Active",
        description: "",
      };
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    async handleUpdateDlOpen(index, row) {
      this.classObj = {
        id: row.id,
      };
      const res = await this.getClassByIdAction();
      this.updateDialogVisible = true;
    },
    handleUpdateDlClose() {
      this.updateDialogVisible = false;
    },
    /**
     * handle when click show detail button
     */
    async handleDetailDlOpen(index, row) {
      this.classObj.id = row.id;
      var res = await this.getClassByIdAction();
      this.detailDialogVisible = true;
    },
    handleDetailDlClose() {
      this.detailDialogVisible = false;
    },

    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD [at] HH:mm:ss");
    },
    onSubmitSearch() {
      this.filter = {};
      if (this.filterForm) {
        if (this.filterForm.className) {
          this.filter.name = this.filterForm.className;
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
      this.loadingPage();
    },
    indexMethod(index) {
      return (
        (this.classData.currentPage - 1) * this.classData.pageSize + index + 1
      );
    },
  },
};
</script>
<style lang='scss' scoped>
.pageSize {
  .el-select {
    width: 10vh;
  }
}
</style>
