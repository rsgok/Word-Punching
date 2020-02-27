<template>
  <div class="container">
    <div class="mainbox">
      <el-row>
        <el-col
          :md="{ span: 6, offset: 9 }"
          :sm="{ span: 12, offset: 5 }"
          :xs="{ span: 20, offset: 2 }"
        >
          <el-card shadow="never">
            <div class="loginbox">
              <div class="loginText">Word Punching</div>
              <el-tabs type="card" v-model="activeName">
                <el-tab-pane label="Login" name="login">
                  <el-input v-model="login.uname" placeholder="Username" class="inputbox"></el-input>
                  <el-input
                    v-model="login.upassword"
                    placeholder="Password"
                    class="inputbox"
                    show-password
                  ></el-input>
                  <el-button type="primary" @click="handleLogin" class="btnbox">Login</el-button>
                </el-tab-pane>
                <el-tab-pane label="Register" name="register">
                  <el-input v-model="register.uname" placeholder="Username" class="inputbox"></el-input>
                  <el-input
                    v-model="register.upassword"
                    placeholder="Password"
                    class="inputbox"
                    show-password
                  ></el-input>
                  <el-input v-model="register.code" placeholder="Invite Code" class="inputbox"></el-input>
                  <el-button type="primary" @click="handleRegister" class="btnbox">Register</el-button>
                </el-tab-pane>
              </el-tabs>
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
      login: {
        uname: '',
        upassword: ''
      },
      register: {
        uname: '',
        upassword: '',
        code: ''
      },
      activeName: 'login'
    }
  },
  methods: {
    handleLogin() {
      const username = this.login.uname
      const password = this.login.upassword
      this.$auth
        .loginWith('local', {
          data: {
            username,
            password
          }
        })
        .catch((e) => {
          this.$message.error('Login Fail')
        })
    },
    async handleRegister() {
      const username = this.register.uname
      const password = this.register.upassword
      const inviteCode = this.register.code
      const res = await this.$axios({
        url: '/api/auth/register',
        method: 'post',
        data: {
          username,
          password,
          inviteCode
        }
      })
      if(res.data.code===200) {
        this.$message.success(res.data.msg);
        this.activeName = 'login'
      } else {
        this.$message.error(res.data.msg);
      }
    }
  }
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: url('http://qiniustorage.joyinn.top/RavenWolf.jpg') center center
    no-repeat;
  width: 100vw;
  height: 100vh;
}
.mainbox {
  width: 100vw;
  margin-top: 100px;
}
.loginbox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.loginText {
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 10px;
}
.el-button {
  width: 100%;
}
.inputbox {
  margin-bottom: 10px;
}
</style>