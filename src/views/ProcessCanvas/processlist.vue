<template>
  <div class="main-page">
    <!-- 面包屑 -->
    <div >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-link type="primary" @click="gohome()">首页</el-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-link type="primary" @click="goBack()"
            >上一页</el-link
          ></el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="top-search">
      <el-form :model="searchForm" label-width="auto">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="流程名称">
              <el-input v-model="searchForm.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="searchForm.dateValues"
                type="daterange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item style="width: 100%; text-align: right">
              <el-button @click="getProcessList('1')" type="primary"
                >查询
              </el-button>
              <el-button type="primary" @click="clearForm">重置</el-button>
              <el-button type="primary" @click="choiceSource('0')"
                >增加流程
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table">
      <el-table
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
      >
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column type="index" label="序号" width="65" align="center">
          <template #default="scope">
            {{
              scope.$index +
              (searchForm.page_num - 1) * searchForm.page_size +
              1
            }}
          </template>
        </el-table-column>
        <!-- <el-table-column width="100" prop="id" label="流程号" /> -->
        <el-table-column prop="name" label="流程名称" align="center" />
        <el-table-column prop="online" label="状态" align="center">
          <template #default="{ row }">
            <div>
              <svg-icon :name="row.online == true ? 'blue' : 'red'"></svg-icon>
              {{ row.online == true ? "上线" : "下线" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="user.username" label="创建人" align="center" />

        <el-table-column prop="source" label="流程来源" align="center">
          <template #default="{ row }">
            <div>{{ row.source == 0 ? "新建" : "导入" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="发起时间" align="center">
          <template #default="{ row }">
            <div>{{ new Date(row.created_at).toLocaleString() }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320" align="center">
          <template #default="{ row }">
            <el-button
              @click="edit(row)"
              key="primary"
              type="primary"
              link
              :disabled="row.new_process_file_source === 1"
            >
              编辑画布
            </el-button>
            <el-button
              key="success"
              type="success"
              link
              v-if="row.online == false"
              @click="onlineDialog(row, '0')"
              :disabled="!isOnline(row)"
            >
              上线
            </el-button>
            <el-button
              key="info"
              type="info"
              link
              v-else
              :disabled="!isOnline(row)"
              @click="prossDown(row)"
            >
              下线
            </el-button>
            <el-button
              :disabled="row.online == true ? true : false"
              key="danger"
              type="danger"
              @click="delProcess(row)"
              link
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="searchForm.page_num"
        v-model:page-size="searchForm.page_size"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 10px; float: right"
      />
    </div>

    <!-- 选择是新建还是第三方 -->
    <el-dialog
      v-model="choiceSourceShow"
      :title="choiceSourceTitle"
      width="800"
    >
      <div class="onebox">
        <div class="left_box" @click="isNew(0)">
          <div class="boxboder">
            <img src="../../assets/images/new.png" alt="" />
            <div class="text">创建新流程</div>
          </div>
        </div>
        <div class="right_box" @click="isNew(1)">
          <div class="boxboder">
            <img src="../../assets/images/import.png" alt="" />
            <div class="text">第三方流程接入</div>
          </div>
        </div>
      </div>
      <el-dialog
        v-model="innerVisible"
        width="500"
        :title="innerTitle"
        append-to-body
      >
        <el-form
          :model="processForm"
          label-width="auto"
          style="max-width: 600px"
        >
          <el-form-item label="部门">
            <el-select
              v-model="processForm.depart"
              placeholder="请选择部门"
              :disabled="!isSA"
            >
              <el-option
                v-for="(item, Index) in departmentList"
                :key="Index"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="流程名称">
            <el-input v-model="processForm.name" />
          </el-form-item>
          <!-- <el-form-item label="流程版本号">
            <el-input v-model="processForm.version" />
          </el-form-item> -->
          <el-form-item label="流程文件来源">
            <el-select
              v-model="processForm.new_process_file_source"
              placeholder="请选择流程文件来源"
            >
              <el-option label="流程画布" value="0" />
              <el-option label="手动上传" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item
            label="文件上传"
            v-if="processForm.new_process_file_source === '1'"
          >
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              :limit="1"
              :auto-upload="false"
              action="#"
              accept=".zip"
              :on-remove="handleRemove"
            >
              <el-button type="primary">上传</el-button>
              <template #tip>
                <div class="el-upload__tip">只能上传zip格式的压缩包</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              v-if="isEditprocess == '0'"
              @click="addProcessApi()"
              >新增
            </el-button>
            <el-button type="primary" v-else @click="addProcessApi()"
              >接入
            </el-button>
            <el-button @click="innerVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
    <!-- 上线 -->
    <el-dialog
      v-model="onLineVisible"
      width="500"
      title="流程上线"
      append-to-body
    >
      <el-form :model="onlinesForm" label-width="auto" style="max-width: 600px">
        <el-form-item label="流程名称">
          <el-input v-model="onlinesForm.name" disabled />
        </el-form-item>
        <el-form-item label="流程简介">
          <el-input
            type="textarea"
            v-model="onlinesForm.process_introduction"
          />
        </el-form-item>
        <el-form-item label="涉及业务系统">
          <el-input v-model="onlinesForm.business_system" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickOnline()">上线</el-button>
          <el-button @click="onLineVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import request from "@/utils/request";
// import router from "../../router/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const fileList = ref([]);

const searchForm = ref({
  dateValues: [],
  name: null,
  page_num: 1,
  page_size: 10,
});
const tableData = ref([]);
const total = ref(0);
// 查询流程列表
const paramsData = ref({});
const getProcessList = (val) => {
  if (val === "1") {
    paramsData.value.page_num = searchForm.value.page_num;
    paramsData.value.page_size = searchForm.value.page_size;
    paramsData.value.name = searchForm.value.name;
    paramsData.value.start_time =
      searchForm.value.dateValues.length > 0
        ? searchForm.value.dateValues[0]
        : null;
    paramsData.value.end_time =
      searchForm.value.dateValues.length > 0
        ? searchForm.value.dateValues[1]
        : null;
  } else {
    paramsData.value.page_num = searchForm.value.page_num;
    paramsData.value.page_size = searchForm.value.page_size;
  }

  // 如果是admin即可获取所有部门 否则只获取自己的部门
  paramsData.value.department_id = isSA.value
    ? null
    : userInfo.value.department_id;

  request({
    method: "GET",
    url: "/api/process",
    params: paramsData.value,
  })
    .then((res) => {
      tableData.value = res.data.data.list;
      total.value = res.data.data.total;
    })
    .catch((err) => {
      console.log(err);
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
//重置
const clearForm = () => {
  searchForm.value.name = null;
  searchForm.value.dateValues = [];
  getProcessList("1");
};
//上线/下线⬇️
const onlinesForm = ref({});
const onLineVisible = ref(false);
const onlineThisProcess = ref(null);
const onlineDialog = (val, val2) => {
  if (val.source === 0) {
    //  新建的
    if (!val.flow_version_id) {
      let msg = "";
      if (val.new_process_file_source === 0) {
        msg = "请先编辑流程画布，发布后，方可上线";
      } else {
        msg = "请先上传流程文件，方可上线";
      }

      ElMessage({
        type: "error",
        message: msg,
      });
      return;
    }
  } else {
    if (!val.file_url) {
      ElMessage({
        type: "error",
        message: "请先上传流程文件",
      });
    }
  }

  // // 如果流程是新建
  // if(val.source === 0){
  //   // 流程画布
  //   if(!val.flow_version_id){
  //     let msg =  "请先编辑流程画布，发布后，方可上线"
  //   }
  //
  //   if(val.new_process_file_source === 0){
  //      if (!val.flow_version_id) {
  //     ElMessage({
  //       type: "error",
  //       message: "请先编辑流程画布，发布后，方可上线",
  //     });
  //      return
  //      }
  //
  //   }else{
  //      if (!val.flow_version_id) {
  //     ElMessage({
  //       type: "error",
  //       message: "请先上传流程文件，发布后，方可上线",
  //     });
  //     return
  //   }
  // }
  // }

  onlineThisProcess.value = val;
  onlinesForm.value.name = val.name;
  onlinesForm.value.process_introduction = val.process_introduction;
  onlinesForm.value.business_system = val.business_system;
  onLineVisible.value = true;
};
//下线
const prossDown = (val) => {
  ElMessageBox.confirm("确认下线此流程吗?", "提示", {
    confirmButtonText: "下线",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      request({
        method: "POST",
        url: "/api/process/online",
        data: {
          id: val.id,
          online: false,
        },
      })
        .then((res) => {
          ElMessage({
            type: "success",
            message: "流程下线成功",
          });
          getProcessList();
        })
        .catch((err) => {
          ElMessage({
            showClose: true,
            message: err,
            type: "error",
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消下线",
      });
    });
};
//上线
const clickOnline = () => {
  request({
    method: "POST",
    url: "/api/process/online",
    data: {
      id: onlineThisProcess.value.id,
      online: true,
      process_introduction: onlinesForm.value.process_introduction,
      business_system: onlinesForm.value.business_system,
    },
  })
    .then((res) => {
      onLineVisible.value = false;
      getProcessList();
      ElMessage({
        showClose: true,
        message: "上线成功",
        type: "success",
      });
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
//上线/下线⬆️
//删除流程
const delProcess = (val) => {
  ElMessageBox.confirm("确认删除此流程吗?", "提示", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      request({
        method: "DELETE",
        url: "/api/process",
        params: {
          id: val.id,
        },
      })
        .then((res) => {
          ElMessage({
            type: "success",
            message: "流程删除成功",
          });
          getProcessList();
        })
        .catch((err) => {
          ElMessage({
            showClose: true,
            message: err,
            type: "error",
          });
        });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消下线",
      });
    });
};
const edit = (val) => {
  request({
    method: "GET",
    url: "/api/auth/mcenter-token",
  })
    .then((res) => {
      sessionStorage.setItem("centerMtoken", res.data.data.token);
      router.push({
        name: "processCanvas",
        query: { id: val.cloud_flow_id, processId: val.id },
      });
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
const choiceSourceShow = ref(false);
const choiceSourceTitle = ref("新增流程");
//新增流程第一个弹窗
const choiceSource = (val) => {
  // processForm.value.depart = ref(departmentList.value[0].id)
  processForm.value.name = "";
  processForm.value.new_process_file_source = "0";
  fileList.value = [];
  choiceSourceShow.value = true;

  if (val === 0) {
    choiceSourceTitle.value = "添加流程";
  } else {
    choiceSourceTitle.value = "编辑流程";
  }
};

const userInfo = ref({});
const innerVisible = ref(false);
const innerTitle = ref("创建新流程");
const isEditprocess = ref(0);
const processForm = ref({
  name: "",
  // version: "",
  status: "",
  depart: userInfo.value.department_id,
  new_process_file_source: 0,
});
//选择是第三方还是新建
const isNew = (val) => {
  isEditprocess.value = val;
  innerVisible.value = true;
  if (val == "0") {
    innerTitle.value = "创建新流程";
  } else {
    innerTitle.value = "第三方流程接入";
  }
};
// 新增流程
const addProcessApi = (val) => {
  const formdata = new FormData();
  fileList.value.forEach((ele) => {
    if (ele.status === "ready") {
      formdata.append("file", ele.raw);
    }
  });

  formdata.append("department_id", processForm.value.depart);
  formdata.append("name", processForm.value.name);
  formdata.append("source", parseInt(isEditprocess.value));
  formdata.append(
    "new_process_file_source",
    parseInt(processForm.value.new_process_file_source)
  );

  request({
    method: "POST",
    url: "/api/process",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formdata,
  })
    .then((res) => {
      ElMessage({
        showClose: true,
        message: "新增成功",
        type: "success",
      });
      choiceSourceShow.value = false;
      innerVisible.value = false;
      console.log(res, "res");

      if (
        isEditprocess.value == "0" &&
        processForm.value.new_process_file_source == "0"
      ) {
        ElMessage({
          showClose: true,
          message: "正在打开流程画布......",
          type: "success",
        });
        edit(res.data.data.process);
      }

      getProcessList();
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};

const handleRemove = (file, uploadFiles) => {
  fileList.value = uploadFiles;
};

const handleSizeChange = (val) => {
  searchForm.value.page_size = val;
  getProcessList();
};
const handleCurrentChange = (val) => {
  searchForm.value.page_num = val;
  getProcessList();
};
//查询部门/api/department
const departmentList = ref([]);
const queryDepartmentListParams = ref({
  id: null,
  limit: null,
});
const queryDepartmentList = () => {
  request({
    method: "GET",
    url: "/api/department",
    params: queryDepartmentListParams.value,
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

const isSA = ref(false);

userInfo.value = JSON.parse(sessionStorage.getItem("userInfo"));

// 是否可操作上线下线
const isOnline = (row) => {
  if (isSA.value) {
    return true;
  } else {
    return row.user.id === userInfo.value.id;
  }
};
const gohome = () => {
  router.push("/home");
};
const goBack = () => {
  router.go(-1);
};
onMounted(() => {
  queryDepartmentList();

  if (userInfo.value.roles.indexOf("admin") === -1) {
    //不是管理员
    queryDepartmentListParams.value.id = userInfo.value.department_id;
    isSA.value = false;
  } else {
    queryDepartmentListParams.value.limit = false;
    isSA.value = true;
  }
  processForm.value.depart = userInfo.value.department_id;
  getProcessList();
});
</script>
<style lang="less" scoped>
.main-page {
  padding: 40px;
  padding-top: 20px;
  .onebox {
    width: 100%;
    text-align: center;

    .left_box,
    .right_box {
      text-align: center;
      display: inline-block;
      padding: 10%;
      width: 50%;

      .boxboder {
        border-radius: 2px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);

        .img {
          width: 70px;
        }

        .text {
          font-size: 20px;
          font-weight: 900;
          padding-bottom: 20px;
        }
      }
    }

    .left_box {
    }
  }
}

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
