<template>
  <div class="container">
    <el-row>
      <el-col
        :md="{ span: 16, offset: 4 }"
        :sm="{ span: 20, offset: 2 }"
        :xs="{ span: 20, offset: 2 }"
      >
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Index</el-breadcrumb-item>
          <el-breadcrumb-item>WordList</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
          <div>
            <span>My Words (Personally Added)</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="linkToDetail('mywords')"
            >Detail</el-button>
          </div>
        </el-card>
        <el-card v-for="item in wordlists" :key="item.name" class="box-card">
          <div slot="header" class="clearfix">
            <div class="leftside">
              <span>{{computeWordListShowName(item.name)}}</span>
              <el-progress :percentage="item.percentage" v-if="item.isBegin"></el-progress>
            </div>
            <el-button
              class="hidden-md-and-down"
              style="float: right; padding: 3px 0"
              type="text"
              @click="linkToDetail(item.name)"
            >Detail</el-button>
          </div>
          <div>
            <div v-if="item.isBegin == false" class="infotext">Haven't Begun Your Tutorial Yet.</div>
            <div v-else>
              <piechart :chartdata="getChartData(item)" :options="chartOptions" />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import piechart from '../../components/PieChart'
export default {
  components: {
    piechart
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      memory: null,
      // TODO: knowWordLists改为从服务器端获取
      knownWordLists: [
        { name: 'toefl_intelligent', total: 3462, isBegin: true },
        { name: 'toefl_core', total: 2139, isBegin: false }
      ],
      wordListsMap: {},
      wordlists: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  methods: {
    fetchData: async function() {
      const res = await this.$axios({
        url: '/api/wordlist/summarize',
        method: 'post',
        data: {}
      })
      this.memory = res.data.data
      this.processMemory()
    },
    processMemory: function() {
      this.knownWordLists.forEach((wordlist) => {
        const obj = {
          name: wordlist.name,
          total: wordlist.total,
          master: 0,
          timeGt5: 0,
          timeLt5: 0,
          timeZero: 0,
          isBegin: wordlist.isBegin
        }
        this.wordListsMap[wordlist.name] = obj
      })
      this.memory.forEach((item) => {
        const source = item.source
        this.knownWordLists.forEach((wordlist) => {
          const name = wordlist.name
          if (source.includes(name)) {
            if (item.is_master === 1) this.wordListsMap[name].master++
            else if (item.times > 5) this.wordListsMap[name].timeGt5++
            else this.wordListsMap[name].timeLt5++
          }
        })
      })
      // map to array
      for (const x in this.wordListsMap) {
        let item = this.wordListsMap[x]
        // compute timezero
        item.timeZero = item.total - item.master - item.timeGt5 - item.timeLt5
        item.percentage = Math.floor(item.master*100 / item.total);
        this.wordlists.push(item)
      }
    },
    getChartData: (v) => {
      return {
        labels: [
          'Master Words',
          'Time Greater than 5',
          'Time Less Than 5',
          'Never Mem'
        ],
        datasets: [
          {
            backgroundColor: ['#706fd3', '#474787', '#40407a', '#2c2c54'],
            data: [v.master, v.timeGt5, v.timeLt5, v.timeZero]
          }
        ]
      }
    },
    linkToDetail: function(param) {
      this.$router.push({
        path: '/wordlist/detail',
        query: {
          wordListName: param
        }
      })
    },
    computeWordListShowName(v) {
      if (v === 'toefl_intelligent') return 'Toefl Intelligent'
      if (v === 'toefl_core') return 'Toefl Core'
    }
  }
}
</script>
<style scoped>
.container {
  width: 100vw;
  margin-top: 50px;
  margin-bottom: 50px;
}
.box-card {
  margin-top: 30px;
}
.infotext {
  color: #909399;
}
.clearfix {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.leftside {
  width: 300px;
}
</style>
