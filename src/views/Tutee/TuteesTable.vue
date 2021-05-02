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
            <el-form-item label="Search tutee">
              <el-input
                class="select-role"
                v-model="tuteeName"
                placeholder="Type tutee name"
                prefix-icon="el-icon-search"
              />
            </el-form-item>
            <el-form-item class="pl-2" label="Email">
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
                @click="filterTutee"
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
        <el-table-column prop="fullname" label="Tutee"> </el-table-column>
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
            <div v-else>
              <el-tag type="danger">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <dialog-tutees
              :data="pagedTableData[indexData(scope.row)]"
            ></dialog-tutees>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagingTutee.pageSize"
          :total="pagingTutee.totalCount"
          @current-change="setPage"
          :current-page="pagingTutee.currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import _ from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";
import DialogTutees from "./DialogTutees.vue";
export default {
  components: { DialogTutees },
  name: "tutees-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["tutees"]),
    ...mapGetters(["getTutees", "getPagingTutee"]),
    pagedTableData() {
      return this.getTutees;
    },
    pagingTutee() {
      return this.getPagingTutee;
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
      tuteeName: undefined,
      email: undefined,
      filter: {},
      indexTable: 0,
    };
  },
  methods: {
    ...mapActions(["getAllTutees"]),
    async init() {
      const data1 = await this.getAllTutees(this.filter);
    },
    async setPage(val) {
      this.loading = true;
      this.filter.pageNumber = val;
      await this.getAllTutees(this.filter);
      this.pagingTutee.currentPage = val;
      this.loading = false;
    },
    indexData(conditionFn) {
      return this.pagedTableData.indexOf(conditionFn);
    },
    indexMethod(number) {
      if (this.pagingTutee.currentPage > 1) {
        this.indexTable = this.pagingTutee.currentPage * 10 - 10;
        return this.indexTable + number + 1;
      } else {
        return number + 1;
      }
    },
    async filterTutee() {
      this.loading = true;
      this.filter.pageNumber = undefined;
      if (this.tuteeName == "") {
        this.tuteeName = undefined;
      }
      if (this.email == "") {
        this.email = undefined;
      }
      this.filter = {
        email: this.email,
        tuteeName: this.tuteeName,
        pageNumber: 1,
      };
      const response = await this.getAllTutees(this.filter);
      if (response.status == 200) {
        this.pagingTutee.currentPage = 0;
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
