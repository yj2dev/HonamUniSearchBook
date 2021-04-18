const nunjucks = require("nunjucks");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const router = express.Router();

const indexRouter = require("./routes/index");
const searchRouter = require("./routes/search");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/")));
app.set("port", process.env.PORT || 8004);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use("/", indexRouter);
app.use("/search", searchRouter);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "Port Connected...");
});
