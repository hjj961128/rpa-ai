<template>
  <div class="mainpage">
    <el-row :gutter="20">
      <el-col 
        v-for="(menuItem, index) in navList"
        :key="index"
        :index="menuItem.id" :span="8"
      >
        <div class="kuang">
          <div class="title">
            <!-- {{ menuItem.buName }} -->
            <span>智能财务智能数据核验</span>
            <span class="hot">HOT</span>
            <span class="detail" @click="goDetail('1')"> 》</span>
          </div>
          <div class="liangdian">
            <!-- {{ specilItem }} -->
            核查电费的准确性的大多数大发啊好风光好的发烧发烧开发啊扽的v的范德萨的风风光光赶快回家啊是咖啡馆发感慨
          </div>
          <div class="detailLink">
            
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
function goDetail( val ) {
  router.push({name:'schemeDetail'});
}
</script>
<style lang="scss" scoped>
.mainpage{
  padding: 20px;
  .kuang{
    height: 250px;
    background: url('../../../assets/images/cardbg.png') no-repeat center/cover;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    padding: 30px;
    border-radius: 8px;
    .title{
      font-size: 24px;
      margin-bottom: 20px;
      .hot{
        margin-left: 20px;
        font-size: 18px;
        color: #fff;
        padding: 5px;
        background-color: red;
      }
      .detail{
        float: right;
      }
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

