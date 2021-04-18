const express = require("express");
const router = express.Router();
const path = require("path");
const app = express();
const { PythonShell } = require("python-shell");

let book_cnt = null;
let bookimg = null;
let title = null;
let writer = "조지 오웰";
let publisher = "민음사";
let location = "2층 소설";
let state = "대출 불가";

convertType = (type) => {
  switch (type) {
    case "저자명":
      return "A";
    case "출판사":
      return "P";
    default:
      return "T";
  }
};

putData = (data, index) => {
  let dataindex = index % 6;

  switch (dataindex) {
    case 0:
      bookimg = data;
      break;
    case 1:
      title = data;
      break;
    case 2:
      writer = data;
      break;
    case 3:
      publisher = data;
      break;
    case 4:
      location = data;
      break;
    case 5:
      state = data;
      break;
      deafualt: break;
  }
};

router.get("/", async (req, res, next) => {
  const previous_keyword = req.query.keyword;
  const INPUT = req.query.keyword;
  const TYPE = req.query.option;
  const CONVERTTYPE = convertType(TYPE);
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
      bookCnt = 2;
      let i = 0;
      let j = 0;
      while (res[i] !== undefined) {
        bookCnt += 1;

        for (j = i; j < i + 6; j++) {
          console.log(j);
          console.log(res[j]);
          putData(res[j], j);
        }
        console.log("OUT LOOP");

        i = j;
      }

      console.log(":: END LOOP");
    }
  );
  res.render("search", {
    bookimg: bookimg,
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
