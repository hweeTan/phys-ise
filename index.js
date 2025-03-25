const express = require('express'),
  http = require('http'),
  path = require('path'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  cors = require('cors')

const app = express()

const port = process.env.PORT || 8081
app.set('port', port)
app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(cors())
app.use(bodyParser.json())
app.use(methodOverride())
app.use('/media', express.static('store/media'))
app.use('/assets', express.static('public/assets'))

app.use('/api', require('./src/convert/index.js'))
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'public/index.html'))
})

http.createServer(app).listen(port)
console.log('port ' + port)
