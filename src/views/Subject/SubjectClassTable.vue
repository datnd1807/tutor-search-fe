<template>
  <div>
    <div class="card shadow">
      <div class="card-header border-0">
        <el-form
          :model="filterForm"
          ref="filterForm"
          :inline="true"
        >
          <el-form-item class="h1" label="Class name">
            <el-input
              placeholder="Input class"
              v-model="filterForm.className"
            ></el-input>
          </el-form-item>
          <el-form-item class="h1 pl-2" label="Subject name">
            <el-input
              placeholder="Input subject"
              v-model="filterForm.subjectName"
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
              @click="onSubmit"
              icon="el-icon-search"
              >Search</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <div class="table-responsive">
        <el-table
          :data="classSubject.data"
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

          <el-table-column prop="className" label="Class Name">
          </el-table-column>
          <el-table-column prop="subjectName" label="Subject Name">
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
            >Showing {{ (classSubject.currentPage - 1) * classSubject.pageSize + 1 }} To
            {{ (classSubject.currentPage - 1) * classSubject.pageSize + dataLength }} Of
            {{ classSubject.totalCount }} Entries</el-col
          >
          <el-col
            :span="8"
            class="create-account-paging"
            style="text-align: right"
          >
            <el-pagination
              background
              :page-size="classSubject.pageSize"
              :total="classSubject.totalCount"
              layout="prev, pager, next"
              :current-page="classSubject.currentPage"
              @current-change="setPage"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "class-subject-table",
  components: {},
  computed: {
    ...mapGetters(["getClassHasSubject"]),
    classSubject: {
      get() {
        return this.getClassHasSubject;
      },
    },
    dataLength: {
      get() {
        if (this.classSubject.data) {
          return this.classSubject.data.length;
        } else return 0;
      },
    },
  },

  data() {
    return {
      loading: false,
      title: "Subjects Classes Table",    
      filterForm: {
        className: "",
        subjectName: "",
        status: "",
      },
      statuses: [{ value: "Active" }, { value: "Inactive" }],
      filter: {},
    };
  },

  methods: {
    ...mapActions([
      "getClassHasSubjectsAction",
      "getCountCourseByClassHasSubjectAction",
      "inactiveClassHasSubjectAction",
      "activeClassHasSubjectAction",
    ]),
    async loadPaging() {
      this.loading = true;
      await this.getClassHasSubjectsAction(this.filter);
      this.loading = false;
    },
    async handleDelete(index, row) {
      const res = await this.getCountCourseByClassHasSubjectAction(row.id);
      if (res.data === 0) {
        this.$confirm(
          "This will permanently disable this subject. Continue?",
          "Warning",
          {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        )
          .then(async () => {
            const res = await this.inactiveClassHasSubjectAction(row.id);
            if (res.data) {
              this.$message({
                type: "success",
                message: "Delete completed",
              });
              this.loading = true;
              await this.getClassHasSubjectsAction(this.filter);
              this.loading = false;
            } else {
              this.$message({
                type: "error",
                message: "Delete fail",
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
          `This subject is being used in ${res.data} active courses. Please inactive all courses.`,
          "You cannot inactive this row ",
          {
            center: true,
          }
        ).catch(() => {});
      }
    },
    async setPage(val) {
      this.filter.pageNumber = val;
      await this.loadPaging();
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD [at] HH:mm:ss");
    },

    handleActive(index, row) {
      this.$confirm(
        "This will permanently active this subject. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          const res = await this.activeClassHasSubjectAction(row.id);
          if (res) {
            if (res.data.type === "success") {
              this.$message({
                type: res.data.type,
                message: res.data.content,
              });
              await this.loadPaging();
            } else if (res.data.type === "error") {
              this.$message({
                type: res.data.type,
                message: res.data.content,
              });
            } else if (res.data.type === "info") {
              this.$alert(res.data.content, res.data.title, {
                center: true,
              }).catch(() => {});
            }
          } else {
            this.$message({
              type: "error",
              message: "Active fail",
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
    async onSubmit() {
      this.loading = true;
      this.filter = {
        PageNumber: 1,
        PageSize: this.pageSize,
      };
      if (this.filterForm.className) {
        this.filter.ClassName = this.filterForm.className;
      }
      if (this.filterForm.subjectName) {
        this.filter.SubjectName = this.filterForm.subjectName;
      }
      if (
        this.filterForm.status === "Active" ||
        this.filterForm.status == "Inactive"
      ) {
        this.filter.Status = this.filterForm.status;
      }
      this.loadPaging();
    },
    indexMethod(index) {
      return (this.classSubject.currentPage - 1) * this.classSubject.pageSize + index + 1;
    },
  },
};
</script>
<style lang='scss' scoped>

</style>
