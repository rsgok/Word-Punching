<template>
  <div class="container">
    <el-row>
      <el-col :md="{ span: 16, offset: 4 }" :sm="{ span: 20, offset: 2 }" :xs="{ span: 20, offset: 2 }">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Index</el-breadcrumb-item>
          <el-breadcrumb-item>WordList</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card v-for="item in wordlists" :key="item.name" class="box-card">
          <div slot="header" class="clearfix">
            <span>{{item.name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="linkToDetail(item.name)">Detail</el-button>
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
  data() {
    return {
      wordlists: [
        {
          name: 'Toefl Intelligent',
          total: 4200,
          master: 1200,
          timeGt5: 300,
          timeLt5: 500,
          timeZero: 2200,
          isBegin: true
        },
        {
          name: 'Toefl Core',
          total: 2400,
          master: 1200,
          timeGt5: 200,
          timeLt5: 500,
          timeZero: 500,
          isBegin: true
        },
        { name: 'French Core', total: 2300, master: 1200, isBegin: false }
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {},
  methods: {
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
        path: "/wordlist/detail",
        query: {
          wordListName: param
        }
      })
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
</style>
