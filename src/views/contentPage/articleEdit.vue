<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>{{pageTitle}}</h1>
        <el-card>
          <el-form :model="channel" :rules="rules" :ref="formName">
            <el-form-item prop="channelNo">
              <el-input v-model="channel.channelNo" placeholder="请输入渠道号"></el-input>
            </el-form-item>
            <el-form-item label="选择日期">
              <el-col :span="11">
                <el-date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" v-model="channel.date" style="width: 200px"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item prop="channelSname">
              <el-input v-model="channel.channelSname" placeholder="请输入渠道简称"></el-input>
            </el-form-item>
            <el-form-item prop="new">
              <el-input v-model="channel.new" placeholder="请输入新增"></el-input>
            </el-form-item>
            <el-form-item prop="mrnew">
              <el-input v-model="channel.mr" placeholder="请输入mr"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()">保存</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Vue from 'vue'
import moment from 'moment'

export default {
  name: 'editor',
  data () {
    return {
      pageTitle: '编辑',

      formName: 'channel',

      // 文章信息
      channel: {
        date: '',
        channelNo: '',
        channelSname: '',
        new: '',
        mr: ''
      },

      // 校验规则
      rules: {
        channelNo: [{
          required: true,
          message: '请输入渠道号',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 初始化数据
    initModify () {
      Vue.http.post('/service/getData/' + this.$route.params.id)
        .then(res => {
          this.channel = res.data
        }).catch(err => {
          this.$notify.error({
            message: err
          })
        })
    },

    // 提交保存
    submit () {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          // 待修改 xx
          var channel = this.channel
          channel.date = moment(channel.date).format('YYYY/MM/DD')
          Vue.http.post('/service/saveData', channel)
            .then(res => {
              this.$notify.success({
                message: '保存成功'
              })
              this.$router.go(-1)
            }).catch(err => {
              this.$notify.error({
                message: '保存失败，请重试'
              })
              console.log(err)
            })
        } else {
          this.$notify.error({
            message: '请输入标题'
          })
          return false
        }
      })
    }
  },

  mounted () {
    this.pageTitle = this.$route.params.id ? '编辑' : '新增'

    if (this.$route.params.id) {
      this.initModify()
    }
  }
}
</script>
