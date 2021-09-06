const express = require("express");
const cors = require("cors");
const connect = require("./schemas");
const logger = require("morgan");
const dotenv = require('dotenv');

connect();

class App {
  constructor() {
    this.app = express();

    // 뷰엔진 셋팅
    // this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리 추가
    // this.setStatic();

    // 로컬 변수
    // this.setLocals();

    // 라우팅
    this.getRouting();

    // 404 페이지를 찾을수가 없음
    // this.status404();

    // 에러처리
    // this.errorHandler();
  }
  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(cors());
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  getRouting() {
    this.app.use("/api", require("./controllers"));
    this.app.get("/apple", (req, res) => {
      res.status(200).send({
        ok: true,
        result: "success",
      });
    });
  }
}

module.exports = new App().app;
