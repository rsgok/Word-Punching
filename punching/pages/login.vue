<template>
  <div class="container">
    <div class="mainbox">
      <el-row>
        <el-col 
        :md="{ span: 6, offset: 9 }"
        :sm="{ span: 12, offset: 5 }"
        :xs="{ span: 20, offset: 2 }">
          <el-card shadow="never">
            <div class="loginbox">
              <div class="loginText">Word Punching</div>
              <el-input v-model="uname" placeholder="user name"></el-input>
              <el-input v-model="upassword" placeholder="user password"></el-input>
              <el-button type="primary" @click="handleLogin">Login</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  auth: 'guest',
  data() {
    return {
      uname: '',
      upassword: ''
    }
  },
  methods: {
    handleLogin() {
      console.log('login')
      const username = this.uname;
      const password = this.upassword;
      this.$auth.loginWith('local', {
        data: {
          username,
          password
        }
      }).catch(e => {
        // console.log(e);
        this.$message.error('login fail');
      })
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: url('http://q4pjcl3ln.bkt.clouddn.com/RavenWolf.jpg') center
    center no-repeat;
  width: 100vw;
  height: 100vh;
}
.mainbox {
  width: 100vw;
}
.loginbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50vh;
}
.loginText {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 50px;
}
.el-button {
  width: 100%;
}
</style>