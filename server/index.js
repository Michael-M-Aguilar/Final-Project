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
      // console.log('DB Result', result);
      const userInfo = result.rows;
      // res.json({ test: 'This a test' });
      res.json({ userInfo });
    });

});

// Code in here.
// also need to add JSON middleware.

app.post('/api/entries/', (req, res) => {
  const { userId, accountId, categoryId, amount, note, location } = req.body;
  if (!amount) {
    res.status(400).json({
      error: 'amount is a required field'
    });
    return;
  }
  const sql = `
  INSERT INTO "entries" ("userId", "accountId", "categoryId", "amount", "note", "location")
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `;
  const params = [userId, accountId, categoryId, amount, note, location];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      // console.log(entry);
      res.status(201).json(entry);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
