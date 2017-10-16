const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cookie = require("cookie-parser");
const morgan = require("morgan");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}



const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(cookie());
app.use(morgan('dev'))
app.use(express.static(path.join("public")));

const users = require('./routes/users');
app.use(users);


app.use((req, res) => {
  res.sendStatus(404);
});

// Handle Boom errors
app.use((err, _req, res, _next) => {
  console.log('boom error!')
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('listening on port', port)
})
