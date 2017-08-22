<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" @select="handleSelect" @selection-change="handleSelectChange" @select-all="handleSelectAll">
      <slot></slot>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['action'],

  data () {
    return {
      pageSize: 10,
      pageNo: 1,
      tableData: [],
      total: 0
    }
  },

  watch: {
    'pageSize': 'getData',
    'pageNo': 'getData'
  },

  methods: {
    // 事件透传
    handleSelect (selection, row) {
      this.$emit('select', selection, row)
    },

    // 事件透传
    handleSelectAll (selection) {
      this.$emit('select-all', selection)
    },

    // 事件透传
    handleSelectChange (val) {
      this.$emit('select-change', val)
    },

    // 每页显示条数修改
    handleSizeChange (val) {
      this.pageSize = val
    },

    // 页码变更
    handleCurrentChange (val) {
      this.pageNo = val
    },

    // 请求列表数据
    getData (pageNo) {
      this.action({
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }).then((res) => {
        if (res.data.success) {
          this.tableData = res.data.rows
          this.total = res.data.total
        } else {
          this.$message.error(res.data.message)
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },

    // 刷新列表数据
    refresh () {
      this.pageNo === 1 ? this.getData() : (this.pageNo = 1)
    }
  },

  mounted () {
    this.refresh()
  }
}
</script>
