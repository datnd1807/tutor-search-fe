<template>
  <div>
    <el-dialog
      title="Create New Class"
      :visible="dialogVisible"
      v-if="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="50%"
      top="5vh"
      :close-on-click-modal="false"
      @close="handleClose"
      :loading="loading"
    >
      <el-form
        :model="classObj"
        ref="classData"
        :rules="rules"
        label-width="120px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Class Name" prop="name">
          <el-input type="text" v-model="classObj.name"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            type="textarea"
            v-model="classObj.description"
            :autosize="{ minRows: 3, maxRows: 5 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="insertClassBtn('classData')"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "create-class",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
    },
    filter: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters(["getClassObj"]),
    classObj: {
      get() {
        return this.getClassObj;
      },
      set(value) {
        this.setClassObj(value);
      },
    },
  },

  data() {
    var checkName = (rule, value, callback) => {
      let val = value.trim();
      if (!val) {
        return callback(new Error("Please input class name"));
      } else if (val.length > 50) {
        callback(new Error("Class name max length is 50"));
      } else
        setTimeout(async () => {
          if (val) {
            var res = await this.checkClassNameExistAction(val);
            if (res.data) {
              callback(new Error("Class name already exists"));
            } else {
              callback();
            }
          }
        }, 1000);
    };
    return {
      loading: false,
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        description: [
          {
            required: true,
            message: "Please input class description",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions([
      "insertClassAction",
      "filterClassAction",
      "checkClassNameExistAction",
    ]),
    ...mapMutations(["setClassObj"]),

    handleClose() {
      this.$emit("close");
      this.resetForm("classData");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs[formName].clearValidate();
    },

    insertClassBtn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(
            "This will permanently update the subject information. Continue?",
            "Warning",
            {
              confirmButtonText: "OK",
              cancelButtonText: "Cancel",
              type: "warning",
            }
          ).then(async () => {
            this.loading = true;
            const res = await this.insertClassAction();
            if (res.status === 204) {
              this.$message({
                message: "Insert successfully!!",
                type: "success",
              });
              this.handleClose();
              this.filterClassAction(this.filter);
            } else {
              this.$message({
                message: "Insert fail!!",
                type: "error",
              });
            }
          });
        }
        this.loading = false;
      });
    },
  },
  watch: {
    visibleSync(val) {
      this.$emit("update:dialogVisible", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>