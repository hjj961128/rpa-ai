<template>
  <div>
    <!-- 面包屑 -->
    <div style="margin: 20px">
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
    <div class="top">
      <div class="title1">业务亮点</div>
      <el-row :gutter="20">
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch">
              <svg-icon name="allday"></svg-icon>
            </div>
            <div class="icontitle">全天候待命</div>
            <div class="iconTxt">
              能够7*24小时全天候执行此前人力从事的工作，节假日无休
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch">
              <svg-icon name="tu2"></svg-icon>
            </div>
            <div class="icontitle">成本降低</div>
            <div class="iconTxt">
              机器人可以完成耗时及重复的任务，释放人力去执行更有价值的任务
            </div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch">
              <svg-icon name="tu3"></svg-icon>
            </div>
            <div class="icontitle">准确度高</div>
            <div class="iconTxt">
              提高工作质量，避免出现人为错误而导致的返工，速度和准确率接近100%
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="center">
      <div class="title1">{{ processList.name }}</div>
      <div class="centerview">
        <div class="left">
          <!-- <img src="../../../assets/images/u45.png" alt="" />
           -->
          <vue3VideoPlay
            v-if="videoUrl"
            width="100%"
            title="视屏演示"
            :src="videoUrl"
            @play="onPlay"
            @pause="onPause"
            @timeupdate="onTimeupdate"
            @canplay="onCanplay"
          />
          <img v-else src="../../../assets/images/u45.png" alt="" />

          <!-- :poster="options.poster"
            @play="onPlay"
            @pause="onPause"
            @timeupdate="onTimeupdate"
            @canplay="onCanplay" -->
        </div>
        <div class="right">
          <div class="show" v-if="processList.process_introduction">
            <div class="showTitle">简介</div>
            <div class="showDetail">
              {{ processList.process_introduction }}
            </div>
            <div class="showui">
              {{ processList.effectARR }}
              <!-- {{ processList.effect.split(".") }} -->
              <ul>
                <!-- <li v-for="(item,index) in processList.effectARR" :key="index">{{ item }}</li> -->
                <!-- <li>每日人工处理该业务需5小时，RPA执行仅需1小时</li>
                <li>提升4倍工作效率</li>
                <li>核对正确率提高至100%</li> -->
              </ul>
            </div>
          </div>
          <div class="show" v-if="processList.business_system">
            <div class="showTitle">涉及业务系统</div>
            <div class="showDetail">{{ processList.business_system }}</div>
            <div class="showui"></div>
          </div>
          <div class="show" v-if="processList.full_file_url">
            <div class="showTitle">流程文件</div>
            <!-- <el-link type="primary">{{
              processList.file_url
                ? processList.full_file_url
                : "https://www.baidu.com/"
            }}</el-link> -->
            <a :href="processList.full_file_url">下载</a>
          </div>
          <div class="show">
            <div class="showTitle">执行方式</div>
            <el-button @click="runModeType('1')" plain>手动执行</el-button>
            <el-button @click="runModeType('2')" type="primary" plain
              >定时执行</el-button
            >
          </div>
          <!-- <div class="show">
            <div class="showTitle">执行记录</div>
            <div class="showDetail">
              <el-table
                :data="taskStatusList"
                show-overflow-tooltip
                border
                style="width: 100%"
              >
                <el-table-column prop="wr_worker_name" label="客户端名称" min-width="100" />
                <el-table-column prop="task_status" label="任务状态" min-width="100">
                  <template #default="{ row }">
                    <div>
                      {{
                        row.task_status == "0"
                          ? "待运行"
                          : row.task_status == "1"
                          ? "运行中"
                          : row.task_status == "2"
                          ? "已取消"
                          : row.task_status == "3"
                          ? "成功"
                          : row.task_status == "4"
                          ? "失败"
                          : "异常"
                      }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="automatic" label="自动分配" min-width="100">
                  <template #default="{ row }">
                    <div>
                      {{ row.automatic === "0" ? "否" : "是" }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="work_way" label="运行方式" min-width="100" />
                <el-table-column prop="run_time" label="运行时长" min-width="100" >

                  <template #default="{ row }">
                    <div>{{ secondsToHMS(row.run_time) }}</div>
                  </template>

                </el-table-column>

                <el-table-column prop="start_time" label="开始时间" min-width="100" />
                <el-table-column prop="end_time" label="结束时间" min-width="100" />

                <el-table-column prop="created_at" label="创建时间" min-width="100">
                  <template #default="{ row }">
                    <div>{{ new Date(row.created_at).toLocaleString() }}</div>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
              :background="true"
              :current-page="taskPage.page_num"
              :page-size="taskPage.page_size"
              :page-sizes="[10, 25, 50, 100]"
              :total="taskPage.total"
              layout="total, sizes, prev, pager, next, jumper"
              size="mini"
              @size-change="handleTaskSizeChange"
              @current-change="handleTaskCurrentChange"
              style="margin-top: 10px"
              ></el-pagination>


            </div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title1">执行记录</div>
      <div class="card">
        <el-table
          :data="taskStatusList"
          show-overflow-tooltip
          style="width: 100%"
          class="table-with-bg"
        >
          <!-- <el-table-column prop="task_no" label="任务编号" /> -->
          <el-table-column
            prop="wr_worker_name"
            label="客户端名称"
            min-width="100"
          />
          <el-table-column prop="task_status" label="任务状态" min-width="100">
            <template #default="{ row }">
              <div>
                {{
                  row.task_status == "0"
                    ? "待运行"
                    : row.task_status == "1"
                    ? "运行中"
                    : row.task_status == "2"
                    ? "已取消"
                    : row.task_status == "3"
                    ? "成功"
                    : row.task_status == "4"
                    ? "失败"
                    : "异常"
                }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="automatic" label="自动分配" min-width="100">
            <template #default="{ row }">
              <div>
                {{ row.automatic === "0" ? "否" : "是" }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="work_way" label="运行方式" min-width="100" />
          <el-table-column prop="run_time" label="运行时长" min-width="100">
            <template #default="{ row }">
              <div>{{ secondsToHMS(row.run_time) }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="run_result_reason"
            label="运行详情"
            min-width="100"
          />

          <el-table-column prop="start_time" label="开始时间" min-width="100" />
          <el-table-column prop="end_time" label="结束时间" min-width="100" />

          <el-table-column prop="created_at" label="创建时间" min-width="100">
            <template #default="{ row }">
              <div>{{ new Date(row.created_at).toLocaleString() }}</div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="annotation" label="备注" /> -->
        </el-table>

        <el-pagination
          :background="true"
          :current-page="taskPage.page_num"
          :page-size="taskPage.page_size"
          :page-sizes="[10, 25, 50, 100]"
          :total="taskPage.total"
          layout="total, sizes, prev, pager, next, jumper"
          size="mini"
          @size-change="handleTaskSizeChange"
          @current-change="handleTaskCurrentChange"
          style="margin-top: 10px; float: right"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      v-model="runModeVisible"
      width="800"
      :title="runModeTypeNum == '1' ? '手动执行' : '定时执行'"
      append-to-body
    >
      <el-form :model="runModeForm" label-width="auto" style="max-width: 800px">
        <el-form-item label="触发器名称" v-if="runModeTypeNum == '2'">
          <el-input
            v-model="runModeForm.tiggerName"
            placeholder="请输入触发器名称"
          />
        </el-form-item>
        <el-form-item label="流程名称">
          <el-input v-model="runModeForm.name" disabled />
        </el-form-item>
        <el-form-item label="是否自动分配worker">
          <el-switch v-model="runModeForm.isWorker" />
        </el-form-item>
        <el-form-item label="worker名称" v-if="!runModeForm.isWorker">
          <el-select
            v-model="runModeForm.workerName"
            placeholder="请选择worker名称"
          >
            <el-option
              v-for="(item, Index) in taskList"
              :key="Index"
              :label="
                item.wrWorkerName +
                ' (' +
                item.online +
                ') ' +
                '待运行' +
                '(' +
                item.willRun +
                ')'
              "
              :value="item.wrWorkerId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="配置参数" v-if="ProcessParamsList.length > 2">
          <el-table
            :data="ProcessParamsList.filter((item) => item.show !== false)"
            show-overflow-tooltip
            border
            style="width: 100%"
          >
            <el-table-column prop="key" label="参数名" />
            <el-table-column prop="showType" label="参数类型" width="90" />
            <el-table-column prop="value" label="参数值">
              <template #default="{ row }">
                <el-input
                  style="width: 100%"
                  v-model="row.value"
                  controls-position="right"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="annotation" label="备注" />
          </el-table>
        </el-form-item>
        <el-form-item label="执行频率" v-if="runModeTypeNum == '2'">
          <el-radio-group v-model="runModeForm.choiceTime">
            <el-radio-button label="每日" value="eDay"> </el-radio-button>
            <el-radio-button label="每周" value="eWeek" />
            <el-radio-button label="每月" value="eMonth" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label=" " v-if="runModeTypeNum == '2'">
          <el-card style="padding: 0px 20px">
            <p class="cardTitle">执行方式</p>
            <div v-if="runModeForm.choiceTime == 'eWeek'">
              <el-checkbox
                v-model="checkAllWeeks"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                v-model="checkedWeeks"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="week in weekList"
                  :key="week.label"
                  :label="week.value"
                  :value="week.label"
                >
                  {{ week.value }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="runModeForm.choiceTime == 'eMonth'">
              <el-checkbox
                v-model="checkAllMonth"
                :indeterminate="isIndeterminateMonth"
                @change="handleCheckAllChangeMonth"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                v-model="checkedMonth"
                @change="handleCheckedMonthChange"
              >
                <el-checkbox
                  v-for="month in MonthList"
                  :key="month"
                  :label="month"
                  :value="month"
                >
                  {{ month }}月
                </el-checkbox>
              </el-checkbox-group>
              <p class="cardTitle">指定日</p>
              <el-radio-group v-model="runModeForm.timeType">
                <el-radio value="dayday" size="large">按日</el-radio>
                <el-radio value="monthlast" size="large">当月最后一天</el-radio>
              </el-radio-group>
              <div v-if="runModeForm.timeType == 'dayday'">
                当月第
                <el-select
                  v-model="runModeForm.monthDay"
                  multiple
                  placeholder="请选择"
                  style="width: 240px"
                >
                  <el-option
                    v-for="item in montDayList"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
                日
              </div>
            </div>

            <div>
              在&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <el-time-picker
                v-model="runModeForm.timeHM"
                placeholder="选择时间"
                format="HH:mm"
                value-format="HH:mm"
              />
              执行
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="触发预览" v-if="runModeTypeNum == '2'">
          <p v-if="runModeForm.choiceTime == 'eDay'">
            每日的 {{ runModeForm.timeHM }} 执行
          </p>
          <p v-if="runModeForm.choiceTime == 'eWeek'">
            每周 {{ checkedWeeks }} 的 {{ runModeForm.timeHM }} 执行
          </p>
          <div v-if="runModeForm.choiceTime == 'eMonth'">
            <p v-if="runModeForm.timeType == 'dayday'">
              每 {{ checkedMonth }} 第 {{ runModeForm.monthDay }} 的
              {{ runModeForm.timeHM }} 执行
            </p>
            <p v-else>
              每 {{ checkedMonth }} 最后1日的 {{ runModeForm.timeHM }} 执行
            </p>
          </div>
        </el-form-item>
        <el-form-item label="启动时间" v-if="runModeTypeNum == '2'">
          <el-date-picker
            v-model="startTime"
            placeholder="请输入启动时间"
            :disabled-date="disabledDate"
          />
        </el-form-item>
        <el-form-item label="结束时间" v-if="runModeTypeNum == '2'">
          <el-date-picker
            v-model="endTime"
            placeholder="请输入结束时间"
            :disabled-date="disabledendDate"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clickTask(runModeTypeNum)"
            >运行</el-button
          >
          <el-button @click="runModeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const baseURL = ref(import.meta.env.VUE_APP_BASE_URL);
import httpClient from "../../../utils/request.js";

import request from "@/utils/request";
import { useRouter } from "vue-router";

const router = useRouter();
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7;
};

const disabledendDate = (time) => {
  return time < startTime.value;
};

const runModeTypeNum = ref("1");
const runModeVisible = ref(false);
const runModeForm = ref({
  name: null,
  isWorker: false,
  choiceTime: "eDay",
  timeType: "dayday",
  timeHM: "00:00",
  monthDay: ["1"],
});
const startTime = ref(null);
const endTime = ref(null);

const weekList = ref([
  {
    label: "1",
    value: "周日",
  },
  {
    label: "2",
    value: "周一",
  },
  {
    label: "3",
    value: "周二",
  },
  {
    label: "4",
    value: "周三",
  },
  {
    label: "5",
    value: "周四",
  },
  {
    label: "6",
    value: "周五",
  },
  {
    label: "7",
    value: "周六",
  },
]);
const checkAllWeeks = ref(false);
const isIndeterminate = ref(true);
const checkedWeeks = ref(["1"]);

const handleCheckAllChange = (val) => {
  checkedWeeks.value = val ? ["1", "2", "3", "4", "5", "6", "7"] : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (val2) => {
  checkAllWeeks.value = val2.length === weekList.value.length;
  isIndeterminate.value =
    val2.length > 0 && val2.length < weekList.value.length;
};
const montDayList = ref([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
]);
const MonthList = ref([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
]);
const checkAllMonth = ref(false);
const isIndeterminateMonth = ref(true);
const checkedMonth = ref(["1"]);

const handleCheckAllChangeMonth = (val) => {
  checkedMonth.value = val ? MonthList.value : [];
  isIndeterminateMonth.value = false;
};
const handleCheckedMonthChange = (val2) => {
  checkAllMonth.value = val2.length === MonthList.value.length;
  isIndeterminateMonth.value =
    val2.length > 0 && val2.length < MonthList.value.length;
};

const runModeType = (val) => {
  runModeVisible.value = true;
  runModeTypeNum.value = val;
  runModeForm.value = {
    tiggerName: null, //触发器名称
    name: processList.value.name, //流程名称
    isWorker: false, //是否自动分配worker
    workerName: null, //worker名称
    choiceTime: "eDay", //执行频率每日周月
    timeType: "dayday", //按日/每月最后一天
    timeHM: "00:00",
    monthDay: ["1"],
  };
  startTime.value = null;
  endTime.value = null;
  checkAllWeeks.value = false;
  checkedWeeks.value = ["1"];
  checkAllMonth.value = false;
  checkedMonth.value = ["1"];
};

const taskList = ref([]);
const getWorkerList = () => {
  request({
    method: "GET",
    url: "/api/worker",
    params: {
      limit: false,
    },
  })
    .then((res) => {
      taskList.value = res.data.data.list;
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
const ProcessParamsList = ref([]);
const getProcessParams = () => {
  request({
    method: "GET",
    url: "/api/process/params",
    params: {
      id: route.query.id,
    },
  })
    .then((res) => {
      if (res.data.data.length > 2) {
        ProcessParamsList.value = res.data.data;
      }
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};

const secondsToHMS = (seconds) => {
  if (seconds) {
    let hms = "";
    const dateObj = new Date(seconds); // 将秒转换为毫秒
    //时
    const hours = dateObj.getUTCHours();
    if (hours) hms += `${hours}小时 `;
    //分
    const minutes = dateObj.getUTCMinutes();
    if (minutes) hms += `${minutes}分钟 `;
    //秒
    const remainingSeconds = dateObj.getSeconds();
    if (remainingSeconds) hms += `${remainingSeconds}秒`;

    return hms;
  } else {
    return "";
  }
};

const taskPage = ref({
  page_num: 1,
  page_size: 10,
  total: 0,
});

const taskStatusList = ref([]);
const getTask = () => {
  request({
    method: "GET",
    url: "/api/task",
    params: {
      process_id: route.query.id,
      page_num: taskPage.value.page_num,
      page_size: taskPage.value.page_size,
    },
  })
    .then((res) => {
      taskStatusList.value = res.data.data.list;
      taskPage.value.total = res.data.data.total;
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};

const handleTaskSizeChange = (val) => {
  taskPage.value.page_size = val;
  getTask();
};
const handleTaskCurrentChange = (val) => {
  taskPage.value.page_num = val;
  getTask();
};

const cronExpression = ref("");
const clickTask = (val) => {
  console.log(val);
  if (runModeForm.value.choiceTime == "eDay") {
    cronExpression.value =
      "0" +
      " " +
      runModeForm.value.timeHM.substring(
        runModeForm.value.timeHM.length - 2,
        runModeForm.value.timeHM.length
      ) +
      " " +
      runModeForm.value.timeHM.substring(0, 2) +
      " " +
      "*" +
      " " +
      "*" +
      " " +
      "?";
  } else if (runModeForm.value.choiceTime == "eWeek") {
    cronExpression.value =
      "0" +
      " " +
      runModeForm.value.timeHM.substring(
        runModeForm.value.timeHM.length - 2,
        runModeForm.value.timeHM.length
      ) +
      " " +
      runModeForm.value.timeHM.substring(0, 2) +
      " " +
      "?" +
      " " +
      "*" +
      " " +
      checkedWeeks.value.toString();
  } else {
    const timeTypeValue = ref("");
    console.log(timeTypeValue.value);
    console.log(runModeForm.value.timeType);
    if (runModeForm.value.timeType == "monthlast") {
      timeTypeValue.value = "L";
    } else {
      timeTypeValue.value = runModeForm.value.monthDay.toString();
    }
    cronExpression.value =
      "0" +
      " " +
      runModeForm.value.timeHM.substring(
        runModeForm.value.timeHM.length - 2,
        runModeForm.value.timeHM.length
      ) +
      " " +
      runModeForm.value.timeHM.substring(0, 2) +
      " " +
      timeTypeValue.value +
      " " +
      checkedMonth.value.toString() +
      " " +
      "?";
  }
  console.log(cronExpression.value);
  if (val == "1") {
    request({
      method: "POST",
      url: "/api/task",
      data: {
        process_id: route.query.id,
        wr_worker_id: runModeForm.value.workerName,
        automatic: runModeForm.value.isWorker,
        file_params: ProcessParamsList.value,
      },
    })
      .then((res) => {
        ElMessage({
          type: "success",
          message: "任务已下发，客户端即将运行",
        });
        runModeVisible.value = false;
        getTask();
      })
      .catch((err) => {
        ElMessage({
          showClose: true,
          message: err,
          type: "error",
        });
      });
  } else {
    request({
      method: "POST",
      url: "/api/trigger",
      data: {
        process_id: route.query.id,
        name: runModeForm.value.tiggerName,
        wr_work_id: runModeForm.value.workerName,
        cron_expression: cronExpression.value,
        work_start_time: new Date(startTime.value).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        work_end_time: new Date(endTime.value).toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
        automatic: runModeForm.value.isWorker,
        params: ProcessParamsList.value,
      },
    })
      .then((res) => {
        ElMessage({
          type: "success",
          message: "任务已下发，客户端即将运行",
        });
        runModeVisible.value = false;
      })
      .catch((err) => {
        ElMessage({
          showClose: true,
          message: err,
          type: "error",
        });
      });
  }
};
const processList = ref([]);
const route = useRoute();
const getProcessList = () => {
  request({
    method: "GET",
    url: "/api/process",
    params: {
      id: route.query.id,
      limit: false,
    },
  })
    .then((res) => {
      processList.value = res.data.data.list[0];
      // processList.value.forEach(item=>{
      //   processList.value.effectARR = processList.effect.split(",")
      // })
      runModeForm.value.name = processList.value.name;
    })
    .catch((err) => {
      ElMessage({
        showClose: true,
        message: err,
        type: "error",
      });
    });
};
const onPlay = (ev) => {
  console.log("播放");
};
const onPause = (ev) => {
  console.log(ev, "暂停");
};

const onTimeupdate = (ev) => {
  console.log(ev, "时间更新");
};
const onCanplay = (ev) => {
  console.log(ev, "可以播放");
};
const videoUrl = ref(null);
const getVideo = () => {
  videoUrl.value = httpClient.defaults.baseURL + "/api/video?id=" + route.query.id;
  console.log(videoUrl.value);
};
const gohome = () => {
  router.push("/home");
};
const goBack = () => {
  router.go(-1);
};
onMounted(() => {
  getProcessList();
  getWorkerList();
  getProcessParams();
  getVideo();
  getTask();
});
</script>
<style lang="scss" scoped>
.top-title {
  width: 100%;
  height: 180px;
  background-image: url("../assets/images/home-bg.jpg");
  /* 替换为你的图片路径 */
  background-size: cover;
  /* 背景图片覆盖整个元素 */
  background-repeat: no-repeat;
  /* 背景图片不重复 */
}

.top-div {
  margin-top: 20px;
  height: 200px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  padding-top: 20px;

  .iconImg {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }

  .icontitle {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    font-weight: 700;
    font-size: 18px;
    color: #333;
  }

  .iconTxt {
    width: 80%;
    margin: 10px auto;
    font-size: 14px;
    color: #333;
  }
}

svg {
  width: 48px;
  height: 48px;
  color: rgb(81, 81, 81);
}

.title1 {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-weight: 900;
  font-size: 28px;
  line-height: 50px;
}

.centerview {
  display: flex;

  .left {
    width: 50%;
    padding: 40px;

    // height: 600px;
    img {
      width: 100%;
    }
  }

  .right {
    width: 50%;
    padding: 50px;
    padding-left: 100px;
    // display: inline-block;
  }
}

.bottom {
  margin-bottom: 70px;
  .card {
    width: 90%;
    padding: 20px;
    margin-left: 5%;
    // background-image: url("../../../assets/images/bbg.png");
    /* 替换为你的图片路径 */
    background-size: cover;
    /* 背景图片覆盖整个元素 */
    background-repeat: no-repeat;

    /* 背景图片不重复 */
    // text-align: center;
    .title {
      width: 100%;
      height: 30px;
      font-weight: 700;
      margin-left: 20px;
    }

    .detail {
      margin-left: 20px;
      margin-top: 20px;
      width: 55%;
      height: 100px;
      color: #797979;
      line-height: 30px;
    }
  }
}

.showTitle:before {
  content: "";
  /* 使用空内容生成内容 */
  background-color: #2468f2;
  /* 设置背景颜色为蓝色 */
  border-radius: 3px;
  /* 圆点形状 */
  display: inline-block;
  /* 使其成为行内块元素 */
  width: 6px;
  /* 宽度 */
  height: 16px;
  /* 高度 */
  margin-left: -1.5em;
  /* 向左移动半个列表项内边距，使得小圆点与文本对齐 */
  margin-right: 0.5em;
  /* 向右移动，为了间隔效果 */
}

.showTitle {
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 15px;
}

.showDetail,
.showui {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #333;
}

.show {
  margin-top: 10px;
}

.cardTitle:before {
  content: "";
  /* 使用空内容生成内容 */
  background-color: #2468f2;
  /* 设置背景颜色为蓝色 */
  border-radius: 3px;
  /* 圆点形状 */
  display: inline-block;
  /* 使其成为行内块元素 */
  width: 6px;
  /* 宽度 */
  height: 16px;
  /* 高度 */
  margin-left: -1.5em;
  /* 向左移动半个列表项内边距，使得小圆点与文本对齐 */
  margin-right: 0.5em;
  /* 向右移动，为了间隔效果 */
}
.table-with-bg {
  background-image: url("../../../assets/images/bbg.png"); /* 替换为你的图片路径 */
  background-size: cover; /* 背景图片覆盖整个元素 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}
</style>
