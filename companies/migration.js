const Division = require('../models/Division');
const fs = require('fs');
const prompts = require('prompts');
const mysql = require('mysql2/promise');
const Company = require('../models/Company');
const cliProgress = require('cli-progress');
async function companyMigration() {
    try {

        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'Start migration? [y/n]'
        });
        console.log({ response });
        if (String(response.value).toLowerCase() !== 'y') return true;

        // create the connection to database
        const connection = await mysql.createConnection({
            host: process.env.MG_DEV_HOST,
            user: process.env.MG_DEV_USERNAME,
            database: process.env.MG_DEV_DATABASE,
            password: process.env.MG_DEV_PASSWORD
        });

        /* [TODO]:  Fetch 5 records */
        const [companyRecords, fields] = await connection.query('SELECT DISTINCT COMPNAME FROM `division`');
        console.log('> Company | Migration initiated');
        console.log('> Total records: ', companyRecords.length);
        console.log('-------------------------------');
        /* [TODO]: Field mapping */
        const progressBar = new cliProgress.SingleBar({
            format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
        }, cliProgress.Presets.shades_classic);
        progressBar.start(companyRecords.length, 0);
        for (let dataIndex = 0; dataIndex < companyRecords.length; dataIndex++) {
            progressBar.update(dataIndex + 1);
            const companyRecord = companyRecords[dataIndex];
            try {
                const companyDataToInsert = {
                    name: companyRecord.COMPNAME,
                    slug: typeof (companyRecord.COMPNAME) === 'string'
                        ? companyRecord.COMPNAME.toLowerCase().replace(' ', '_')
                        : '',
                    email: companyRecord.EMAIL,
                    location_id: 1
                };

                const newCompanyData = await Company.create(companyDataToInsert);
                const newCompanyId = newCompanyData.id;

                /* Fetch divisions of company */
                const queryString = `SELECT * FROM division WHERE COMPNAME="${companyRecord.COMPNAME}"`;
                const [divisionRecords, divisionFields] = await connection.query(queryString);
                if (Array.isArray(divisionRecords) && divisionRecords.length > 0) {
                    for (let divisionIndex = 0; divisionIndex < divisionRecords.length; divisionIndex++) {
                        const divisionRecord = divisionRecords[divisionIndex];
                        companyRecord.divisionData = {
                            company_id: newCompanyId,
                            location_id: 1,
                            name: divisionRecord.DIVISION,
                            city: divisionRecord.CITY,
                            street1: divisionRecord.STREET1,
                            street2: divisionRecord.STREET2,
                            state: divisionRecord.STATE,
                            country: divisionRecord.COUNTRY,
                            postalcode: divisionRecord.POSTALCODE,
                            phone_number: divisionRecord.PHONE,
                            fax: divisionRecord.FAX,
                            attention: divisionRecord.ATTENTION,
                        };
                        try {
                            const newDivisionData = await Division.create(companyRecord.divisionData);
                        } catch (error) {
                            console.error(`> Division | Migration ERR | Row number : ${divisionIndex + 1}`);
                            divisionRecord.error = JSON.stringify(error, null, 2)
                            fs.writeFileSync('division-migration-err.json', JSON.stringify(divisionRecord, null, 2), { flag: 'a' });
                            break;
                        }
                    }
                }
            } catch (error) {
                console.error(`> Company | Migration ERR | Row number : ${dataIndex + 1}`);
                companyRecord.error = JSON.stringify(error, null, 2)
                fs.writeFileSync('company-migration-err.json', JSON.stringify(companyRecord, null, 2), { flag: 'a' });
            }
        }
        progressBar.stop();
        console.log('*******************************');
        console.log('> Company | Migration completed');
        console.log('*******************************');
        return companyRecords;
    } catch (error) {
        console.error('> Error while company-division migration');
        throw error;
    }

}
module.exports = companyMigration;