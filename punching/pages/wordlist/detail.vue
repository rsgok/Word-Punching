<template>
  <div class="container">
    <el-row>
      <el-col :md="{ span: 16, offset: 4 }" :sm="{ span: 20, offset: 2 }" :xs="{ span: 20, offset: 2 }">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">Index</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/wordlist' }">WordList</el-breadcrumb-item>
          <el-breadcrumb-item>{{wordListName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
          <el-table
            :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%"
          >
            <el-table-column label="Date" prop="date"></el-table-column>
            <el-table-column label="Name" prop="name"></el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  created() {
    //   console.log(this.$route.query.wordListName);
    if(this.$route.query.wordListName == null) {
        this.$router.push({
            path: "/notfound",
        })
    }
    this.wordListName = this.$route.query.wordListName;
    this.fetchData();
  },
  data() {
    return {
      wordListName: null,
      tableData: [
        {
          date: '2016-05-02',
          name: 'word',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: 'english',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: 'Goodboy',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: 'what do you mean',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      search: ''
    }
  },
  methods: {
    async fetchData() {
        const res = await axios.get('http://localhost:3000/api/wordlist');
        console.log(res);
        
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
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
