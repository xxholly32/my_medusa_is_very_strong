<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>数据管理</h1>
        <el-card>

          <div class="toolbar">
            <el-button type="primary" @click='addArticle'>添加</el-button>
          </div>

          <page-table :ref="tableName" :action="action">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期">
              <template scope="scope">
                {{scope.row.date }}
              </template>
            </el-table-column>
            <el-table-column prop="channelNo" label="渠道号">
              <template scope="scope">
                {{scope.row.channelNo }}
              </template>
            </el-table-column>
            <el-table-column prop="channelSname" label="渠道简称">
              <template scope="scope">
                {{scope.row.channelSname }}
              </template>
            </el-table-column>
            <el-table-column prop="new" label="新增">
              <template scope="scope">
                {{scope.row.new }}
              </template>
            </el-table-column>
            <el-table-column prop="mr" label="MR">
              <template scope="scope">
                {{scope.row.mr }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template scope="scope">
                <el-button @click.native.prevent="modifyArticle(scope.row.channelNo)" type="text" size="small">修改</el-button>
                <el-button @click.native.prevent="del(scope.row.channelNo)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </page-table>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import pageTable from '../../components/pageTable'
import Vue from 'vue'

export default {
  components: {
    pageTable
  },

  data () {
    return {
      tableName: 'articleList',
      action: function (params) {
        return Vue.http.post('/service/getDataList', params)
      }
    }
  },

  methods: {
    // 新增文章
    addArticle () {
      this.$router.push({ path: this.$route.path + '/edit' })
    },

    // 编辑文章
    modifyArticle (id) {
      this.$router.push({ path: this.$route.path + '/edit/' + id })
    },

    // 表格组件更新数据
    refreshTable () {
      this.$refs[this.tableName].refresh()
    },

    // 删除操作
    del (ids) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Vue.http.post('/service/del/' + ids)
          .then(res => {
            this.$notify.success({
              message: '删除成功'
            })
            this.refreshTable()
          }).catch(err => {
            this.$notify.error({
              message: '删除失败，请重试'
            })
            console.log(err)
          })
      })
    }
  }
}
</script>

