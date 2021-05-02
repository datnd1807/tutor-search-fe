<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
    <el-dialog :visible.sync="dialogVisible" width="20%" top="20px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-money"></i>Create commission rate</span
      >
      <el-form
        label-width="120px"
        :inline="true"
        :rules="rules"
        class="demo-form-inline"
        label-position="left"
        :model="dataCommission"
        ref="dataCommission"
      >
        <el-form-item label="Name" prop="name" class="col-lg-10">
          <div class="Light_Shadow">
            <el-input v-model="dataCommission.name" maxlength="20"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Rate" prop="rate" class="col-lg-5">
          <div class="Light_Shadow">
            <el-input
              type="number"
              v-model="dataCommission.rate"
              placeholder="USD"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Description" prop="description" class="col-lg-10">
          <div class="Light_Shadow">
            <el-input
              type="textarea"
              v-model="dataCommission.description"
              maxlength="150"
            ></el-input>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createCommissions('dataCommission')"
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
  name: "dialog-commission",
  data() {
    var validaterate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Rate must be required"));
      } else if (value < 0) {
        callback(new Error("Rate must be greater than 0"));
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
      dataCommission: {
        description: "",
        name: "",
        rate: "",
        updatedDate: "",
        updatedBy: "",
        status: "",
        createdDate: "",
        createdBy: "",
      },
      rules: {
        rate: [{ validator: validaterate, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions(["createCommission"]),
    createCommissions(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("Do you want to create ?", "Warning", {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          })
            .then(() => {
              this.dialogVisible = false;
              this.dataCommission.updatedDate = moment(new Date()).format(
                "YYYY-MM-DDTHH:mm"
              );
              this.dataCommission.createdDate = moment(new Date()).format(
                "YYYY-MM-DDTHH:mm"
              );
              this.dataCommission.updatedBy = JSON.parse(
                localStorage.getItem("user")
              ).id;
              this.dataCommission.createdBy = JSON.parse(
                localStorage.getItem("user")
              ).id;
              this.dataCommission.status = "Active";
              this.dataCommission.rate = parseFloat(this.dataCommission.rate);
              this.createCommission(this.dataCommission).then((response) => {
                if (response == 204) {
                  this.dataCommission = {
                    description: "",
                    name: "",
                    rate: "",
                    updatedDate: "",
                    updatedBy: "",
                    status: "",
                    createdDate: "",
                    createdBy: "",
                  };
                  this.$message({
                    type: "success",
                    message: "Create completed",
                  });
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