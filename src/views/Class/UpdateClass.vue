<template>
  <div>
    <el-dialog
      title="Update Class"
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
          <el-input type="text" v-model="classObj.name" readonly></el-input>
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
          <el-button type="primary" @click="handleSubmit('classData')"
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
  name: "update-class",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
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
    }
  },

  data() {
    return {
      loading : false,
      isValidate: false,
      rules: {
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
    ...mapActions(["updateClassAction", "filterClassAction"]),
    ...mapMutations(["setClassObj"]),

    handleClose() {
      this.$emit("close");
    },

    handleSubmit(formName) {
      this.$refs[formName].validate( (valid) => {
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
            this.loading = true
            const res = await this.updateClassAction();
            if (res.status === 204) {
              this.$message({
                message: "Update successfully!!",
                type: "success",
              });
              this.handleClose();
              this.filterClassAction(this.filter);
              this.loading = false
            } else {
              this.$message({
                message: "Update fail!!",
                type: "error",
              });
              return false;
            }
          })

        }
      });
    },
  },
  watch: {
    visbleSync(val) {
      this.$emit("update:dialogVisible", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>