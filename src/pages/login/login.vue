<template>
  <div class="box">
      <div class="con">
          <h2>登录</h2>
          <div class="int"><el-input v-model="user.username"></el-input></div>
          <div class="int"><el-input v-model="user.password"></el-input></div>
          <div class="int"><button @click="login">登录</button></div>
      </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {requserLogin} from '../../util/request'
export default {
  components:{},
  data(){
    return{
      user:{
        username:'',
        password:''
      }
    }
  },
  methods: {
    ...mapActions({
        requestuserList:'user/requestuserList'
    }),
    login(){
      requserLogin(this.user).then(res=>{
        if(res.data.code == 200){
              this.requestuserList(res.data.list)
              this.$router.push('/index/home')
        } else{
          alert(res.data.msg)
        }
        
      })
      
    }
  },
  mounted() {
    
  },
}
</script>

<style scoped>
.box{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,#563443,#303D60);
}
.con{
  width: 400px;
  height: 300px;
  background-color: #fff;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 10px;
}
.con h2{
  text-align: center;
  padding-top: 20px;
}
.int{
  width: 60%;
  height: 30px;
  margin: 20px auto;
}
input{
  width: 100%;
  height: 30px;
}
button{
  width: 100%;
  height: 35px;
  background-color: #409eff;
  color:#fff;
  outline: none;
  border: none;
}
</style>