const http = require("http");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());

const router = require("./routes");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middlewares/error-handler");

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

//수정완료

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
