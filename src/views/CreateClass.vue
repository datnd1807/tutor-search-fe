<template>
  <div>
    <el-dialog
      title="Create New Class"
      :visible="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="50%"
      top="5vh"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <form @submit.prevent>
        <h6 class="heading text-muted mb-2">Class information</h6>

        <base-input
          alternative=""
          label="Class Name"
          placeholder="Class name"
          input-classes="form-control-alternative"
          v-model="form.name"
          type="text"
          required
        />

        <base-input alternative="" label="Description">
          <textarea
            rows="4"
            class="form-control form-control-alternative"
            placeholder="A few words about class ..."
            v-model="form.description"
          ></textarea>
        </base-input>
      </form>

      <span slot="footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="insertClassBtn">Submit</el-button>
      </span>
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
      default: false,
    },
  },
  computed: {},

  data() {
    return {
      isValidate: false,
      visbleSync: this.dialogVisible,
      form: {
        name: "",
        status: "Active",
        description: "",

      },
     
    };
  },
  methods: {
    ...mapActions(["insertClass"]),
    ...mapMutations([]),
    handleClose() {
      this.$emit("close");
    },

    checForm() {
      if (!this.form.firstname) {
        this.$message({
          message: "this is error",
        });
      }
    },
    insertClassBtn(){
        this.insertClass(this.form)
    }
  },
  watch: {
    visbleSync(val) {
      this.$emit("update:dialogVisible", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.ava-img {
  height: 20vh;
  width: 10vw;
}
</style>