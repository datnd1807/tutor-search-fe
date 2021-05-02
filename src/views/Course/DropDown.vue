<template>
  <el-select
    filterable
    v-model="valueDropDown"
    placeholder="Select subject"
    @change="chooseSubject(valueDropDown)"
    clearable
  >
    <el-option
      v-for="data in dataDropDown"
      :key="data.id"
      :label="data.name"
      :value="data.name"
    ></el-option>
  </el-select>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "drop-down",
  computed: {
    ...mapGetters(["getAllSubjects"]),
    dataDropDown() {
      return this.getAllSubjects;
    },
  },
  data() {
    return {
      valueDropDown: null,
    };
  },
  methods: {
    ...mapActions(["getAllSubjectsAction"]),
    async getSubject() {
      const data = await this.getAllSubjectsAction();
    },
    chooseSubject(value) {
      this.$emit("activeDropdown", value);
    },
  },
  mounted() {
    this.getSubject();
  },
};
</script>