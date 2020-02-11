<template>
  <div class="container">
    <el-row>
      <el-col :md="{ span: 16, offset: 4 }" :sm="{ span: 20, offset: 2 }">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Index</el-breadcrumb-item>
          <el-breadcrumb-item>Statistics</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs tab-position="left" class="tabs">
          <el-tab-pane label="Calendar">
            <div class="calendarDiv">
              <el-calendar v-model="nowDate">
                <template
                  slot="dateCell"
                  slot-scope="{date, data}">
                  <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
                  </p>
                </template>
              </el-calendar>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Timeline" :lazy="true">
            <div>
              <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                  </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                  <el-card>
                    <h4>更新 Github 模板</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  created() {
    this.fetchData();
  },

  data() {
    return {
      nowDate: new Date(),
      userInfo: null,
      calendarInfo: null
    }
  },
  methods: {
    async fetchData() {
      const res = await this.$axios({
        url: '/api/statistics',
        method: 'post',
        data: {}
      })
      this.userInfo = res.data.userInfo
      this.calendarInfo = res.data.calendarInfo
    }
  }
}
</script>
<style scoped>
.container {
  width: 100vw;
  margin-top: 50px;
}
.tabs {
  margin-top: 50px;
}
.calendarDiv {
  margin-left: 30px;
}
</style>
