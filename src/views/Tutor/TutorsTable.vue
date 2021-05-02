<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <el-form :inline="true" class="demo-form-inline">
        <div class="row">
          <div class="col-xl-8">
            <el-form-item label="Search tutor" class="text-search">
              <el-input
                class="select-role"
                v-model="tutorName"
                placeholder="Type tutor name"
                prefix-icon="el-icon-search"
              />
            </el-form-item>
            <el-form-item class="pl-2 text-search" label="Email">
              <el-input
                class="select-role"
                v-model="email"
                placeholder="Type email"
                prefix-icon="el-icon-search"
              />
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                @click="filterTutor"
                >Search</el-button
              >
            </el-form-item>
          </div>
          <div class="col-xl-4">
            <div class="col d-flex justify-content-end">
              <el-form-item>
                <dialog-tutor-pending></dialog-tutor-pending>
              </el-form-item>
              <el-form-item>
                <dialog-tutor-updating></dialog-tutor-updating>
              </el-form-item>
            </div>
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
        <el-table-column prop="fullname" label="Tutor"> </el-table-column>
        <el-table-column
          prop="createdDate"
          label="Date created"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 'Active'">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else-if="scope.row.status == 'Denied'">
              <el-tag color="#FEE9E0" type="warning" effect="light">{{
                scope.row.status
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag type="danger">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <dialog-tutors
              :data="pagedTableData[indexData(scope.row)]"
            ></dialog-tutors>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="getPagingTutor.pageSize"
          :total="getPagingTutor.totalCount"
          @current-change="setPage"
          :current-page="getPagingTutor.currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import DialogTutors from "./DialogTutors.vue";
import moment from "moment";
import _ from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";
import DialogTutorPending from "./DialogTutorPending";
import DialogTutorUpdating from "./DialogTutorUpdating";
export default {
  components: { DialogTutors, DialogTutorPending, DialogTutorUpdating },
  name: "tutors-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["tutors", "tutorsPending"]),
    ...mapGetters([
      "getTutors",
      "getTutorsPending",
      "getPagingTutor",
      "getAccountManager",
    ]),
    pagedTableData() {
      return this.getTutors;
    },
    pagingTutor() {
      return this.getPagingTutor;
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
      dialogVisible: false,
      loading: true,
      tutorName: undefined,
      email: undefined,
      managerId: undefined,
      filter: {},
      indexTable: 0,
    };
  },
  methods: {
    ...mapActions([
      "getTutorPending",
      "getAllTutorsByAdmin",
      "getAllTutorsUpdating",
    ]),
    async init() {
      if (this.getAccountManager.roleId == 2) {
        this.managerId = this.getAccountManager.id;
        var filter = {
          managerId: this.managerId,
        };
        await this.getAllTutorsByAdmin(filter);
      } else {
        await this.getAllTutorsByAdmin("");
      }
      this.getTutorPending();
      this.getAllTutorsUpdating();
    },
    async setPage(val) {
      this.loading = true;
      this.filter.pageNumber = val;
      this.filter.managerId = this.managerId;
      await this.getAllTutorsByAdmin(this.filter);
      this.getPagingTutor.currentPage = val;
      this.loading = false;
    },
    indexData(conditionFn) {
      return this.pagedTableData.indexOf(conditionFn);
    },
    indexMethod(number) {
      if (this.getPagingTutor.currentPage > 1) {
        this.indexTable = this.getPagingTutor.currentPage * 10 - 10;
        return this.indexTable + number + 1;
      } else {
        return number + 1;
      }
    },
    async filterTutor() {
      this.loading = true;
      this.filter.pageNumber = undefined;
      if (this.tutorName == "") {
        this.tutorName = undefined;
      }
      if (this.email == "") {
        this.email = undefined;
      }
      this.filter = {
        email: this.email,
        tutorName: this.tutorName,
        pageNumber: 1,
        managerId: this.managerId,
      };
      const response = await this.getAllTutorsByAdmin(this.filter);
      if (response.status == 200) {
        this.getPagingTutor.currentPage = 0;
      }
      this.loading = false;
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD [at] hh:mm:ss");
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
.buttonDesign {
  margin: 5px 5px;
}
.text-search {
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
