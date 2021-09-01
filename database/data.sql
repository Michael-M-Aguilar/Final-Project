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
    (3, 'Deposit/Salary', 'Deposit Note'),
    (3, 'Deposit/Salary', 'Salary Note');

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
  (8, 'Travel'),
  (9, 'Income');

insert into "entries"
("userId", "accountId", "categoryId", "amount", "note", "location", "date")
  values
    (1, 1, 3, -5.62, 'Chai Tea', 'Starbucks', '2021-07-05'),
    (2, 2, 3, -6.38, 'Boba', 'Ding Tea', '2021-07-08'),
    (1, 1, 4, -52.68, 'Bobs Gift', '', '2021-07-12'),
    (2, 2, 5, -18.10, 'Toiletries', 'CVS', '2021-07-15'),
    (1, 1, 6, -42.10, 'Dog Toys', 'Petsmart', '2021-07-18'),
    (2, 2, 7, -56.10, 'Jeans', 'Levis', '2021-07-24'),
    (1, 3, 9, 30.00, 'Sold old junk', '', '2021-07-26');
