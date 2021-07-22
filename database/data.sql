insert into "users"
("firstName", "lastName", "email", "password")
values
  ('Jim', 'Smith', 'jim@example.com', 'notapassword'),
  ('Jane', 'Doe', 'jane@example.com', 'notapassword')

insert into "entries"
("amount", "note", "location, categoryId", "userId")
  values
    (100.00, 'Jim Text', 'N/A', 1, 1),
    (200.00, 'Jane Text', 'N/A', 1, 1)
