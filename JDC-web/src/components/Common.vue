<script>
const urlList= []
const baseUrl= ""
const cid= ""
const nodeName=""
const loginStatus= false
const cookieStatus= false


function loginSuccess(ccid){
    this.cid =ccid
    this.cookieStatus= true
    this.loginStatus= true
    
    //设置本地储存
    localStorage.setItem("cid", ccid)
    localStorage.setItem("baseUrl", this.baseUrl)
    localStorage.setItem("nodeName", this.nodeName)
}

export default {
    urlList,
    baseUrl,
    cid,
    loginStatus,
    cookieStatus,
    loginSuccess,
    nodeName
}
</script>