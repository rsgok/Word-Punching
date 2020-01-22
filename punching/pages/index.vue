<template>
  <div class="container">
    <div class="mainbox">
      <el-row>
        <div class="title">Words Punching</div>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="6">
          <el-input v-model="input" placeholder="Words To Add"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary">Add</el-button>
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
