const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookie = require("cookie-parser");
const morgan = require("morgan");

const app = express();
app.use(bodyParser.json());
app.use(cookie());
app.use(morgan('dev'))
app.use(express.static(path.join("public")));



app.listen(port, () => {
  console.log('listening on port', port)
})
