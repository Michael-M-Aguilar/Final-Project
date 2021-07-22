insert into "users"
("firstName", "lastName", "email", "password")
values
  ('Jim', 'Smith', 'jim@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword');

insert into "accounts"
("userId", "type", "description")
  values
    (1, 'Cash', 'Cash'),
    (1, 'Credit', 'Credit'),
    (2, 'Cash', 'Cash'),
    (2, 'Credit', 'Credit');

insert into "categories"
("categoryId", "name")
  values
  (1, 'Auto'),
  (2, 'Bills');

insert into "entries"
("userId", "accountId", "categoryId", "amount", "note", "location")
  values
    (1, 1, 1, 100.00, 'Jim Deposit', 'N/A'),
    (2, 2, 1, 200.00, 'Jane Deposit', 'N/A');
