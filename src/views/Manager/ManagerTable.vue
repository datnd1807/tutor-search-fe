<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <el-form :inline="true" class="demo-form-inline">
        <div class="boldText">
          <div class="row">
            <el-form-item label="Manager">
              <el-input
                class="select-role"
                v-model="managerName"
                placeholder="Type manager name"
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
                @click="filterManager"                
                >Search</el-button
              >
            </el-form-item>
            <el-form-item class="col d-flex justify-content-end">
              <create-manager></create-manager>
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
        <el-table-column prop="fullname" label="Manager"> </el-table-column>
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
        <el-table-column label="Actives">
          <template slot-scope="scope">
            <dialog-manager
              :data="pagedTableData[indexData(scope.row)]"
            ></dialog-manager>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pagingManager.pageSize"
          :total="pagingManager.totalCount"
          @current-change="setPage"
          :current-page="pagingManager.currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";
import DialogManager from "./DialogManager";
import CreateManager from "./CreateManager";
import moment from "moment";

export default {
  components: { DialogManager, CreateManager },
  name: "manager-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["managers"]),
    ...mapGetters(["getManagers", "getPagingManager"]),
    pagedTableData() {
      return this.getManagers;
    },
    pagingManager() {
      return this.getPagingManager;
    },
  },
  watch: {
    pagedTableData() {
      this.loading = false;
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: true,
      managerName: undefined,
      email: undefined,
      filter: {},
      indexTable: 0,
    };
  },
  methods: {
    ...mapActions(["getAllManagers", "getAllSubjectsAction"]),
    async init() {
      const data1 = await this.getAllManagers("");
      const date2 = await this.getAllSubjectsAction();
    },
    async setPage(val) {
      this.loading = true;
      this.filter.pageNumber = val;
      await this.getAllManagers(this.filter);
      this.pagingManager.currentPage = val;
      this.loading = false;
    },
    indexData(conditionFn) {
      return this.pagedTableData.indexOf(conditionFn);
    },
    indexMethod(number) {
      if (this.pagingManager.currentPage > 1) {
        this.indexTable = this.pagingManager.currentPage * 10 - 10;
        return this.indexTable + number + 1;
      } else {
        return number + 1;
      }
    },
    async filterManager() {
      this.loading = true;
      if (this.managerName == "") {
        this.managerName = undefined;
      }
      if (this.email == "") {
        this.email = undefined;
      }
      this.filter = {
        email: this.email,
        managerName: this.managerName,
        pageNumber: 1,
      };
      const response = await this.getAllManagers(this.filter);
      if (response.status == 200) {
        this.pagingManager.currentPage = 0;
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
  async mounted() {
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
