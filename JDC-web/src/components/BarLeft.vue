<template>
<div class="mdui-drawer" id="drawer">
  <ul class="mdui-list">
    <li class="mdui-list-item mdui-ripple">
      <i class="mdui-list-item-icon mdui-icon material-icons">move_to_inbox</i>
      <div class="mdui-list-item-content"><router-link to="/">首页</router-link></div>
    </li>
    <li class="mdui-list-item mdui-ripple">
      <i class="mdui-list-item-icon mdui-icon material-icons">star</i>
      <div class="mdui-list-item-content" @click="goAuthPage('/home')">个人中心</div>
    </li>
    <li class="mdui-list-item mdui-ripple">
      <i class="mdui-list-item-icon mdui-icon material-icons">send</i>
      <div class="mdui-list-item-content" @click="goAuthPage('/push')">消息推送</div>
    </li>
  </ul>
</div>
</template>

<script>
import mdui from 'mdui'
export default {
    name:'BarLeft',
    methods:{
      goAuthPage(path){
        var ccid= localStorage.getItem("cid")
        if(ccid != "" && ccid != null){
          this.$router.push(path)
        }else{
          mdui.snackbar("您还未登录！")
        }
      }
    }
}
</script>