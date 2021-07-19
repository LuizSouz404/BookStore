const Database = require("./config");

const initDB = {
  async init() {
    const db = await Database();

    await db.exec(`
    CREATE TABLE "categories" ("key" integer PRIMARY KEY AUTOINCREMENT NOT NULL , "description" varchar NOT NULL);
    CREATE TABLE "books" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL, "cover" varchar NOT NULL, "synopsis" varchar NOT NULL, "url" varchar NOT NULL, "categoryID" integer NOT NULL);
    CREATE TABLE "reviews" ("key" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "review" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()));
    
    CREATE TABLE "temporary_books" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "author" varchar NOT NULL, "cover" varchar NOT NULL, "synopsis" varchar NOT NULL, "url" varchar NOT NULL, "categoryID" integer NOT NULL, CONSTRAINT "foreignKeyCategory" FOREIGN KEY ("categoryID") REFERENCES "categories" ("key") ON DELETE SET NULL ON UPDATE CASCADE);
    INSERT INTO "temporary_books"("id", "title", "author", "cover", "synopsis", "url", "categoryID") SELECT "id", "title", "author", "cover", "synopsis", "url", "categoryID" FROM "books";
    DROP TABLE "books";
    ALTER TABLE "temporary_books" RENAME TO "books";
    SELECT * FROM "sqlite_master" WHERE "type" = 'table' AND "name" IN ('reviews');
    SELECT * FROM "sqlite_master" WHERE "type" = 'index' AND "tbl_name" IN ('reviews');
    
    CREATE TABLE "temporary_reviews" ("key" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "review" varchar NOT NULL, "created_at" timestamp NOT NULL DEFAULT (now()), CONSTRAINT "foreignKeyReview" FOREIGN KEY ("key") REFERENCES "books" ("id") ON DELETE SET NULL ON UPDATE CASCADE);
    INSERT INTO "temporary_reviews"("key", "name", "review", "created_at") SELECT "key", "name", "review", "created_at" FROM "reviews";
    DROP TABLE "reviews";
    ALTER TABLE "temporary_reviews" RENAME TO "reviews";`); 

    await db.close();
  }
}

initDB.init();
