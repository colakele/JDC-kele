<template>
<div class="qrcode">

        <div class="mdui-card">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">扫码登录</div>
                <div class="mdui-card-primary-subtitle">{{tip}}</div>
                <div class="mdui-card-media">
                    <img :src="imageBase">
                </div>
            </div>
            <div class="mdui-card-actions">
                <div style="padding-bottom: 10px">
                    <button v-if="isOk" @click="getQrCode" class="mdui-btn mdui-btn-block mdui-ripple mdui-color-indigo">生成二维码</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import global from '../components/Common'
import axios from 'axios'
import mdui from 'mdui'
export default {
    name:"QrCode",
    data:function(){
        return {
            imageBase: "",
            timer: "",//定时器
            msg: "",//弹出提示
            okl_token: "",
            cookies: "",
            token: "",
        }
    },
    props:{
        tip:String,
        isOk:Boolean
    },
    methods:{
        //获取二维码
        getQrCode(){
            let self= this
            //获取二维码请求
            axios.get(global.baseUrl + "/qrcode").then(function(res){
                self.imageBase = 'data:image/jpeg;base64,' + res.data.qrCode
                self.okl_token = res.data.okl_token
                self.cookies = res.data.cookies
                self.token = res.data.token
                //清除定时器
                clearInterval(self.timer)
                //设置定时器
                self.timer = setInterval(self.checkReq, 2000);

            }).catch(function(){
                mdui.snackbar("该服务器已离线，请选择其他服务器！")
            })
        },
        //检测登录请求
        checkReq(){
            let self= this
            axios.post(global.baseUrl + "/check",{
                okl_token : this.okl_token,
                cookies : this.cookies,
                token : this.token
            }).then(function(res){
                if(res.data.code == 0){
                    clearInterval(self.timer)
                    mdui.snackbar(res.data.data)
                    //本地存储cid
                    global.loginSuccess(res.data.cid)
                    //跳转页面
                    self.$router.push({path:"/home"})
                    //清空二维码
                    self.imageBase=""
                }else if(res.data.code == 400){
                    clearInterval(self.timer)
                    mdui.snackbar(res.data.data)
                }
            })
        },
    }
}
</script>

<style scoped>
.qrcode{
    margin-top:20px
}
</style>