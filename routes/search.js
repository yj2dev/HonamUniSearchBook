const express = require("express");
const router = express.Router();
const path = require("path");
const { PythonShell } = require("python-shell");

let previous_keyword;
let bookcount = null;
let bookimg = [];
let title = [];
let writer = [];
let publisher = [];
let location = [];
let state = [];

const reset = () => {
  bookcount = null;
  bookimg = [];
  title = [];
  writer = [];
  publisher = [];
  location = [];
  state = [];
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
  let dataindex = index % 6;

  switch (dataindex) {
    case 0:
      bookimg.push(data);
      break;
    case 1:
      title.push(data);
      break;
    case 2:
      writer.push(data);
      break;
    case 3:
      publisher.push(data);
      break;
    case 4:
      location.push(data);
      break;
    case 5:
      state.push(data);
      break;
      deafualt: break;
  }
};

const draw = (res) => {
  res.render("search", {
    bookimg: bookimg,
    title: title,
    writer: writer,
    publisher: publisher,
    location: location,
    state: state,
    previous_keyword: previous_keyword,
    bookcount: {
      value: bookcount,
    },
  });
};
router.get("/", async (req, res, next) => {
  previous_keyword = req.query.keyword;
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

  // const processData = () => {
  PythonShell.run(
    path.join(__dirname, "../BookCheck.py"),
    option,
    (err, res) => {
      if (err) throw err;
      reset();
      bookcount = 0;
      let i = 0;
      let j = 0;
      if (res !== "NULL") {
        try {
          while (res[i] !== undefined) {
            bookcount += 1;

            for (j = i; j < i + 6; j++) {
              console.log(j);
              console.log(res[j]);
              putData(res[j], j);
            }
            console.log("OUT LOOP");

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
