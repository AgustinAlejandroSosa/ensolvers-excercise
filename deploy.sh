#!/bin/bash

## SET THE DB SCHEMA

mysql -u root

GRANT ALL PRIVILEGES ON *.* TO 'ensolversUser'@'localhost' IDENTIFIED BY '1234';

\q

mysql -u ensolversUser -p

CREATE DATABASE notes

\q

cd backend

mvn spring-boot:run

cd ..

cd frontend

npm install

npm start

