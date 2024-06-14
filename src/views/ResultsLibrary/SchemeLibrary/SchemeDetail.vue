<template>
  <div>
    <div class="top">
      <div class="title1">业务难点</div>
      <el-row :gutter="20">
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch"><Watch /></div>
            <div class="icontitle">全天候待命</div>
            <div class="iconTxt">能够7*24小时全天候执行此前人力从事的工作，节假日无休</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch"><WalletFilled /></div>
            <div class="icontitle">成本降低</div>
            <div class="iconTxt">机器人可以完成耗时及重复的任务，释放人力去执行更有价值的任务</div>
          </div>
        </el-col>
        <el-col :span="5" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch"><Checked /></div>
            <div class="icontitle">准确度高</div>
            <div class="iconTxt">提高工作质量，避免出现人为错误而导致的返工，速度和准确率接近100%</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="center">
      <div class="title1">营财系统数据智能校核</div>
      <div class="centerview">
        <div class="left">
          <img src="../../../assets/images/u45.png" alt="">
        </div>
        <div class="right">
          <div class="show">
            <div class="showTitle">简介</div>
            <div class="showDetail">每日需核查电费到账日报的正确性、比对银行回单明细账的准确性、校验营财凭证的一致性。</div>
            <div class="showui">
              <ul>
                <li> 每日人工处理该业务需5小时，RPA执行仅需1小时</li>
                <li> 提升4倍工作效率</li>
                <li> 核对正确率提高至100%</li>
              </ul>
            </div>
          </div>
          <div class="show">
            <div class="showTitle">涉及业务系统</div>
            <div class="showDetail">营销系统1.0、财务管理信息系统</div>
            <div class="showui"></div>
          </div>
          <div class="show">
            <div class="showTitle">流程文件</div>
            <div class="showDetail">流程文件下载</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="title1">相关组件</div>
      <div class="card">
        
      </div>
    </div>
    
  </div>
</template>

<script>

</script>
<style lang="scss" scoped>
.top-title{
width: 100%;
height: 180px;
background-image: url('../assets/images/home-bg.jpg'); /* 替换为你的图片路径 */
background-size: cover; /* 背景图片覆盖整个元素 */
background-repeat: no-repeat; /* 背景图片不重复 */
}
.top-div{
margin-top: 20px;
height: 200px;
border-radius: 6px;
background-color: #fff;
box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
padding-top: 20px;
.iconImg{
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.icontitle{
  margin-top: 10px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  color: #333;
}
.iconTxt{
  width: 80%;
  margin:10px auto;
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
  height: 490px;
  .left{
    width: 50%;
    float: left;
    padding: 40px;
    // height: 600px;
    img{
      width: 100%;
    }
    
  }
  .right{
    width: 50%;
    float: right;
    padding: 50px;
    padding-left: 100px;
  }
}
.bottom{
    // display: flex;
    // justify-content: center; /* 水平居中 */
    // align-items: center;
  .card{
    width: 80%;
    height: 200px;
    background-image: url('../../../assets/images/bbg.png'); /* 替换为你的图片路径 */
    background-size: cover; /* 背景图片覆盖整个元素 */
    background-repeat: no-repeat; /* 背景图片不重复 */
  }
}
</style>