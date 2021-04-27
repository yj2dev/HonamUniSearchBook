const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const { PythonShell } = require("python-shell");

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(router);/

let previous_keyword;
let bookcount = null;
let bookimg = [];
let title = [];
let writer = [];
let publisher = [];
let publishYear = [];
let CNO = [];
let isrental = [];
let subCategory = [];

const reset = () => {
  bookcount = null;
  title = [];
  writer = [];
  publisher = [];
  publishYear = [];
  CNO = [];
  bookimg = [];
  isrental = [];
  subCategory = [];
};

const convertType = (type) => {
  switch (type) {
    case "저자명":
      return "A";
    case "출판사":
      return "P";
    default:
      return "T";
  }
};

const putData = (data, index) => {
  let dataindex = index % 8;

  switch (dataindex) {
    case 0:
      title.push(data);
      break;
    case 1:
      writer.push(data);
      break;
    case 2:
      publisher.push(data);
      break;
    case 3:
      publishYear.push(data);
      break;
    case 4:
      CNO.push(data);
      break;
    case 5:
      bookimg.push(data);
      break;
    case 6:
      isrental.push(data);
      break;
    case 7:
      subCategory.push(data);
      break;
      deafualt: break;
  }
};

const draw = (res) => {
  res.render("search", {
    title: title,
    writer: writer,
    publisher: publisher,
    publishYear: publishYear,
    CNO: CNO,
    bookimg: bookimg,
    isrental: isrental,
    subCategory: subCategory,
    previous_keyword: previous_keyword,
    bookcount: {
      value: bookcount,
    },
  });
};
router.get("/postman/:id", async (req, res) => {
  const postCNO = req.params.id;
  const optionCNO = {
    mode: "text",
    pythonPath: "",
    pythonOption: ["-u"],
    scriptPath: "",
    args: [postCNO],
  };
  PythonShell.run(
    path.join(__dirname, "../RentalBook.py"),
    optionCNO,
    (err, res) => {
      if (err) throw err;
      console.log(res);
    }
  );

  res.send("대출불가능 합니다");
});

router.get("/", async (req, res, next) => {
  previous_keyword = req.query.keyword;
  const INPUT = req.query.keyword;
  const TYPE = req.query.option;
  const CONVERTTYPE = convertType(TYPE);
  const PAGES = "1"; // 몇번 페이지를 볼껀지 ( 기본은 1 스크롤 할때마다 1씩 추가/ 만들어야함 )
  console.log("INPUT: ", INPUT);
  console.log("CONVERTTYPE: ", CONVERTTYPE);
  console.log("PAGES:", PAGES);
  const option = {
    mode: "text",
    pythonPath: "",
    pythonOption: ["-u"],
    scriptPath: "",
    args: [INPUT, CONVERTTYPE, PAGES],
  };

  // const processData = () => {
  PythonShell.run(
    path.join(__dirname, "../searchBook.py"),
    option,
    (err, res) => {
      if (err) throw err;
      reset();
      bookcount = 0;
      let i = 0;
      let j = 0;
      if (res[0] !== "NULL") {
        try {
          while (res[i] !== undefined) {
            bookcount += 1;

            for (j = i; j < i + 8; j++) {
              // console.log(j);
              // console.log(res[j]);
              putData(res[j], j);
            }
            // console.log("OUT LOOP");

            i = j;
          }
        } catch (error) {
          console.error(error);
        }
      }
      console.log(":: END LOOP");
      console.log("자료 개수 : ", bookcount);
      return draw(routerResponse);
    }
  );
  // };
  const routerResponse = res;
  // processData();
});

module.exports = router;
