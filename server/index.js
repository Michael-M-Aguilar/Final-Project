require('dotenv/config');
const express = require('express');
// eslint-disable-next-line no-unused-vars
const { restart } = require('nodemon');
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

// Get information necessary for entries to present in body.
app.get('/api/entries', (req, res) => {
  const sql = `
  SELECT
  "entryId",
  "amount",
  "note",
  "date",
  "location"
  FROM "entries"
  JOIN "users" using ("userId")
  order by "entryId" desc
  `;
  // no params so no 2nd argumnet needed.
  db.query(sql)
    .then(result => {
      const userInfo = result.rows;
      res.json(userInfo);
    });
});

// Get request to GET from entries BUT date descend.
app.get('/api/transactions', (req, res) => {
  const sql = `
  SELECT
  "entryId",
  "amount",
  "note",
  "date",
  "location"
  FROM "entries"
  JOIN "users" using ("userId")
  order by "date" desc
  `;
  // no params so no 2nd argumnet needed.
  db.query(sql)
    .then(result => {
      const userInfo = result.rows;
      res.json(userInfo);
    });
});

// To help post credit entries
app.post('/api/entries/', (req, res) => {
  const { category, amount, note, location, date } = req.body;
  const sql = `
  INSERT INTO "entries" ("userId", "accountId", "categoryId", "amount", "note", "location", "date")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;

  const params = [1, 1, category, amount, note, location, date];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.status(201).json(entry);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

// To help delete entries
app.delete('/api/entries/', (req, res, next) => {
  const { entryId } = req.body;
  const sql = `
  DELETE FROM "entries"
  where "entryId" = $1
  returning *
  `;
  const params = [entryId];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

// Serves to only post debit entries.
app.post('/api/debit/', (req, res) => {
  const { amount, note, date } = req.body;
  const sql = `
  INSERT INTO "entries" ("userId", "accountId", "categoryId", "amount", "note", "location", "date")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;

  const params = [1, 3, null, amount, note, null, date];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      res.status(201).json(entry);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

// To get my categories from it's respective table
app.get('/api/categories', (req, res) => {
  const sql = `
  SELECT DISTINCT
  "catName",
  "categoryId"
  FROM "categories"
  ORDER BY "catName";
  `;

  db.query(sql)
    .then(result => {
      const categories = result.rows;
      res.json(categories);
    });
});

// Allows user to add their own categories.
app.post('/api/categories', (req, res) => {
  const { catName } = req.body;
  const sql = `
  INSERT INTO "categories" ("catName")
  VALUES ($1)
  RETURNING *
  `;

  const params = [catName];
  db.query(sql, params)
    .then(result => {
      const [category] = result.rows;
      res.status(201).json(category);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error ocurred'
      });
    });
});

// To get the current budgets from the DB.
app.get('/api/budget', (req, res) => {
  const sql = `
  SELECT "userId",
  "amount",
  "budgetId"
  FROM "budgets"
  ORDER BY "budgetId" desc;
  `;

  db.query(sql)
    .then(result => {
      const budget = result.rows;
      res.json(budget);
    });
});
// To post a new budget onto the page.
app.post('/api/budget', (req, res) => {
  const { budget } = req.body;
  const sql = `
  INSERT INTO "budgets" ("userId", "amount")
  VALUES ($1, $2)
  RETURNING *
  `;

  const params = [1, budget];
  db.query(sql, params)
    .then(result => {
      const [budget] = result.rows;
      res.status(201).json(budget);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error ocurred'
      });
    });
});

app.get('/api/chart', (req, res) => {
  const sql = `
  SELECT
  "amount",
  "catName"
  FROM "entries"
  JOIN "categories" using ("categoryId")
  `;
  db.query(sql)
    .then(result => {
      const transaction = result.rows;
      res.json(transaction);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
