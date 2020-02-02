<template>
  <div class="container">
    <div class="mainbox">
      <!-- TODO 动态适应样式-->
      <el-row>
        <el-col :span="6" :offset="18">
          <div>
            <el-button type="text" @click="handleUnlogin">unlogin</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <div class="title">Words Punching</div>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="6">
          <el-input v-model="input" placeholder="Input Word To Punch"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="handlePunch">Punch</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="10">
          <div class="btn-links">
            <nuxt-link to="/statistics">
              <el-button type="text">Statistics</el-button>
            </nuxt-link>
            <nuxt-link to="/wordlist">
              <el-button type="text">WordList</el-button>
            </nuxt-link>
          </div>
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
    async handleUnlogin() {
      await this.$auth.logout();
    },
    async handleMark(val) {
      await console.log("handle mark");
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
        ]),
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
  align-items: center;
  text-align: center;
}
.mainbox {
  width: 100vw;
}
.title {
  font-size: 60px;
  margin-bottom: 80px;
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
</style>
