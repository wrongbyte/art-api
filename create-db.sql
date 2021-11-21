CREATE TABLE "artworks" (
"id"          SERIAL,
"title"       VARCHAR(260)      NOT NULL,
"file"        VARCHAR(260)      NOT NULL    UNIQUE,
"artist"      VARCHAR(260)      NOT NULL,
"year"        VARCHAR(255),
PRIMARY KEY("id")   
);


CREATE TABLE "periods" (
"id"          SERIAL,
"name"        VARCHAR(260)      NOT NULL    UNIQUE,
PRIMARY KEY("id")
);

CREATE TABLE "periods_artworks" (
"artwork_id"   INT      NOT NULL,
"period_id"    INT      NOT NULL,
FOREIGN KEY ("artwork_id")    REFERENCES  "artworks"(id)   ON UPDATE CASCADE ON DELETE RESTRICT,
FOREIGN KEY ("period_id")    REFERENCES  "periods"(id)   ON UPDATE CASCADE ON DELETE RESTRICT,
PRIMARY KEY ("artwork_id", "period_id")
);
