require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

// firstEndPoint --> Get Request
app.get('/api/entries', (req, res) => {

  // const sql = `
  // SELECT
  // "todoId",
  // "name",
  // "details",
  // "firstName"
  // FROM "todos"
  // JOIN "users" using ("userId");
  // `;
  // // no params so no 2nd argumnet needed.
  // db.query(sql)
  //   .then(result => {
  //     // console.log('DB Result: ', result);
  //     const todos = result.rows;
  //     // res.json({ test: 'This a test' });
  //     res.json({ todos });
  //   });

});

// Code in here.
// also need to add JSON middleware.

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
