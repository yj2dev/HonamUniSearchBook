const { info } = require("console");
const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const { PythonShell } = require("python-shell");

let previous_keyword;
let previous_type;
let resultCNO = null;
let bookcount = null;
let bookimg = [];
let title = [];
let writer = [];
let publisher = [];
let publishYear = [];
let CNO = [];
let isrental = [];
let subCategory = [];
let pagingArr = [];
let totalPages = 0;
let currentPage = 1;
let PAGES = 1;

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
  totalPages = 0;
  currentPage = 1;
  pagingArr = [];
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
  let dataindex = index % 10;

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
    case 8:
      totalPages = data;
      break;
    case 9:
      currentPage = data;
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
    totalPages: totalPages,
    currentPage: currentPage,
    previous_keyword: previous_keyword,
    previous_type: previous_type,
    pagingArr: pagingArr,
    bookcount: {
      value: bookcount,
    },
  });
};

const resetCNO = () => {
  resultCNO = null;
};

const drawCNO = (res, info) => {
  let bb = 0;
  res.write(
    "<table>                \
              <tr>                  \
                <th>현황</th>       \
                <th>위치</th>       \
                <th>대출자</th>     \
                <th>반납예정일</th> \
              </tr>"
  );

  for (let aa = 0; aa <= info.length / 4; aa++) {
    res.write("<tr>");
    for (; bb < aa * 4; bb++) {
      res.write(`<td>${info[bb]}</td>`);
    }
    res.write("</tr>");
  }
  res.end();
};

const distribute = (total, current) => {
  const pagingCnt = 5;
  const half = Math.floor(pagingCnt / 2);
  const arr = [];
  let L = current - half;
  let R = current + half;
  console.log("half: ", half);
  console.log("L, R: ", L, R);
  console.log("ARR: ", arr);
  console.log("total: ", total, "current: ", current);

  if (L < 1) {
    R += Math.abs(L) + 1;
    L = 1;
  }

  if (R > total) {
    L -= R - total;
    R = total;
  }
  console.log("L, R: ", L, R);
  for (let i = L; i <= R; i++) {
    arr.push(i);
  }
  console.log("ARR: ", arr);
  return arr;
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
      resultCNO = res;
      for (let i = 0; i < res.length; i++) {
        console.log(res[i]);
      }
      drawCNO(resCNO, res);
    }
  );
  const resCNO = res;
  console.log("resultCNO: ", resultCNO);
  resetCNO();
});

router.get("/", async (req, res, next) => {
  previous_keyword = req.query.keyword;
  previous_type = req.query.option;
  PAGES = req.query.page;
  const INPUT = req.query.keyword;
  const TYPE = req.query.option;
  const CONVERTTYPE = convertType(TYPE);
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
            for (j = i; j < i + 10; j++) {
              putData(res[j], j);
            }
            i = j;
          }
        } catch (error) {
          console.error(error);
        }
      }
      console.log(":: END LOOP");
      console.log("자료 개수 : ", bookcount);
      console.log("totalPages: ", totalPages);
      console.log("PAGES: ", PAGES);

      pagingArr = distribute(totalPages, PAGES);
      console.log("pagingArr: ", pagingArr);
      return draw(routerResponse);
    }
  );
  const routerResponse = res;
});

module.exports = router;
