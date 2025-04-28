var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  console.log("root url", req.url);
  res.render("index", { title: "Catalog Management Server" });
});

module.exports = router;
