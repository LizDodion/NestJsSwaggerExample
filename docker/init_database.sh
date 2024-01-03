#!/usr/bin/env sh

psql -h ${DATABASE_HOST} -U apicoreuser -d apicoredb -f ./docker/postgres_init.sql