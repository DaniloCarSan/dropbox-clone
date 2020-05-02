var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = './';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file',(req,res)=>{

  path = path+req.query.path;

  if(fs.existsSync(path))
  {
    fs.readFile(path,(err,data)=>{
      if(err)
      {
        console.error(err);
        res.status(400).json({
          error:err
        });
      }
      else
      {
        res.status(200).end(data);
      }
    });
  }
  else
  {
     res.status(404).json({
       error:'File not found'
     });
  }

});

router.delete('/file',(req,res)=>{

  let form = new formidable.IncomingForm({
    uploadDir:'./upload',
    keepExtensions:true,
    multiples:true,
  });

  form.parse(req,(err,fields,files)=>{

    if(fs.existsSync(path+fields.path))
    {
      fs.unlink(path+fields.path,err=>{
        if(err)
        {
          res.status(400).json({
            err
          });
        }
        else
        {
          res.json({fields});
        }
      }); 
    }
    else
    {
      res.status(404).json({
        error:'File not found'
      });
    }

  });
});

router.post('/upload', function(req, res) {

  let form = new formidable.IncomingForm({
    uploadDir:'./upload',
    keepExtensions:true,
    multiples:true,
  });

  form.parse(req,(err,fields,files)=>{

    res.json({
      files
    });

  });

});



module.exports = router;
