const express = require('express')
const multer = require('multer')
const fs = require('fs')

const router = express.Router()

const pathStore = 'store/media/'
const pathInfo = 'store/data/'
const host = 'http://'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './store/media')
  },
  filename(req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

function covertVideo(input, output) {
  const Mp4Convert = require('mp4-convert')

  const convert = new Mp4Convert(input, output)
  convert.on('ffprobeCommand', function (cmd) {
    console.log('Command', cmd)
  })
  convert.on('ffprobeOutput', function (json) {
    console.log('ffprobe output')
  })
  convert.on('progress', function (p) {
    console.log('Progress', p)
  })
  convert.on('done', function () {
    console.log('Done')
  })
  convert.start()
}

function createPath(str) {
  return pathInfo + str + '.json'
}

router.post('/get-data', function (req, res) {
  const filename = req.body.filename || '51203496',
    pathfs = createPath(filename)
  fs.readFile(pathfs, function (err, data) {
    if (err) {
      res.send({
        error: true,
        message: 'Cannot find data for MSSV!',
      })
    } else {
      res.send(JSON.parse(data))
    }
  })
})

router.get('/get-list-video', async (req, res) => {
  fs.readdir(pathStore, function (err, files) {
    if (err) {
      return console.log(err)
    }
    const file = files.map(function (file) {
      if (file.indexOf('.mp4') > -1) {
        return host + req.headers.host + '/media/' + file
      }
    })
    res.send({ file: file })
  })
})

router.post('/save-data', function (req, res) {
  const content = req.body.data || '{"name": "thang"}',
    filename = req.body.filename || '51203496',
    pathfs = createPath(filename)
  fs.writeFile(pathfs, JSON.stringify(content), 'utf8', function (err) {
    if (err) {
      res.send({ message: 'Errors saving file!' })
      return console.log(err)
    }
    res.send({ success: true })
  })
})

router.post('/convert', upload.single('file'), function (req, res) {
  const file = req.file,
    filename =
      file.filename.substring(0, file.filename.lastIndexOf('.')) + '.mp4'
  if (file.filename.indexOf('.mp4') === -1) {
    covertVideo(file.path, pathStore + filename)
    setTimeout(function () {
      res.send({ url: host + req.headers.host + '/media/' + filename })
    }, 500)
  } else {
    res.send({ url: host + req.headers.host + '/media/' + file.filename })
  }
})

module.exports = router
