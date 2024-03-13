Prerequest:

## Install nodeJS
## Install MYSQL services && Make sure MYSQL service is running


1) Create New Database

2) Update env file for source & target databases

----------------------
## Step 1: new tables migrations

>   npx sequelize-cli db:migrate:status OR
>   npm run migrate:status


## Step 2: Data seeding:

    Seed: [permissions, roles, role-permissions, appr-type, add Default admin account]

>   npx sequelize-cli db:seed:all   OR
>   npm run seed:all

## Step 3: Insert Default location:

## Step 4: Data Migration > Company, Division:

## Step 4: Data Migration > Users:

## Step 4: Data Migration > Shipping:

## Step 4: Data Migration > Equipement:

## Step 4: Data Migration > Reports:
