const { Sequelize, Op } = require('sequelize');
const Division = require('../models/Division');
const User = require('../models/User');
const fs = require('fs');
const mysql = require('mysql2/promise');
const cliProgress = require('cli-progress');
async function userMigration() {
    try {
        const prompts = require('prompts');
        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'Start migration? [y/n] '
        });
        if (String(response.value).toLowerCase() !== 'y') return true;

        /* [TODO]:  connect old database */

        // create the connection to database
        const connection = await mysql.createConnection({
            host: process.env.MG_DEV_HOST,
            user: process.env.MG_DEV_USERNAME,
            database: process.env.MG_DEV_DATABASE,
            password: process.env.MG_DEV_PASSWORD
        });

        // Fetch user details
        const userRecordQuery = `SELECT
        ud.USERNAME,
        ud.PASSWORD,
        ucd.COMPNAME,
        ucd.DIVISION
    FROM
        user_details ud
        LEFT JOIN user_company_details ucd ON ucd.USERNAME = ud.USERNAME`;
        const [userRecords, fields] = await connection.query(userRecordQuery);

        console.log('> User | Migration initiated');
        console.log('> Total records: ', userRecords.length);
        console.log('-------------------------------');
        const progressBar = new cliProgress.SingleBar({
            format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
        }, cliProgress.Presets.shades_classic);
        progressBar.start(userRecords.length, 0);
        for (let userIndex = 0; userIndex < userRecords.length; userIndex++) {
            progressBar.update(userIndex + 1);
            const userRecord = userRecords[userIndex];
            const userDataToInsert = {
                location_id: 1,
                username: userRecord.USERNAME,
                email: userRecord.USERNAME,
                password: userRecord.PASSWORD
            }
            try {
                /* [TODO]: Fetch hv_division based on DIVISION field */

                if (userRecord.DIVISION) {
                    const division = await Division.findOne({
                        where: {
                            name: userRecord.DIVISION,
                            company_id: {
                                [Op.eq]: Sequelize.literal(`(SELECT hv_companies.id FROM hv_companies WHERE hv_companies.name = "${userRecord.COMPNAME}")`)
                            }
                        },
                        raw: true
                    });
                    if (division) {
                        userDataToInsert.company_id = division.company_id;
                        userDataToInsert.division_id = division.id;
                        userDataToInsert.role_id = 2;
                    }
                }
                await User.create(userDataToInsert);
            } catch (error) {
                console.error(`> User | Migration ERR | Row number : ${userIndex + 1}`);
                userRecord.error = JSON.stringify(error, null, 2)
                fs.writeFileSync('user-migration-err.json', JSON.stringify(userRecord, null, 2), { flag: 'a' });
            }
        }
        progressBar.stop();
        console.log('*******************************');
        console.log('> User | Migration completed');
        console.log('*******************************');
        return {};
    } catch (error) {
        console.error('> Error while user migration: ', error.message);
    }

}
module.exports = userMigration;