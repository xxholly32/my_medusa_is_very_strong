var express = require('express')
const fs = require('fs')
const thunk = require('thunks')()
var path = require('path')
const co = require('co')

var router = express.Router()

router.post('/signin', function (req, res) {
  let username = req.body.username
  let password = req.body.password
  if (username === 'admin' && password === 'mymedusaisvarystrong') {
    res.send({
      type: 'success',
      username: 'admin'
    })
  } else if (password === username + '12345') {
    res.send({
      type: 'success',
      username: 'admin'
    })
  } else {
    res.send({
      type: 'error',
      message: '用户名密码错误'
    })
  }
})

router.post('/getDatalist', function (req, res) {
  let pageSize = req.body.pageSize
  let pageNo = req.body.pageNo
  let startNo = pageSize * (pageNo - 1)

  const fsReadFile = thunk.thunkify(fs.readFile)
  let filepath = path.join(__dirname, '../../json/data.json')

  co(function* () {
    let data = yield fsReadFile(filepath)
    let list = JSON.parse(data.toString()).list
    let length = list.length

    list = list.slice(startNo, startNo + 10)

    res.send({
      code: 0,
      rows: list,
      success: true,
      total: length
    })
  })
})

router.post('/getData/:channelNo', function (req, res) {
  let channelNo = req.params.channelNo
  const fsReadFile = thunk.thunkify(fs.readFile)
  let filepath = path.join(__dirname, '../../json/data.json')

  co(function* () {
    let data = yield fsReadFile(filepath)
    let list = JSON.parse(data.toString()).list
    let rowData = list.find((obj) => obj.channelNo === channelNo)

    res.send(rowData)
  })
})

router.post('/saveData', function (req, res) {
  let channel = req.body
  const fsReadFile = thunk.thunkify(fs.readFile)
  let filepath = path.join(__dirname, '../../json/data.json')

  co(function* () {
    let data = yield fsReadFile(filepath)
    let list = JSON.parse(data.toString()).list
    let index = list.findIndex((obj) => obj.channelNo === channel.channelNo)

    if (index > -1) {
      list[index] = channel
    } else {
      list.splice(0, 0, channel)
    }

    res.send({
      type: 'success'
    })

    // 序列化
    var destString = JSON.stringify({ list: list })

    // 写入文件
    fs.writeFile(filepath, destString)
  })
})

router.post('/del/:channelNo', function (req, res) {
  let channelNo = req.params.channelNo
  const fsReadFile = thunk.thunkify(fs.readFile)
  let filepath = path.join(__dirname, '../../json/data.json')

  co(function* () {
    let data = yield fsReadFile(filepath)
    let list = JSON.parse(data.toString()).list
    let index = list.findIndex((obj) => obj.channelNo === channelNo)

    list.splice(index, 1)

    res.send({
      type: 'success'
    })

    // 序列化
    var destString = JSON.stringify({ list: list })

    // 写入文件
    fs.writeFile(filepath, destString)
  })
})

module.exports = router
