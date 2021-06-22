<template>
  <div id="app">
    <AppBar :title="title"/>
    <BarLeft/>
    <router-view/>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import BarLeft from '@/components/BarLeft.vue';
import global from '@/components/Common.vue'
import mdui from 'mdui'
export default {
  name:'App',
  data:function(){
    return {
    }
  },
  computed:{
    title:function(){
      return this.$route.name
    }
  },
  components:{
    AppBar,
    BarLeft
  },
  created(){
    //解析环境变量
    var nodeList = JSON.parse(process.env.VUE_APP_API_URL)
    if(nodeList.length<1){
      mdui.snackbar("环境变量配置失效！请检查VUE_APP_API_URL设置是否正确！")
    }else{
      global.urlList=nodeList
    }
  },
  mounted() {
    //设置Bar所需Body类
    document.getElementsByTagName('body')[0].className = 'mdui-appbar-with-toolbar'
    //检测登录状态
    var ccid= localStorage.getItem("cid")
    var url=localStorage.getItem("baseUrl")
    var node=localStorage.getItem("nodeName")
    if(ccid != "" && ccid != null){
      global.cid = ccid
      global.cookieStatus= true
      global.loginStatus= true
      global.baseUrl= url
      global.nodeName= node 
    if(this.$route.name == "首页"){
        mdui.snackbar({message: "您已经登录了！是否前往个人中心？", timeout: 0, buttonText:"立即前往", onButtonClick:this.goHmoe})
    }
    }else{
      if(this.$route.name != "首页"){
        this.$router.replace('/')
      }
    }
  },
  methods:{
    goHmoe(){
      this.$router.push({path:"/home"})
    }
  }
}
</script>

<style>
</style>
