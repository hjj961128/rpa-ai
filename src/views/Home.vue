<template>
  <div>
    <div class="top-title">
      111
    </div>
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="4" :offset="1">
          <div class="top-div">
            <div class="iconImg el-icon-Watch"><Watch /></div>
            <div class="icontitle">全天候待命</div>
            <div class="iconTxt">能够7*24小时全天候执行此前人力从事的工作，节假日无休</div>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch"><WalletFilled /></div>
            <div class="icontitle">成本降低</div>
            <div class="iconTxt">机器人可以完成耗时及重复的任务，释放人力去执行更有价值的任务</div>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch"><Checked /></div>
            <div class="icontitle">准确度高</div>
            <div class="iconTxt">提高工作质量，避免出现人为错误而导致的返工，速度和准确率接近100%</div>
          </div>
        </el-col>
        <el-col :span="4" :offset="2">
          <div class="top-div">
            <div class="iconImg el-icon-Watch"><MagicStick /></div>
            <div class="icontitle">出错率低</div>
            <div class="iconTxt">长时间操作系统，容易出现疲劳，从而导致出错。使用RPA，可以有效降低出错率</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-row :gutter="20">
        <el-col :span="6" :offset="1">
          <div class="bottom-div">
            <div class="bottom-title"><span class="bottom-title-txt"> RPA与传统人工成本对比</span></div>
            <div id="myEcharts1" :style="{ width: '370px', height: '350px', background: '#fff' }"></div>
          </div>
        </el-col>
        <el-col :span="6" :offset="2">
          <div class="bottom-div">
            sas
          </div>
        </el-col>
        <el-col :span="6" :offset="2">
          <div class="bottom-div">
            sas
          </div>
        </el-col>
      </el-row>
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
.bottom-div{
margin-top: 30px;
height: 500px;
box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
.bottom-title{
  width: 100%;
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #eaeaea;
  .bottom-title-txt{
    display: inline-block;
   margin-left: 20px;
  }
}
}
svg {
width: 48px;
height: 48px;
color: rgb(81, 81, 81);
}
</style>