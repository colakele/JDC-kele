<template>
    <div class="nodeselect">
        <div class="mdui-card">
            <div class="mdui-card-content">
                当前节点：<div class="mdui-chip">
                <i :class="nowStatusClass">{{nowStatusIcon}}</i>                  
                <span class="mdui-chip-title">{{nowName}}</span>
                </div><div class="mdui-chip"><span class="mdui-chip-title">可用：{{nowAllow}}</span></div>
                <button mdui-menu="{target: '#select-list',fixed: 'true'}" class="select-btn mdui-btn mdui-btn-icon mdui-color-indigo mdui-ripple"><i class="mdui-icon material-icons">edit</i></button>
                <ul class="mdui-menu" id="select-list">
                <li v-for="(item, index) in nodeList" :key="item.name" class="mdui-menu-item">
                    <a @click="changeNode(index)" class="mdui-ripple">{{item.name}}({{checkNodeAllow(index)}})</a>
                </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import global from '../components/Common.vue'
import axios from 'axios'
export default {
    name: 'NodeSelect',
    data:function(){
        return {
            //节点列表
            nodeList:[],
            nowId:0,
        }
    },
    methods:{
        //改变节点
        changeNode(id){
            this.nowId= id
            if(this.nodeList.length != 0){
                global.baseUrl= this.nodeList[id].url
                global.nodeName= this.nodeList[id].name
            }
        },
        //节点信息获取
        checkNodeInfo(){
            var tmp= global.urlList
            var self= this
            var i
            for(i=0;i<tmp.length;i++){
                //开始检查
                axios.get(tmp[i].url+"/node_info").then(function(res){
                    if(res.data.code==0){
                        var url= res.config.url
                        var tmp4
                        //获取名称
                        for(var i=0;i<tmp.length;i++){
                            if(tmp[i].url +"/node_info" == url){
                                tmp4= tmp[i]
                            }
                        }
                        var allowNum = res.data.Num
                        if(res.data.Num==-1){
                            allowNum=99
                        }
                        var tmp2 = {name:tmp4.name,url:tmp4.url,allow:allowNum,status:res.data.isAllow}
                        self.nodeList.push(tmp2)
                    }
                }).catch(function(res){
                        var url= res.config.url
                        var tmp4
                        //获取名称
                        for(var i=0;i<tmp.length;i++){
                            if(tmp[i].url +"/node_info" == url){
                                tmp4= tmp[i]
                            }
                        }
                        var tmp2 = {name:tmp4.name,url:tmp4.url,allow:0,status:"CLOSE"}
                        self.nodeList.push(tmp2)
                        console.log(tmp4.name+"连接失败！")

                })
            }
        },
        //选择最优节点
        selectMinNode(){
            if(this.nodeList.length==global.urlList.length){
                var tmp = this.nodeList
                //开始遍历
                var Mnum = 0
                var id = 0
                for(var i=0;i<tmp.length;i++){
                    if(tmp[i].allow>Mnum){
                        id = i
                    }
                }
                this.changeNode(id)
            }
            
        },
        checkNodeAllow(id){
            if(this.nodeList != 0){
                if(this.nodeList[id].status == "CLOSE"){
                    return "离线"
                }else{
                    return this.nodeList[id].allow + "可用"
                }
            }else{
                return "123"
            }
        },
    },
    watch:{
        nodeList:function(){
            this.selectMinNode()
        }
    },
    created:function(){
        this.checkNodeInfo()
    },
    computed:{
        nowName(){
            if(this.nodeList.length != 0){
                 return this.nodeList[this.nowId].name
            }else{
                return "暂无节点"
            }

        },
        nowAllow(){
            if(this.nodeList.length != 0){
                 return this.nodeList[this.nowId].allow
            }else{
                return 0
            }
        },
        nowStatusIcon(){
            if(this.nodeList.length != 0){
                 if(this.nodeList[this.nowId].status == true){
                    return "check"
                 }else if(this.nodeList[this.nowId].status == false){
                    return "stop"
                 }else{
                    return "close"
                 }
            }else{
                return "close"
            }
        },
        nowStatusClass(){
            if(this.nodeList.length != 0){
                 if(this.nodeList[this.nowId].status == true){
                    return ["node-status", "mdui-icon material-icons", "mdui-text-color-blue"]
                 }else if(this.nodeList[this.nowId].status == false){
                    return ["node-status", "mdui-icon material-icons", "mdui-text-color-yellow"]
                 }else{
                    return ["node-status", "mdui-icon material-icons", "mdui-text-color-red"]
                 }
            }else{
                return ["node-status", "mdui-icon material-icons", "mdui-text-color-red"]
            }
        }
    }
}
</script>

<style scoped>
.nodeselect{
    margin-top: 20px;
}
.node-status{
    margin-left: 10px;
    margin-right: -5px;
}
.select-btn{
    margin-left: 5px;
}
</style>