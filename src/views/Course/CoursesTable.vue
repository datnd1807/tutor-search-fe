<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row">
        <div class="col align-items-center">
          <div class="row">
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="row align-items-right"></div>
      <el-form :inline="true" class="demo-form-inline">
        <div class="boldText">
          <div class="row">
            <el-form-item label="Subject">
              <drop-down v-on:activeDropdown="searchSubject"></drop-down>
            </el-form-item>
            <el-form-item class="pl-3" label="Date">
              <date-time-picker v-on:activeDatePicker="format_date">
              </date-time-picker>
            </el-form-item>
            <el-form-item class="pl-3" label="Status">
              <el-select
                v-model="valueDropDown"
                placeholder="Select status"
                @change="getByStatus(valueDropDown)"
                clearable
              >
                <el-option
                  v-for="data in status"
                  :key="data.name"
                  :label="data.name"
                  :value="data.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="Course name">
              <el-input
                class="select-role"
                v-model="courseName"
                placeholder="Type course name"
                prefix-icon="el-icon-search"
              />
            </el-form-item>
            <el-form-item class="pl-3" label="Tutor name">
              <el-input
                class="select-role"
                v-model="tutorName"
                placeholder="Type tutor name"
                prefix-icon="el-icon-search"
              />
            </el-form-item>
            <el-form-item class="pl-3">
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="filterCourses"
                >Search</el-button
              >
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div class="table-responsive">
      <el-table :data="pagedTableData" border stripe v-loading="loading">
        <el-table-column
          label="No."
          width="50"
          type="index"
          :index="indexMethod"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="tutorName" label="Tutor"> </el-table-column>
        <el-table-column prop="name" label="Course name"> </el-table-column>
        <el-table-column
          prop="createdDate"
          label="Date created"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column prop="subjectName" label="Subject"></el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 'Active'">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else-if="scope.row.status == 'Pending'">
              <el-tag type="warning">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else-if="scope.row.status == 'Unpaid'">
              <el-tag type="info">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else-if="scope.row.status == 'Inactive'">
              <el-tag type="danger">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else-if="scope.row.status == 'Denied'">
              <el-tag color="#FEE9E0" type="warning" effect="light">{{
                scope.row.status
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag color="#E0ECF8">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <dialog-data
              :data="pagedTableData[indexData(scope.row)]"
            ></dialog-data>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagingCourse.pageSize"
          :total="pagingCourse.totalCount"
          @current-change="setPage"
          :current-page="getPagingCourse.currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import DropDown from "./DropDown.vue";
import DialogData from "./DialogData.vue";
import DateTimePicker from "./DateTimePicker.vue";
import moment from "moment";
import _ from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: { DropDown, DialogData, DateTimePicker },
  name: "courses-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["courses"]),
    ...mapGetters(["getCourses", "getPagingCourse", "getAccountManager"]),
    pagedTableData() {
      return this.getCourses;
    },
    pagingCourse() {
      return this.getPagingCourse;
    },
  },
  watch: {
    pagedTableData() {
      this.loading = false;
    },
  },
  data() {
    return {
      currentPage: 1,
      firstDate: "",
      secondDate: "",
      dialogVisible: false,
      loading: true,
      courseStatus: "",
      status: [
        { name: "Pending" },
        { name: "Active" },
        { name: "Inactive" },
        { name: "Unpaid" },
        { name: "Ongoing" },
        { name: "Denied" },
      ],
      valueDropDown: null,

      courseName: undefined,
      statusCourse: undefined,
      subjectName: undefined,
      fromDate: undefined,
      toDate: undefined,
      tutorName: undefined,
      pageNumber: undefined,
      managerId: undefined,
      filter: {},
      indexTable: 1,
      buttonSearch: false,
    };
  },
  methods: {
    ...mapActions(["getAllCourses", "getAllCoursesByAdmin"]),
    async init() {
      if (this.getAccountManager.roleId == 2) {
        this.managerId = this.getAccountManager.id;
        var filter = {
          managerId: this.managerId,
        };
        this.getAllCoursesByAdmin(filter);
      } else {
        const data = await this.getAllCoursesByAdmin("");
      }
    },
    async setPage(val) {
      this.loading = true;
      this.filter.pageNumber = val;
      this.filter.managerId = this.managerId;
      await this.getAllCoursesByAdmin(this.filter);
      this.getPagingCourse.currentPage = val;
      this.loading = false;
    },
    format_date(value) {
      if (value != null && value.length != 0) {
        this.fromDate = moment(new Date(value[0])).format("YYYY-MM-DD");
        this.toDate = moment(new Date(value[1])).format("YYYY-MM-DD");
      } else {
        this.fromDate = undefined;
        this.toDate = undefined;
      }
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD [at] hh:mm:ss");
    },
    indexData(conditionFn) {
      return this.pagedTableData.indexOf(conditionFn);
    },
    indexMethod(number) {
      if (this.getPagingCourse.currentPage > 1) {
        this.indexTable = this.getPagingCourse.currentPage * 10 - 10;
        return this.indexTable + number + 1;
      } else {
        return number + 1;
      }
    },
    searchSubject(value) {
      if (value == "") {
        this.subjectName = undefined;
      } else {
        this.subjectName = value;
      }
    },
    getByStatus(value) {
      if (value == "") {
        this.statusCourse = undefined;
      } else {
        this.statusCourse = value;
      }
    },
    async filterCourses() {
      this.loading = true;
      this.pageNumber = undefined;
      if (this.tutorName == "") {
        this.tutorName = undefined;
      }
      if (this.courseName == "") {
        this.courseName = undefined;
      }
      this.filter = {
        courseName: this.courseName,
        status: this.statusCourse,
        subjectName: this.subjectName,
        fromDate: this.fromDate,
        toDate: this.toDate,
        tutorName: this.tutorName,
        pageNumber: this.pageNumber,
        managerId: this.managerId,
      };
      const response = await this.getAllCoursesByAdmin(this.filter);
      if (response.status == 200) {
        this.getPagingCourse.currentPage = 0;
      }
      this.loading = false;
    },
  },
  async created() {
    await this.init();
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
.buttonDesign {
  margin: 5px 5px;
}
.text-search {
  margin-top: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #606266;
}
.select-role {
  width: 250px;
  font-weight: bold;
}
.numbered {
  margin: 5px 5px;
  font-size: 15px;
}
</style>
