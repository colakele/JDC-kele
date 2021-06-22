<template>
<div class="qrcode">
        <div class="mdui-card">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">消息推送</div>
                <div class="mdui-card-primary-subtitle">使用微信扫描二维码订阅消息</div>
                <div class="mdui-card-media">
                    <img :src="qrUrl">
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'
import global from '../components/Common.vue'
export default {
    name:"PushCode",
    data:function(){
        return {
            baseUrl:"",
            qrUrl:""
        }
    },
    created(){
        var self= this
        if(localStorage.getItem("baseUrl")!=""&&localStorage.getItem("baseUrl")!=null){
            this.baseUrl=localStorage.getItem("baseUrl")
        }else{
            this.baseUrl=global.urlList[0].url
        }
        axios.get(this.baseUrl+"/push_qr").then(function(res){
            if(res.data.code==0){
                self.qrUrl=res.data.data
            }
        })
    }
}
</script>

<style scoped>
.qrcode{
    margin-top:20px
}
</style>