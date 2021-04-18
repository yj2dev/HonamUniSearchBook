const express = require("express");
const router = express.Router();

const title = "1984";
const writer = "조지 오웰";
const publisher = "민음사";
const date = 2003;
const result_cnt = 2;

router.get("/", (req, res, next) => {
  res.render("search", {
    title: title,
    writer: writer,
    publisher: publisher,
    date: date,
    result_cnt: {
      val: result_cnt,
    },
  });
});

module.exports = router;
