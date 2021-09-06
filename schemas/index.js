const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://172.18.0.2/admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
      ignoreUndefined: true,
      user: "xchdtk",
      pass: "xwlstn12",
    })
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
