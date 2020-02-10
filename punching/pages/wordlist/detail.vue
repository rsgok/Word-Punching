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
          <el-input v-model="searchtext" placeholder="search" />
        </el-card>
        <el-card class="box-card">
          <el-table :data="tableData" style="width: 100%" size="medium" :stripe="true">
            <el-table-column label="Times" width="80px">
              <template slot-scope="scope">
                <el-tag
                  size="mini"
                  v-if="scope.row.times"
                  :type="scope.row.is_master===1 ? 'success' : 'danger'"
                  class="tag"
                >{{scope.row.times}}</el-tag>
                <el-tag size="mini" v-else type="info" class="tag">0</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Word" prop="text" width="150px">
              <template slot-scope="scope">
                <el-link :href="basicExternalUrl+scope.row.text" target="_blank">
                  <span>{{ scope.row.text }}</span>
                </el-link>
              </template>
            </el-table-column>
            <el-table-column label="Meaning">
              <template slot-scope="scope">
                <span
                  v-if="scope.row.meaning_show===true"
                  @click="handleMeaningClick(scope.$index)"
                >{{ computeMeaning(scope.row.meaning) }}</span>
                <span v-else @click="handleMeaningClick(scope.$index)">
                  <i class="el-icon-view"></i>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="Handle"
              align="right"
              :width="wordListName==='mywords' ? '200px':'0px'"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.is_master"
                  type="text"
                  @click="handlePunch(scope.$index, scope.row)"
                >Punch</el-button>
                <el-button
                  v-if="!scope.row.is_master"
                  type="text"
                  @click="handleMaster(scope.$index, scope.row)"
                >Master</el-button>
                <el-button
                  v-if="scope.row.is_master===1"
                  type="text"
                  @click="handleUnMaster(scope.$index, scope.row)"
                >UnMaster</el-button>
                <el-button
                  v-if="wordListName==='mywords'"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)"
                ></el-button>
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
    this.getWordListDataNumber(this.wordListName)
  },
  data() {
    return {
      basicExternalUrl: 'http://www.youdao.com/w/eng/',
      wordListName: null,
      totalNumber: 50,
      page: 1,
      limit: 50,
      paginationDisabled: false,
      tableData: [],
      searchtext: ''
    }
  },
  methods: {
    computeMeaning(meaning) {
      const jsonm = JSON.parse(meaning)
      let res = ''
      jsonm.forEach((item) => {
        res = res + ' ' + item
      })
      return res
    },
    handleMeaningClick(index) {
      let item = this.tableData[index]
      item['meaning_show'] = !item['meaning_show']
      this.$set(this.tableData, index, item)
    },
    async getWordListDataNumber(wordListName) {
      const res = await this.$axios({
        url: '/api/wordlist/number',
        method: 'post',
        data: {
          wordListName
        }
      })
      this.totalNumber = res.data.number
      this.handlePage(1)
    },
    async fetchData(startIndex, limit) {
      const wordListName = this.wordListName
      const res = await this.$axios({
        url: '/api/wordlist',
        method: 'post',
        data: {
          wordListName,
          startIndex,
          limit
        }
      })
      this.tableData = res.data.words
      this.tableData.map((item) => {
        item['meaning_show'] = false
        return item
      })
    },
    handlePage(page) {
      this.page = page
      const limit = this.limit
      const startIndex = (page - 1) * limit
      this.fetchData(startIndex, limit)
    },
    async handlePunch(index, row) {
      // console.log(index, row)
      const res = await this.$axios({
        url: '/api/word/punch',
        method: 'post',
        data: {
          word: row.text
        }
      })
      if (res.status === 200) {
        this.$notify({
          title: 'PUNCH',
          message: ':)'
        })
        this.tableData.some((item, index, arr) => {
          if (item.id === row.id) {
            arr[index].times++
            return true
          }
        })
      }
    },
    async handleDelete(index, row) {
      // console.log(index, row)
      const res = await this.$axios({
        url: '/api/word/delete',
        method: 'post',
        data: {
          wordid: row.id
        }
      })
      if (res.status === 200) {
        this.$notify({
          title: 'Deleted'
        })
        this.tableData.some((item, index, arr) => {
          if (item.id === row.id) {
            arr.splice(index, 1)
            return true
          }
        })
        this.handlePage(this.page)
      }
    },
    async handleMaster(index, row) {
      // console.log(index, row)
      const res = await this.$axios({
        url: '/api/word/master',
        method: 'post',
        data: {
          wordid: row.id
        }
      })
      if (res.status === 200) {
        this.$notify({
          title: 'Congratulations',
          message: 'on Mastering the new word',
          type: 'success'
        })
        // change the current all data
        this.tableData.some((item, index, arr) => {
          if (item.id === row.id) {
            arr[index].is_master = 1
            arr[index].times = 1
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
          wordid: row.id
        }
      })
      if (res.status === 200) {
        this.$notify({
          title: 'Success',
          message: 'on UnMastering the word',
          type: 'success'
        })
        // change the current all data
        this.tableData.some((item, index, arr) => {
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
