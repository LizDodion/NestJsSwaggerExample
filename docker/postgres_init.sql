-- This table correspond to the `test` database which we use for e2e tests and is in e2e-test/setTestEnv.js
CREATE USER apicoreuser_test WITH PASSWORD 'apicorepassword_test' CREATEDB;
-- Need to explicitly add the extension for uuidv4 or we get error: function uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Test db so we can test the server
CREATE DATABASE apicoredb_test
    WITH
    OWNER = apicoreuser_test
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
