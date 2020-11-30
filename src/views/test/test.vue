<template>
<div class="root">
    <div class="search">
      <el-input placeholder="请输入科目名称"  clearable class="input-with-select">
        <el-button @click="goSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  <div class="control">
    <el-button  type="primary" @click="dialogFormVisible = true">新增科目</el-button>
  </div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="主键" width="180"></el-table-column>
    <el-table-column prop="name" label="科目名称" width="180"></el-table-column>
    <el-table-column prop="seq" label="排序"></el-table-column>
    <el-table-column prop="id" label="操作">
            <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
<el-dialog title="科目维护" :visible.sync="dialogFormVisible">
  <el-form :model="form"> 
    <el-form-item label="科目名称" :label-width=120>
      <el-input  autocomplete="off" v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="排序" :label-width=120>
      <el-input  autocomplete="off" v-model="form.seq"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="savesubject">确 定</el-button>
  </div>
</el-dialog>
</div>

</template>

<script>
import { getTableData } from "@/api/test.js";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form:{
          id:0,
          name:"",
          seq:0
      }
    };
  },
  mounted: function() {
    // 网络请求统一处理
    getTableData().then(res => {
      console.log("api tableData :", res);
      this.tableData = res.data;
    },err=>{
      console.log("err :", err);
    });
    // 网络请求直接写在文件中
    this.req({
      url: "subject",
      data: {},
      method: "GET"
    }).then(
      res => {
        console.log("tableData :", res);
        this.tableData = res.data;
      },
      err => {
        console.log("err :", err);
      }
    );
  },
  methods: {
    savesubject:function(){
      let _this = this;
      this.req({
        url:"subject",
        data:JSON.stringify(this.form),
        method:"post"
      }).then(res=>{
       // console.log("33333333333333333333333333333333333");
          _this.dialogFormVisible = false
      })
    },
    handleClick(row) {
      this.form=row;
      this.dialogFormVisible = true;
        console.log(row);
      }
  }
};
</script>

<style>
.control{
  float: right;
}
.search{
  float: left;
}
</style>