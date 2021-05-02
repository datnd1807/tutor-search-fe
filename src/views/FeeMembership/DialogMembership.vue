<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
    <el-dialog :visible.sync="dialogVisible" width="22%" top="20px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-star-on"></i>Create membership</span
      >
      <el-form
        label-width="120px"
        :inline="true"
        :rules="rules"
        class="demo-form-inline"
        label-position="left"
        :model="dataMembership"
        ref="dataMembership"
      >
        <el-form-item label="Name" prop="name" class="col-lg-10">
          <div class="Light_Shadow">
            <el-input v-model="dataMembership.name" maxlength="20"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Point Rate" prop="pointRate" class="col-lg-5">
          <div class="Light_Shadow">
            <el-input
              type="number"
              v-model="dataMembership.pointRate"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Point Amount" prop="pointAmount" class="col-lg-5">
          <div class="Light_Shadow">
            <el-input
              type="number"
              v-model="dataMembership.pointAmount"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Description" prop="description" class="col-lg-10">
          <div class="Light_Shadow">
            <el-input
              type="textarea"
              v-model="dataMembership.description"
              maxlength="100"
            ></el-input>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createMemberships('dataMembership')"
          >Create</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "dialog-membership",
  data() {
    var validatePointRate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Point rate must be required"));
      } else if (value < 0) {
        callback(new Error("Point rate must be greater than 0"));
      } else {
        callback();
      }
    };
    var validatePointAmount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Point amount must be required"));
      } else if (value < 0) {
        callback(new Error("Point amount must be greater than 0"));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Name must be required"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      dataMembership: {
        description: "",
        name: "",
        pointRate: "",
        pointAmount: "",
        updatedDate: "",
        updatedBy: "",
        status: "",
        createdBy: "",
        createdDate: "",
      },
      rules: {
        pointRate: [{ validator: validatePointRate, trigger: "blur" }],
        pointAmount: [{ validator: validatePointAmount, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions(["createMembership"]),
    createMemberships(dataMembership) {
      this.$refs[dataMembership].validate((valid) => {
        if (valid) {
          this.$confirm("Do you want to create ?", "Warning", {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          })
            .then(() => {
              this.dialogVisible = false;
              this.dataMembership.updatedDate = moment(new Date()).format(
                "YYYY-MM-DDTHH:mm"
              );
              this.dataMembership.updatedBy = JSON.parse(
                localStorage.getItem("user")
              ).id;
              this.dataMembership.createdBy = JSON.parse(
                localStorage.getItem("user")
              ).id;
              this.dataMembership.status = "Active";
              this.dataMembership.pointRate = parseFloat(
                this.dataMembership.pointRate
              );
              this.dataMembership.pointAmount = parseFloat(
                this.dataMembership.pointAmount
              );
              this.dataMembership.createdDate = moment(new Date()).format(
                "YYYY-MM-DDTHH:mm"
              );
              this.createMembership(this.dataMembership).then((response) => {
                if (response == 204) {
                  this.$message({
                    type: "success",
                    message: "Create completed",
                  });
                  this.dataMembership = {
                    description: "",
                    name: "",
                    pointRate: "",
                    pointAmount: "",
                    updatedDate: "",
                    updatedBy: "",
                    status: "",
                    createdBy: "",
                    createdDate: "",
                  };
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "Create canceled",
              });
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang=scss>
.fontSize {
  font-size: 20px;
}
.labelColor {
  font-weight: bold;
  margin: 8px 8px;
}
.text-search {
  margin-top: 8px;
  font-size: 14px;
  color: #606266;
}
.Light_Shadow {
  box-shadow: 0 0.5px 3px 0 rgba(26, 24, 24, 0.267);
}
</style>