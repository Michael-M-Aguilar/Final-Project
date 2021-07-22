set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "entries" (
	"entryId" serial NOT NULL,
	"userId" integer NOT NULL,
	"accountId" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"amount" integer NOT NULL,
	"note" TEXT NOT NULL,
	"location" TEXT NOT NULL,
	CONSTRAINT "entries_pk" PRIMARY KEY ("entryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "accounts" (
	"accountId" serial NOT NULL,
	"userId" integer NOT NULL,
	"type" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT "accounts_pk" PRIMARY KEY ("accountId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "categories" (
	"categoryId" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("categoryId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "budgets" (
	"budgetId" serial NOT NULL,
	"userId" integer NOT NULL,
	"amount" integer NOT NULL,
	CONSTRAINT "budgets_pk" PRIMARY KEY ("budgetId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "entries" ADD CONSTRAINT "entries_fk1" FOREIGN KEY ("accountId") REFERENCES "accounts"("accountId");
ALTER TABLE "entries" ADD CONSTRAINT "entries_fk2" FOREIGN KEY ("categoryId") REFERENCES "categories"("categoryId");

ALTER TABLE "accounts" ADD CONSTRAINT "accounts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");


ALTER TABLE "budgets" ADD CONSTRAINT "budgets_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
