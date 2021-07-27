insert into "users"
("firstName", "lastName", "email", "password")
values
  ('Jim', 'Smith', 'jim@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword');

insert into "accounts"
("userId", "type", "description")
  values
    (1, 'Cash', 'Cash'),
    (1, 'Credit', 'Credit'),
    (2, 'Cash', 'Cash'),
    (2, 'Credit', 'Credit'),
    (2, 'Credit', 'Credit'),
    (2, 'Credit', 'Credit'),
    (3, 'Deposit', 'Deposit Note'),
    (4, 'Salary', 'Salary Note');

insert into "categories"
("categoryId", "catName")
  values
  (1, 'Auto'),
  (2, 'Bills'),
  (3, 'Food'),
  (4, 'Gifts'),
  (5, 'Health'),
  (6, 'Pet'),
  (7, 'Shopping'),
  (8, 'Travel');

insert into "entries"
("userId", "accountId", "categoryId", "amount", "note", "location", "date")
  values
    (1, 1, 1, 100.00, 'Jim Deposit', 'N/A', '2021-07-26'),
    (2, 2, 2, 200.00, 'Jane Deposit', 'N/A', '2021-07-26'),
    (1, 1, 3, 100.00, 'Jim Deposit', 'N/A', '2021-07-26'),
    (2, 2, 4, 200.00, 'Jane Deposit', 'N/A', '2021-07-26'),
    (1, 1, 5, 100.00, 'Jim Deposit', 'N/A', '2021-07-26'),
    (2, 2, 6, 200.00, 'Jane Deposit', 'N/A', '2021-07-26'),
    (1, 3, 7, 100.00, 'Jim Deposit', 'N/A', '2021-07-26'),
    (2, 4, 8, 200.00, 'Jane Deposit', 'N/A', '2021-07-26');
