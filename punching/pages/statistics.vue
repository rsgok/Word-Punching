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
              <client-only>
              <el-calendar v-model="nowDate">
                <template slot="dateCell" slot-scope="{date, data}">
                  <p>{{ computeDay(data.day) }} {{ computePunch(data.day) ? '✔️' : ''}}</p>
                </template>
              </el-calendar>
              </client-only>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Timeline" :lazy="true">
            <div>
              <el-timeline>
                <el-timeline-item
                  v-for="item in calendarInfo"
                  :key="item.id"
                  :timestamp="computeDistance(item.rtime)"
                  placement="top"
                >
                  <el-card>
                    <h4>Mastered Words</h4>
                    <div>
                      <el-tag
                        v-for="(item, index) in computeSplit(item.master_words)"
                        :key="index"
                      >{{item}}</el-tag>
                    </div>
                    <h4>Punched Words</h4>
                    <div>
                      <el-tag
                        v-for="(item, index) in computeSplit(item.punch_words)"
                        :key="index"
                      >{{item}}</el-tag>
                    </div>
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
import { isSameDay, isAfter, formatDistance } from 'date-fns'
export default {
  created() {
    this.fetchData()
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
    },
    computeSplit(str) {
      return str.split(',')
    },
    computeDistance(v) {
      return formatDistance(new Date(v), this.nowDate)
    },
    computeDay(day) {
      return new Date(day).getDate()
    },
    computePunch(day) {
      if (this.calendarInfo === null) return false
      const curDate = new Date(day)
      if (isAfter(curDate, this.nowDate)) return false

      for (const item of this.calendarInfo) {
        const d = new Date(item.rtime)
        if (isSameDay(curDate, d)) return true
        if (isAfter(d, curDate)) return false
      }
      return false
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
.el-tag {
  margin-right: 10px !important;
  margin-top: 5px !important;
}
</style>
