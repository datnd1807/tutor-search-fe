<template>
  <div>
    <base-header type="gradient-info" class="pb-5 pb-7 pt-4 pt-md-7" />
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <el-tabs
            type="border-card"
            v-model="activeName"
            @tab-click="handleClick"
            v-loading="loading"
          >
            <el-tab-pane label="Classes" name="class">
              <classes-table />
            </el-tab-pane>
            <el-tab-pane label="Subjects" name="subject">
              <subjects-table />
            </el-tab-pane>
            <el-tab-pane label="Subjects Class" name="subject-class">
              <subjects-class-table />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SubjectsTable from "../Subject/SubjectsTable.vue";
import SubjectsClassTable from "../Subject/SubjectClassTable.vue";
import ClassesTable from "./ClassesTable";
import { mapActions } from "vuex";
export default {
  name: "tables",
  components: {
    ClassesTable,
    SubjectsTable,
    SubjectsClassTable,
  },
  data() {
    return {
      activeName: "class",
      loading: true,
    };
  },
  mounted(){
    this.init()
  },
  methods: {
    ...mapActions([
      "getClassHasSubjectsAction",
      "filterClassAction",
      "filterSubjectAction",
    ]),
    async init() {
      await this.filterClassAction({});
      this.loading = false;
    },
    async handleClick(tab, event) {
      if (tab.name === "class") {
        this.loading = true;
        await this.filterClassAction({});
        this.loading = false;
      }
      if (tab.name === "subject") {
        this.loading = true;
        await this.filterSubjectAction({});
        this.loading = false;
      }
      if (tab.name === "subject-class") {
        this.loading = true;
        await this.getClassHasSubjectsAction();
        this.loading = false;
      }
    },
  },
};
</script>
<style></style>