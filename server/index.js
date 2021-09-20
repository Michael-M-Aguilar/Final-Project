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

app.get('/api/entries', (req, res) => {
  const sql = `
  SELECT
  "entryId",
  "amount",
  "note",
  "location",
  to_char("date", 'Mon DD, YYYY') AS "date"
  FROM "entries"
  order by "entryId" desc
  `;
  db.query(sql)
    .then(result => {
      const userInfo = result.rows;
      res.json(userInfo);
    });
});

app.get('/api/entries/:entryId', (req, res, next) => {
  const entryId = parseInt(req.params.entryId);
  const params = [entryId];
  const sql = `
  SELECT  "categoryId",
  "amount",
  "note",
  "location",
  "date"
  FROM "entries"
  WHERE "entryId" = $1
  `;
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(404).json(`cannot find product with entryId ${entryId}`);
      }
      res.json(result.rows);
    });
});

app.get('/api/transaction', (req, res) => {
  const sql = `
  SELECT
  "entryId",
  "amount",
  "note",
  "location",
  "catName",
  to_char("date", 'Mon DD, YYYY') AS "date"
  FROM "entries"
  JOIN "categories" using ("categoryId")
  order by "date" desc
  `;
  db.query(sql)
    .then(result => {
      const userInfo = result.rows;
      res.json(userInfo);
    });
});

app.post('/api/entries', (req, res) => {
  const { category, amount, note, address, date } = req.body;
  const sql = `
  INSERT INTO "entries" ("userId", "accountId", "categoryId", "amount", "note", "location", "date")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;

  const params = [1, 1, category, -amount, note, address, date];
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

app.delete('/api/entries', (req, res, next) => {
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

app.put('/api/entries/:entryId', (req, res, next) => {
  const { categoryId, amount, note, location, date } = req.body;
  const entryId = parseInt(req.params.entryId);
  const sql = `
  UPDATE "entries"
  SET "userId"= $2,
  "accountId"= $3,
  "categoryId" = $4,
  "amount" = $5,
  "note" = $6,
  "location" = $7,
  "date" = $8
  WHERE "entryId" = $1
  returning *
  `;

  const params = [entryId, 1, 1, categoryId, -amount, note, location, date];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      if (!entry) {
        res.status(404).json({ error: `cannot find entry with entryId ${entryId}` });
      }
      res.status(200).json(req.body);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

app.put('/api/debit/:entryId', (req, res, next) => {
  const { amount, note, date } = req.body;
  const entryId = parseInt(req.params.entryId);
  const sql = `
  UPDATE "entries"
  SET "userId"= $2,
  "accountId"= $3,
  "amount" = $4,
  "note" = $5,
  "date" = $6
  WHERE "entryId" = $1
  returning *
  `;

  const params = [entryId, 1, 3, amount, note, date];
  db.query(sql, params)
    .then(result => {
      const [entry] = result.rows;
      if (!entry) {
        res.status(404).json({ error: `cannot find entry with entryId ${entryId}` });
      }
      res.status(200).json(req.body);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    });
});

app.delete('/api/categories', (req, res, next) => {
  const { categoryId } = req.body;
  const sql = `
  DELETE FROM "categories"
  where "categoryId" = $1
  returning *
  `;
  const params = [categoryId];
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

app.post('/api/debit', (req, res) => {
  const { amount, note, date } = req.body;
  const sql = `
  INSERT INTO "entries" ("userId", "accountId", "categoryId", "amount", "note", "location", "date")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *
  `;

  const params = [1, 3, 9, amount, note, null, date];
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
  WHERE "categoryId" != 9
  `;
  db.query(sql)
    .then(result => {
      const transaction = result.rows;
      res.json(transaction);
    });
});

app.get('/api/account', (req, res) => {
  const sql = `
SELECT
"amount"
  FROM "entries"
  JOIN "accounts" using("accountId")
  where "accountId" = 3
  `;
  db.query(sql)
    .then(result => {
      const debit = result.rows;
      res.json(debit);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
