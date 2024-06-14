<template>
  <div class="mainpage">
    <el-row :gutter="20">
      <el-col 
        v-for="(menuItem, index) in navList"
        :key="index"
        :index="menuItem.id" :span="12"
      >
        <div class="kuang">
          <div class="title">
            {{ menuItem.buName }}
          </div>
          <div class="liangdian" v-for="(specilItem, Index) in menuItem.specilList" :key="Index">
            {{ specilItem }}
          </div>
          <div class="detailLink" @click="goDetail(menuItem.id)">
            了解详情 >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import router from '../../../router/index.js'
const navList = [
  {
    id:'1',
    navName: 'RPA营销',
    buName: '营销部',
    specilList: [
      '营财系统数据智能校核',
      '稽查工单智能核验',
      '7*24小时服务申请工单监测',
      '电能计量装置改造',
      '....'
    ]
  },
  {
    id:'2',
    navName: 'RPA人资',
    buName: '人资部',
    specilList: [
      '综合福利报表上报审核',
      'SAP数据治理',
      '绩效证明word生成'
    ]
  },
  {
    id:'3',
    navName: 'RPA党建',
    buName: '党建部',
    specilList: [
      '南瑞集团党建信息核查'
    ]
  },
  {
    id:'4',
    navName: 'RPA财资',
    buName: '财资部',
    specilList: [
      '智能邮件助手',
      '内部往来核对',
      '财务月度监督报告一键生成'
    ]
  },
  {
    id:'5',
    navName: 'RPA运维',
    buName: '运维部',
    specilList: [
      '变电站电表中断自动处理',
      '电能量模型配置比对',
      '电能量线损-母线平衡-站损异常数据排查',
      '调控云数据异常监控'
    ]
  },
  {
    id:'6',
    navName: 'RPA调度自动化',
    buName: '调度自动部',
    specilList: [
      '用户电流曲线监测',
      '线路电流值监测',
      '基础数据指标监控',
      '调控云电量数据校验',
      '....'
    ]
  }
]
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
function goDetail( val ) {
  console.log(val);
  router.push({name:'mainListMore'});
  // router.push({name:'user',params:{id:props.videoInfo.author.ID}});


}
</script>
<style lang="scss" scoped>
.mainpage{
  padding: 20px;
  .kuang{
    height: 330px;
    background-color: pink;
    margin-bottom: 20px;
    padding: 30px;
    .title{
      font-weight: 900;
      font-size: 36px;
      margin-bottom: 20px;
    }
    .liangdian{
      margin-top: 10px;
      color: #666;
    }
    .detailLink{
      margin-top: 20px;
      color: #2468F2;
    }
  }
}

</style>

