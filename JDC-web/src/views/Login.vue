<template>
<div class="mdui-container">
  <div class="mdui-row">
  <div class="mdui-col-xs-12 mdui-col-lg-4 mdui-col-offset-lg-4">
    <NodeSelect/>
  </div>
  </div>
  <div class="mdui-row">
    <div class="mdui-col-xs-12 mdui-col-lg-4 mdui-col-offset-lg-4">
      <QrCode tip="请使用京东APP扫码登录" :isOk="isOk"/>
    </div>
  </div>
  <div class="row">
    <div class="mdui-divider hr"></div>
  </div>
</div>
</template>

<script>
import QrCode from '../components/QrCode.vue'
import NodeSelect from '../components/NodeSelect'
export default {
  name:'Login',
  data:function(){
    return {
      isOk:false
    }
  },
  components:{
    QrCode,
    NodeSelect
  },
  mounted:function(){
    this.isOk=true
  }
}
</script>

<style scoped>
.hr{
  margin-top: 20px;
}
</style>