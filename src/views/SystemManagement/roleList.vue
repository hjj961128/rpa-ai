<template>
  <div>
    <!-- 面包屑 -->
    <div style="margin-bottom: 20px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <div class="top-search">
      <el-form :model="form" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名称">
              <el-input
                width="'300"
                class="sinp"
                v-model="form.name"
                clearable
              />
              <el-button
                class="sbtn"
                type="primary"
                @click="getUserList(form.name)"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item style="text-align: right">
              <el-button type="primary">停用</el-button>
              <el-button type="primary">启用</el-button>
              <el-button type="primary">删除</el-button>
              <el-button type="primary" @click="addUser('0')"
                >增加用户</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div> -->
    <div class="table">
      <el-table ref="multipleTableRef" :data="tableData" style="width: 100%">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column type="index" label="序号" width="65">
          <template #default="scope">
            {{ scope.$index + (form.page_num - 1) * form.page_size + 1 }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="用户id" /> -->
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="code" label="角色标识" />
        <el-table-column prop="comment" label="备注" />

        <el-table-column prop="created_at" label="发起时间">
          <template #default="{ row }">
            <div>{{ new Date(row.created_at).toLocaleString() }}</div>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="permission" label="部门">
          <template #default="{ row }">
            {{ dp[row.permission] }}
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            {{ statusList[row.status] }}
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="id" label="操作" width="120">
          <template #default="scope">
            <el-button
              @click="addUser('1', scope.row)"
              key="primary"
              type="primary"
              link
            >
              编辑
            </el-button>
            <el-button
              @click="delUser(scope.row)"
              key="danger"
              type="danger"
              link
            >
              删除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        v-model:current-page="form.page_num"
        v-model:page-size="form.page_size"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 10px; float: right"
      />
    </div>
    <el-dialog v-model="dialogVisibleUser" :title="dialogTitle" width="500">
      <el-form :model="addUserForm" label-width="auto" style="max-width: 600px">
        <el-form-item label="部门">
          <el-select v-model="addUserForm.permission" placeholder="请选择部门">
            <el-option
              v-for="(item, Index) in departmentList"
              :key="Index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="addUserForm.name" />
        </el-form-item>

        <el-form-item label="角色">
          <el-select
            multiple
            collapse-tags
            v-model="addUserForm.roleList"
            placeholder="请选择角色"
          >
            <el-option
              v-for="(item, Index) in roleList"
              :key="Index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="addUserForm.password" />
        </el-form-item>
        <el-form-item label="再次确认密码">
          <el-input v-model="addUserForm.passwordAgain" />
        </el-form-item>
        <el-form-item label="是否开启">
          <el-switch v-model="addUserForm.status" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addUserForm.comment" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-if="isEditUser == '0'"
            @click="addUserApi()"
            >新增</el-button
          >
          <el-button type="primary" v-else @click="EditUserApi()"
            >更新</el-button
          >
          <el-button @click="dialogVisibleUser = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import request from "@/utils/request";
import { ElMessage, ElMessageBox } from "element-plus";
const form = reactive({
  name: "",
  page_num: 1,
  page_size: 10,
});
const addUserForm = ref({
  id: 0,
  name: "",
  permission: null,
  password: "",
  passwordAgain: "",
  status: true,
  addUserForm:[],
  comment: "",
});
// # 超级管理员
// SA = 0
// # 营销
// MKT = 1
// # 人资
// HR = 2
// # 党建
// CPC = 3
// # 财资
// TM = 4
// # 运维
// OP = 5
// # 调度自动化
// AS = 6
const dp = ref({
  1: "营销",
  2: "人资",
  3: "党建",
  4: "财资",
  5: "运维",
  6: "调度自动化",
});
const statusList = ref({
  0: "启用",
  1: "停用",
});
const tableData = ref([]);
const total = ref(0);
// 查询用户列表
const queryRoleList = (val) => {
  request({
    method: "GET",
    url: "/api/role",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      page_num: form.page_num,
      page_size: form.page_size,
    },
  })
    .then((res) => {
      tableData.value = res.data.data.list;
      total.value = res.data.data.total;
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
       message: err,
        type: "error",
      });
    });
};
const dialogVisibleUser = ref(false);
const dialogTitle = ref("新增用户");
const isEditUser = ref("0");
//新增/编辑用户弹窗
const addUser = (val, val2) => {
  dialogVisibleUser.value = true;
  isEditUser.value = val;
  if (val === "0") {
    //新增
    addUserForm.value = {};
    dialogTitle.value = "新增用户";
  } else if (val === "1") {
    //编辑
    dialogTitle.value = "编辑用户";
    addUserForm.value.name = val2.username;
    addUserForm.value.permission = val2.department.id;
    addUserForm.value.status = val2.status == 0 ? true : false;
    addUserForm.value.comment = val2.comment;
    addUserForm.value.id = val2.id;
    addUserForm.value.roleList = val2.role
  }
};
//查询角色/api/role
const roleList = ref([])
//查询部门/api/department
const departmentList = ref([]);
const queryDepartmentList = () => {
  request({
    method: "GET",
    url: "/api/department",
    params: {
      limit: false,
    },
  })
    .then((res) => {
      departmentList.value = res.data.data.list;
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
       message: err,
        type: "error",
      });
    });
};

//新增用户接口
const addUserApi = () => {
  request({
    method: "POST",
    url: "/api/user",
    data: {
      username: addUserForm.value.name,
      password: addUserForm.value.password,
      password_again: addUserForm.value.passwordAgain,
      permission: addUserForm.value.permission,
      status: addUserForm.value.status == true ? 0 : 1,
      comment: addUserForm.value.comment,
      department_id: addUserForm.value.permission * 1,
      role_ids: addUserForm.value.roleList
    },
  })
    .then((res) => {
      ElMessage({
        showClose: true,
        message: "登录成功",
        type: "success",
      });
      dialogVisibleUser.value = false;
      getUserList();
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
       message: err,
        type: "error",
      });
    });
};
//编辑用户接口
const EditUserApi = () => {
  request({
    method: "PUT",
    url: "/api/user",
    params: {
      id: addUserForm.value.id,
    },
    data: {
      username: addUserForm.value.name,
      password:
        addUserForm.value.password == "" ? null : addUserForm.value.password,
      password_again:
        addUserForm.value.passwordAgain == ""
          ? null
          : addUserForm.value.passwordAgain,
      permission: addUserForm.value.permission,
      status: addUserForm.value.status == true ? 0 : 1,
      comment: addUserForm.value.comment,
    },
  })
    .then((res) => {
      ElMessage({
        showClose: true,
        message: "更新成功",
        type: "success",
      });
      dialogVisibleUser.value = false;
      getUserList();
      addUserForm.value = {};
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
       message: err,
        type: "error",
      });
    });
};
// 删除用户
const delUser = (val) => {
  ElMessageBox.confirm("是否确认删除?", "提示", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      request({
        method: "DELETE",
        url: "/api/user",
        params: {
          id: val.id,
        },
      }).then((res) => {
        ElMessage({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        dialogVisibleUser.value = false;
        getUserList();
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
};
const handleSizeChange = (val) => {
  form.value.page_size = val;
  queryRoleList();
};
const handleCurrentChange = (val) => {
  form.value.page_num = val;
  queryRoleList();
};
onMounted(() => {
  queryRoleList();
});
</script>
<style lang="less" scoped>
.top-search {
  margin-top: 30px;
  width: 100%;
}

.sinp {
  display: inline-block;
  width: 200px;
}
.sbtn {
  display: inline-block;
}
.btns {
  // float: right;

}
</style>
