const express = require("express");
const app = express();
const port = 3000;

const router = require("./routes");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middlewares/error-handler");

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.use(errorHandler);

//git commit 정신 나가

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
