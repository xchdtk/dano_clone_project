const express = require("express");
const cors = require("cors");
const connect = require("./schemas");
const logger = require("morgan");

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
    this.app.use(require("./controllers"));
  }
}

module.exports = new App().app;
