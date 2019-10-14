var express = require('express');
var request = require('request');
var crypto = require('crypto');
var multer  = require('multer');
var fs = require('fs');

var router = express.Router();

var pathStore = 'store/media/';
var pathInfo = 'store/data/';
var host = 'http://';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './store/media');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });

function covertVideo(input, output) {
  var Mp4Convert = require('mp4-convert');

  var convert = new Mp4Convert(input, output);
  convert.on('ffprobeCommand', function(cmd) {
      console.log('Command', cmd);
  });
  convert.on('ffprobeOutput', function(json) {
      console.log('ffprobe output');
  });
  convert.on('progress', function(p) {
      console.log('Progress', p);
  });
  convert.on('done', function() {
      console.log('Done');
  });
  convert.start();
}

function createPath(str) {
  // str = crypto.createHash('md5').update(str).digest("hex");
  return pathInfo + str + '.json';
}

router.post('/get-data', function(req, res) {
  var filename = req.body.filename || '51203496',
      pathfs = createPath(filename);
  fs.readFile(pathfs, function(err, data) {
    if (err) {
      res.send({
        error: true,
        message: 'No find data for MSSV !'
      });
    } else {
      res.send(JSON.parse(data));
    }
  });
});

router.get('/get-list-video', function(req, res) {
  fs.readdir(pathStore, function(err, files) {
    if (err) {
      return console.log(err);
    }
    var file = files.map(function(file) {
      if (file.indexOf('.mp4') > -1) {
        return host + req.headers.host + '/media/' + file;
      }
    });
    res.send({file: file});
  });
});

router.post('/save-data', function(req, res) {
  var content = req.body.data || '{"name": "thang"}',
      filename = req.body.filename || '51203496',
      pathfs = createPath(filename);
  fs.writeFile(pathfs, JSON.stringify(content), 'utf8', function(err) {
    if (err) {
      res.send({message: 'Have bugs when save file!'});
      return console.log(err);
    }
    res.send({success: true});
  });
});


router.post('/convert', upload.single('file'), function(req, res){
  var file = req.file,
      filename = file.filename.substring(0, file.filename.lastIndexOf('.')) + '.mp4';
  if (file.filename.indexOf('.mp4') === -1) {
    covertVideo(file.path, pathStore + filename);
    setTimeout(function() {
      res.send({url: host + req.headers.host + '/media/' + filename});
    }, 500);
  } else {
    res.send({url: host + req.headers.host + '/media/' + file.filename});
  }
});

router.get('/get-data-statis', function(req, res) {
  var data = {
    city: [
      {
        id: '1',
        value: '1',
        label: 'HCM',
      },
      {
        id: '2',
        value: '2',
        label: 'HN',
      },
      {
        id: '3',
        value: '3',
        label: 'DN',
      },
      {
        id: '4',
        value: '4',
        label: 'BD',
      },
    ],
    district: [
      {
        cityId: '1',
        options: [
          {
            id: 'd1',
            value: 'd1',
            label: 'Quan 1',
          },
          {
            id: 'd2',
            value: 'd2',
            label: 'Quan 2',
          },
        ],
      },
      {
        cityId: '2',
        options: [
          {
            id: 'd3',
            value: 'd3',
            label: 'Quan 3',
          },
          {
            id: 'd4',
            value: 'd4',
            label: 'Quan 4',
          },
        ],
      },
      {
        cityId: '3',
        options: [
          {
            id: 'd5',
            value: 'd5',
            label: 'Quan 5',
          },
          {
            id: 'd6',
            value: 'd6',
            label: 'Quan 6',
          },
        ],
      },
      {
        cityId: '4',
        options: [
          {
            id: 'd7',
            value: 'd7',
            label: 'Quan 7',
          },
          {
            id: 'd8',
            value: 'd8',
            label: 'Quan 8',
          },
        ],
      }
    ],
    types: [
      {
        id: 't1',
        value: 't1',
        label: 'phong tro',
      },
      {
        id: 't2',
        value: 't2',
        label: 'nha nguyen can',
      },
      {
        id: 't3',
        value: 't3',
        label: 'Can ho chung cu',
      },
      {
        id: 't4',
        value: 't4',
        label: 'Tim nguoi o ghep',
      }
    ],
    price: [
      {
        id: 'p1',
        value: 'p1',
        label: 'duoi 1trieu',
      },
      {
        id: 'p2',
        value: 'p2',
        label: 'tu 1trieu den 2trieu',
      },
      {
        id: 'p3',
        value: 'p3',
        label: 'tu 2trieu den 3trieu',
      },
      {
        id: 'p4',
        value: 'p4',
        label: 'tren 3trieu',
      },
    ],
    size: [
      {
        id: 's1',
        value: 's1',
        label: '10-12m2',
      },
      {
        id: 's2',
        value: 's2',
        label: '12-16m2',
      },
      {
        id: 's3',
        value: 's3',
        label: '16-20m2',
      },
      {
        id: 's4',
        value: 's4',
        label: '>20m2',
      }
    ]
  };
  res.send(data);
});

router.get('/get-post', function(req, res) {
  var data = [
    {
      id: 'p1',
      title: 'phong tro gia re Nguyen Tri Phuong',
      src: 'https://yugo.vn/wp-content/uploads/2017/11/hinh-anh-ngoi-nha-dep-02.png',
      description: 'phong tro gia re Nguyen Tri Phuong',
      price: '1.6tr',
      size: '16m2',
    },
    {
      id: 'p2',
      title: 'phong tro gia re Nguyen Tri Phuong',
      src: 'https://yugo.vn/wp-content/uploads/2017/11/hinh-anh-ngoi-nha-dep-02.png',
      description: 'phong tro gia re Nguyen Tri Phuong',
      price: '1.6tr',
      size: '16m2',
    },
  ];

  res.send(data);
});

module.exports = router;
