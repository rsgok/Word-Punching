<template>
  <div class="container">
    <div class="mainbox">
      <!-- TODO 动态适应样式-->
      <el-row>
        <el-col
          :md="{ span: 8, offset: 10 }"
          :sm="{ span: 8, offset: 15 }"
          :xs="{ span: 8, offset: 15 }"
        >
          <div class="header">
            <el-dropdown @command="handleDropdownCommand"
            size="medium" split-button>
              {{$auth.user.uname}}
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="gotoStatistics">Statistics</el-dropdown-item>
                <el-dropdown-item command="gotoWordList">WordList</el-dropdown-item>
                <el-dropdown-item divided command="handleUnlogin">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="title">Word Punching</div>
      </el-row>
      <el-row>
        <el-col
          :md="{ span: 10, offset: 6 }"
          :sm="{ span: 16, offset: 1 }"
          :xs="{ span: 16, offset: 1 }"
        >
          <el-input v-model="input" placeholder="Input Word To Punch"></el-input>
        </el-col>
        <el-col
          :md="{ span: 2, offset: 0 }"
          :sm="{ span: 2, offset: 1 }"
          :xs="{ span: 2, offset: 1 }"
        >
          <el-button type="primary" @click="handlePunch">Punch</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      input: ''
    }
  },
  methods: {
    handleDropdownCommand(command) {
      if(command === "gotoStatistics") this.gotoStatistics();
      else if(command === "gotoWordList") this.gotoWordList();
      else if(command === "handleUnlogin") this.handleUnlogin();
    },
    gotoStatistics() {
      this.$router.push({
        path: '/statistics'
      })
    },
    gotoWordList() {
      this.$router.push({
        path: '/wordlist'
      })
    },
    async handleUnlogin() {
      await this.$auth.logout()
      this.$router.push({
        path: '/login'
      })
    },
    async handleMark(val) {
      await console.log('handle mark')
    },
    async handlePunch() {
      const word = this.input
      // TODO 检查word的合法性
      if (word === '') {
        this.$message({
          message: 'word not valid',
          center: true
        })
        return
      }
      // do punch post
      const res = await this.$axios({
        url: '/api/word/punch',
        method: 'post',
        data: {
          word,
          uid: 1
        }
      })
      const { detail } = res.data
      // success info
      const h = this.$createElement
      this.$notify({
        title: 'Success',
        message: h('p', null, [
          'Punch the word ',
          h('el-tag', null, detail.text),
          ' successfully!'
        ])
        // TODO 主页快速master单词
        // onClose: () => {
        //   // if times>=5
        //   if (detail.times >= 5) {
        //     this.$notify({
        //       title: 'Tip',
        //       dangerouslyUseHTMLString: true,
        //       message: h('p', null, [
        //         'You have memorized ',
        //         h('el-tag', { effect: 'dark' }, detail.text),
        //         h(
        //           'p',
        //           null,
        //           ' ' + detail.times + ' times. Maybe you want to mark it as '
        //         ),
        //         h(
        //           'el-button',
        //           {
        //             attr:{
        //               type: 'text',
        //             },
        //             on: {
        //               click: function() {
        //                 this.handleMark("val")
        //               }
        //             }
        //           },
        //           'Masterd'
        //         )
        //       ]),
        //       duration: 5000
        //     })
        //   }
        // }
      })
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
}
.mainbox {
  width: 100vw;
}
.title {
  font-size: 60px;
  margin-bottom: 60px;
  word-wrap: break-word;
}
.input-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.btn-links {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
}
.header {
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>
