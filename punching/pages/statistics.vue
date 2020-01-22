<template>
  <div class="container">
    <el-row>
      <el-col :md="{ span: 16, offset: 4 }" :sm="{ span: 20, offset: 2 }">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Index</el-breadcrumb-item>
          <el-breadcrumb-item>Statistics</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
        </el-card>
        <el-card class="box-card">
          <Chart/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Chart from '../components/Chart'
export default {
  components: {
    Chart
  },
  data() {
    return {}
  },
  methods: {
  }
}
</script>
<style scoped>
.container {
  width: 100vw;
  margin-top: 50px;
}
.box-card {
  margin-top: 30px;
}
</style>
