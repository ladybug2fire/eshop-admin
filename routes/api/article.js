var Article = require("../../models/article.js");
var express = require("express");
var router = express.Router();
var _ = require("lodash");
var multer = require("multer");

var upload = multer({ dest: "uploads/img/" });

router.get("/", function(req, res) {
  Article.find().sort({"_id":-1}).exec(function(err, docs) {
    if (err) {
      res.json({
        code: 500,
        msg: "错误"
      });
    } else {
      res.json({
        code: 200,
        data: docs
      });
    }
  });
});

router.post("/upload", upload.single("file"), function(req, res, next) {
  let obj = req.file;
  res.json({
    code: 200,
    msg: "success",
    data: "/img/" + obj.filename
  });
});

router.post("/add", function(req, res) {
  Article.find({ title: req.body.title }, function(err, result) {
    if (result.length) {
      res.json({
        code: 500,
        msg: "该菜名已经被占用"
      });
    } else {
      var jsonObj = _.assign(
        _.pick(req.body, [
          "title",
          "detail",
          "picUrl",
          "username",
          "userid",
          "desc",
        ]),
        {
          addTime: new Date().toLocaleString()
        }
      );
      console.log("req.body", jsonObj);

      var article = new Article(jsonObj);
      article.save(function(err, result) {
        if (err) {
          console.log("Error:" + err);
          res.json({
            code: 500,
            msg: err
          });
        } else {
          res.json({
            code: 200,
            msg: "添加成功"
          });
        }
      });
    }
  });
});

router.get("/delete", function(req, res) {
  Article.findByIdAndRemove(req.query.id, (err, result) => {
    if (err) {
      res.json({
        code: 500,
        msg: "异常"
      });
    } else {
      res.json({
        code: 200,
        msg: "删除成功"
      });
    }
  });
});

router.get("/get", function(req, res) {
  Article.findById(req.query.id, function(err, result) {
      console.log(req.query.id)
    if (err) {
        res.json({
          code: 500,
          msg: "异常"
        });
      } else {
        res.json({
          code: 200,
          data: result
        });
      }
  });
});

router.get("/search", function(req, res) {
  let tag = req.query.tag;
  if(!tag){
    res.json({
      code: 500,
      msg: "条件为空"
    }); 
  }
  Article.find().or([{title: {$regex:tag, $options: 'i'}},{username: {$regex: tag, $options:'i'}}]).exec(function(err, result) {
      console.log(req.query.id)
    if (err) {
        res.json({
          code: 500,
          msg: "异常"
        });
      } else {
        res.json({
          code: 200,
          data: result
        });
      }
  });
});

module.exports = router;
