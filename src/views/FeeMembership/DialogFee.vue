<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
    <el-dialog :visible.sync="dialogVisible" width="20%" top="20px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-money"></i>Create fee</span
      >
      <el-form
        label-width="120px"
        :inline="true"
        :rules="rules"
        class="demo-form-inline"
        label-position="left"
        :model="dataFee"
        ref="dataFee"
      >
        <el-form-item label="Name" prop="name" class="col-lg-10">
          <div class="Light_Shadow">
            <el-input v-model="dataFee.name" maxlength="20"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Price" prop="price" class="col-lg-5">
          <div class="Light_Shadow">
            <el-input
              type="number"
              v-model="dataFee.price"
              placeholder="USD"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Description" prop="description" class="col-lg-10">
          <div class="Light_Shadow">
            <el-input
              type="textarea"
              v-model="dataFee.description"
              maxlength="150"
            ></el-input>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createFees('dataFee')"
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
  name: "dialog-fee",
  data() {
    var validatePrice = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Price must be required"));
      } else if (value < 0) {
        callback(new Error("Price must be greater than 0"));
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
      dataFee: {
        description: "",
        name: "",
        price: "",
        updatedDate: "",
        updatedBy: "",
        status: "",
        createdDate: "",
        createdBy: "",
      },
      rules: {
        price: [{ validator: validatePrice, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions(["createFee"]),
    createFees(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("Do you want to create ?", "Warning", {
            confirmButtonText: "OK",
            cancelButtonText: "Cancel",
            type: "warning",
          })
            .then(() => {
              this.dialogVisible = false;
              this.dataFee.updatedDate = moment(new Date()).format(
                "YYYY-MM-DDTHH:mm"
              );
              this.dataFee.createdDate = moment(new Date()).format(
                "YYYY-MM-DDTHH:mm"
              );
              this.dataFee.updatedBy = JSON.parse(
                localStorage.getItem("user")
              ).id;
              this.dataFee.createdBy = JSON.parse(
                localStorage.getItem("user")
              ).id;
              this.dataFee.status = "Active";
              this.dataFee.price = parseFloat(this.dataFee.price);
              this.createFee(this.dataFee).then((response) => {
                if (response == 204) {
                  this.dataFee = {
                    description: "",
                    name: "",
                    price: "",
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