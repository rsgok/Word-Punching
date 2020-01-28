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
          <el-breadcrumb-item :to="{ path: '/wordlist' }">WordList</el-breadcrumb-item>
          <el-breadcrumb-item>{{wordListName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            :total="totalNumber"
            :page-size="limit"
            :current-page="page"
            :disabled="paginationDisabled"
            @current-change="handlePage"
          ></el-pagination>
        </div>
        <el-card class="box-card">
          <el-input v-model="searchtext" size="mini" placeholder="search" />
          <el-table
            :data="tableData.filter(data => searchtext=='' || data.text.toLowerCase().includes(searchtext.toLowerCase()))"
            style="width: 100%"
            size="medium"
          >
            <el-table-column label="Word" prop="text">
              <template slot-scope="scope">
                <!-- <span v-if="scope.row.times>0">{{ scope.row.text }}</span> -->
                <span>{{ scope.row.text }}</span>
                <el-tag
                  size="mini"
                  v-if="scope.row.times"
                  :type="scope.row.is_master===1 ? 'success' : 'danger'"
                  class="tag"
                  effect="dark"
                >{{scope.row.times}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column min-width="150px" align="right" fixed="right" label="Handle">
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.is_master"
                  size="mini"
                  type="primary"
                  @click="handlePunch(scope.$index, scope.row)"
                >Punch</el-button>
                <el-button
                  v-if="!scope.row.is_master"
                  size="mini"
                  type="success"
                  @click="handleMaster(scope.$index, scope.row)"
                >Master</el-button>
                <el-button
                  v-if="scope.row.is_master===1"
                  size="mini"
                  type="success"
                  @click="handleUnMaster(scope.$index, scope.row)"
                >UnMaster</el-button>
                <el-button
                  v-if="wordListName==='mywords'"
                  size="mini"
                  disabled
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            :total="totalNumber"
            :page-size="limit"
            :current-page="page"
            :disabled="paginationDisabled"
            @current-change="handlePage"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  created() {
    //   console.log(this.$route.query.wordListName);
    if (this.$route.query.wordListName == null) {
      this.$router.push({
        path: '/notfound'
      })
    }
    this.wordListName = this.$route.query.wordListName
    this.fetchData(this.wordListName)
  },
  data() {
    return {
      wordListName: null,
      totalNumber: 50,
      page: 1,
      limit: 50,
      paginationDisabled: false,
      tableData: [],
      searchtext: '',
      allData: []
    }
  },
  methods: {
    async fetchData(wordListName) {
      const res = await this.$axios({
        url: '/api/wordlist',
        method: 'post',
        data: {
          wordListName,
          uid: 1
        }
      })
      this.allData = res.data.words
      this.totalNumber = this.allData.length
      this.handlePage(1)
    },
    handlePage(page) {
      console.log('page change to: ', page)

      this.page = page
      const startIndex = (page - 1) * this.limit
      this.tableData = this.allData.slice(startIndex, startIndex + this.limit)
    },
    async handlePunch(index, row) {
      // console.log(index, row)
      const res = await this.$axios({
        url: '/api/word/punch',
        method: 'post',
        data: {
          word: row.text,
          uid: 1
        }
      })
      if (res.status === 200) {
        this.$notify({
          title: 'PUNCH',
          message: ':)'
        })
        this.allData.some((item, index, arr) => {
          if (item.id === row.id) {
            arr[index].times++
            return true
          }
        })
      }
    },
    // TODO 单词删除
    // async handleDelete(index, row) {
    //   console.log(index, row)
    //   const res = await this.$axios({
    //     url: '/api/word/delete',
    //     method: 'post',
    //     data: {
    //       word: row
    //     }
    //   })
    // },
    // updateAllData(word,row) {
    //   for(let i=0;i<allData)
    // },
    async handleMaster(index, row) {
      // console.log(index, row)
      const res = await this.$axios({
        url: '/api/word/master',
        method: 'post',
        data: {
          uid: 1,
          word: row
        }
      })
      if (res.status === 200) {
        this.$notify({
          title: 'Congratulations',
          message: 'on Mastering the new word',
          type: 'success'
        })
        // change the current all data
        this.allData.some((item, index, arr) => {
          if (item.id === row.id) {
            arr[index].is_master = 1
            return true
          }
        })
      }
    },
    async handleUnMaster(index, row) {
      // console.log(index, row)
      const res = await this.$axios({
        url: '/api/word/unmaster',
        method: 'post',
        data: {
          uid: 1,
          word: row
        }
      })
      if (res.status === 200) {
        this.$notify({
          title: 'Success',
          message: 'on UnMastering the word',
          type: 'success'
        })
        // change the current all data
        this.allData.some((item, index, arr) => {
          if (item.id === row.id) {
            arr[index].is_master = 0
            return true
          }
        })
      }
    }
  }

  // TODO 单词搜索逻辑优化
  // watch: {
  //   searchtext(newValue, oldValue) {
  //     if(newValue=='') {
  //       this.handlePage(this.page);
  //       this.totalNumber = this.allData.length;
  //     } else {
  //       this.
  //     }
  //   }
  // }
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
.pagination {
  display: flex;
  direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}
.tag {
  margin-left: 5px;
}
</style>
