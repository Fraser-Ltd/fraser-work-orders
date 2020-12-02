CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "role" INT,
    "email" VARCHAR (80)  NOT NULL,
    "first_name" VARCHAR (80)  NOT NULL,
    "last_name" VARCHAR (80)  NOT NULL,
    "archive_employee" BOOLEAN DEFAULT FALSE
);

--FUTURE STRETCH GOAL FOR EXPANSION 
-- CREATE TABLE "resident_coordinator"
-- (
--     "id" SERIAL PRIMARY KEY,
--     "user_id" INT REFERENCES "user",
--     "property_id" INT
-- );

CREATE TABLE "properties"
(
    "id" SERIAL PRIMARY KEY,
    "property_name" VARCHAR (255) UNIQUE NOT NULL,
    "property_address" VARCHAR (255) NOT NULL,
    "resident_coordinator" INT REFERENCES "user",
    "archived" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "units"
(
    "id" SERIAL PRIMARY KEY,
    "property_id" INT REFERENCES "properties",
    "unit" VARCHAR (50)
);

CREATE TABLE "work_orders"
(
    "id" SERIAL PRIMARY KEY,
    "property_id" INT REFERENCES "properties",
    "date_added" TIMESTAMP DEFAULT NOW(),
    "permission_to_enter" BOOLEAN DEFAULT FALSE,
    "door_hanger" BOOLEAN DEFAULT FALSE,
    "emergency" BOOLEAN DEFAULT FALSE,
    "work_to_be_done" VARCHAR (500),
    "details_of_work_done" VARCHAR (1000),
    "time_in" TIMESTAMP,
    "time_out" TIMESTAMP,
    "status" VARCHAR (100) DEFAULT 'submitted',
    "assigned_to" INT REFERENCES "user",
    "added_by_id" INT REFERENCES "user",
    "reac_inspection" BOOLEAN DEFAULT FALSE,
    "smoke_detectors" BOOLEAN DEFAULT FALSE,
    "housekeeping_inspection" BOOLEAN DEFAULT FALSE,
    "exterminating" BOOLEAN DEFAULT FALSE,
    "remarks" VARCHAR (255),
    "unit_id" INT REFERENCES "units",
    "tenant_not_home" BOOLEAN DEFAULT FALSE,
    "date_completed" DATE DEFAULT NULL,
    "priority" INT DEFAULT 0
);


INSERT INTO "user" ("username", "password", "role", "email", "first_name", "last_name")
VALUES ('pkalibabky', 'pk1234', 1, 'pkalibabky@fraserltd.org', 'Patty', 'Kalibabky')

INSERT INTO "properties" ("property_name", "property_address")
VALUES ('Fraser 3', '514 South University Drive, Fargo');

INSERT INTO "properties" ("property_name", "property_address")
VALUES('Fraser 4', '717 South University Drive, Fargo');

INSERT INTO "units" ("property_id", "unit")
VALUES (1, 'Apt 1');

-- INSERT INTO "resident_coordinator" ("user_id", "property_id")
-- VALUES (1, 1);

INSERT INTO "work_orders" ("property_id", "work_to_be_done", "added_by_id", "remarks", "unit_id")
VALUES (1, 'Fix light', 1, '', 1);
