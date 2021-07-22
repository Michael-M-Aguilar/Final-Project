require('dotenv/config');
const express = require('express');
const pg = require('pg');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

// firstEndPoint --> Get Request
app.get('/api/entries', (req, res) => {

  const sql = `
  SELECT
  "userId",
  "amount",
  "note",
  "location",
  "firstName"
  FROM "entries"
  JOIN "users" using ("userId");
  `;
  // no params so no 2nd argumnet needed.
  db.query(sql)
    .then(result => {
      // console.log('DB Result: ', result);
      // console.log('DB Result', result);
      const userInfo = result.rows;
      // res.json({ test: 'This a test' });
      res.json({ userInfo });
    });

});

// Code in here.
// also need to add JSON middleware.

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
