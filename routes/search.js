const express = require("express");
const router = express.Router();
const path = require("path");
const { PythonShell } = require("python-shell");

let book_cnt;
let title = "1984";
let writer = "조지 오웰";
let publisher = "민음사";
let location = "2층 소설";
let state = "대출 불가";

ConvertType = (type) => {
  switch (type) {
    case "저자명":
      return "A";
    case "출판사":
      return "P";
    default:
      return "T";
  }
};

router.get("/", (req, res, next) => {
  const previous_keyword = req.query.keyword;
  const INPUT = req.query.keyword;
  const TYPE = req.query.option;
  const CONVERTTYPE = ConvertType(TYPE);
  console.log("INPUT: ", INPUT);
  console.log("CONVERTTYPE: ", CONVERTTYPE);

  const option = {
    mode: "text",
    pythonPath: "",
    pythonOption: ["-u"],
    scriptPath: "",
    args: [INPUT, CONVERTTYPE],
  };

  PythonShell.run(
    path.join(__dirname, "../BookCheck.py"),
    option,
    (err, res) => {
      if (err) throw err;
      bookCnt = 0;
      let i = 0;
      let j = 0;
      while (res[i] !== undefined) {
        bookCnt += 1;

        for (j = i; j < i + 6; j++) {
          console.log(j);
          console.log(res[j]);
        }
        console.log("OUT LOOP");

        i = j;
      }

      console.log(":: END LOOP");
    }
  );

  res.render("search", {
    title: title,
    writer: writer,
    publisher: publisher,
    location: location,
    state: state,
    previous_keyword: previous_keyword,
    book_cnt: {
      val: book_cnt,
    },
  });
});

module.exports = router;
