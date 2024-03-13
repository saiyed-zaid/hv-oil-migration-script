const { Op, Sequelize } = require('sequelize');
const Apprtype = require('../models/Apprtype');
const Division = require('../models/Division');
const User = require('../models/User');
const getDataFromObject = require('../utils/getDataFromObject');
const Shipping = require('../models/Shipping');
const prompts = require('prompts');
const mysql = require('mysql2/promise');
const fs = require('fs');
const moment = require('moment');
const cliProgress = require('cli-progress');
async function shippingMigration() {
    try {
        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'Start migration for shipping module? [y/n]'
        });
        if (String(response.value).toLowerCase() !== 'y') return true;
        console.time('equipmentMigration');
        /* [TODO]:  connect old database */

        // create the connection to database
        const connection = await mysql.createConnection({
            host: process.env.MG_DEV_HOST,
            user: process.env.MG_DEV_USERNAME,
            database: process.env.MG_DEV_DATABASE,
            password: process.env.MG_DEV_PASSWORD
        });

        const [shippingRecords, fields] = await connection.query(`SELECT * FROM shipping`);
        console.log('> Shipping | Migration initiated');
        console.log('> Total records: ', shippingRecords.length);
        console.log('-------------------------------');
        const progressBar = new cliProgress.SingleBar({
            format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
        }, cliProgress.Presets.shades_classic);
        progressBar.start(shippingRecords.length, 0);
        for (let index = 0; index < shippingRecords.length; index++) {
            progressBar.update(index + 1);
            const shippingRecord = shippingRecords[index];
            try {
                const bottleShipped = getDataFromObject(shippingRecord, 'BOTTLENOSHIPPED');
                const bottleReceived = getDataFromObject(shippingRecord, 'BOTTLENORECEIVED');
                const syringeShipped = getDataFromObject(shippingRecord, 'SYRINGENOSHIPPED');
                const syringeReceived = getDataFromObject(shippingRecord, 'SYRINGENORECEIVED');

                const shippingDataToInsert = {
                    location_id: 1,
                    courier: shippingRecord.COURIER,
                    tracking_number: shippingRecord.TRACKINGNUMBER,
                    shipping_date: moment.isDate(shippingRecord.SHIPPING_DATE, 'YYYY-MM-DD')
                        ? moment(shippingRecord.SHIPPING_DATE, 'YYYY-MM-DD').format('YYYY-MM-DD')
                        : moment().format('YYYY-MM-DD'),
                    comments: shippingRecord.COMMENTS,
                    created_at: moment(shippingRecord.CREATION_DATE).toISOString() !== null
                        ? shippingRecord.CREATION_DATE
                        : moment().format('YYYY-MM-DD hh:mm:ss'),
                    updated_at: moment(shippingRecord.CREATION_DATE).toISOString() !== null
                        ? shippingRecord.CREATION_DATE
                        : moment().format('YYYY-MM-DD hh:mm:ss')
                }
                if (bottleShipped) {
                    shippingDataToInsert.shipping_type = 'shipped';
                    shippingDataToInsert.syringe_number = null;
                    shippingDataToInsert.bottle_number = bottleShipped;
                    shippingDataToInsert.status = 'shipped';
                    await createShippingRecord(shippingRecord, shippingDataToInsert);
                }
                if (syringeShipped) {
                    shippingDataToInsert.shipping_type = 'shipped';
                    shippingDataToInsert.syringe_number = syringeShipped;
                    shippingDataToInsert.bottle_number = null;
                    shippingDataToInsert.status = 'shipped';
                    await createShippingRecord(shippingRecord, shippingDataToInsert);

                }
                if (bottleReceived) {
                    shippingDataToInsert.shipping_type = 'received';
                    shippingDataToInsert.syringe_number = null;
                    shippingDataToInsert.bottle_number = bottleReceived;
                    shippingDataToInsert.status = 'received';
                    await createShippingRecord(shippingRecord, shippingDataToInsert);
                }
                if (syringeReceived) {
                    shippingDataToInsert.shipping_type = 'received';
                    shippingDataToInsert.syringe_number = syringeReceived;
                    shippingDataToInsert.bottle_number = null;
                    shippingDataToInsert.status = 'received';
                    await createShippingRecord(shippingRecord, shippingDataToInsert);
                }
            } catch (error) {
                console.error(`> Shipping | Migration ERR | Row number : ${index + 1}`);
                shippingRecord.error = JSON.stringify(error, null, 2)
                fs.writeFileSync('shipping-migration-err.json', JSON.stringify(shippingRecord, null, 2), { flag: 'a' });
            }
        }
        progressBar.stop();
        console.log('*******************************');
        console.log('> Shipping | Migration completed');
        console.log('*******************************');
        console.timeEnd('equipmentMigration');
        return {};
    } catch (error) {
        console.error('> Shipping | Migration ERR | : ', error);
        throw error;
    }
}
async function createShippingRecord(shippingRecord, shippingDataToInsert) {
    /* [TODO]: Fetch hv_division based on DIVISION field */
    if (shippingRecord.DIVISION) {
        const division = await Division.findOne({
            where: {
                name: shippingRecord.DIVISION,
                company_id: {
                    [Op.eq]: Sequelize.literal(`(SELECT hv_companies.id FROM hv_companies WHERE hv_companies.name = "${shippingRecord.COMPNAME}")`)
                }
            },
            raw: true
        });
        if (division) {
            shippingDataToInsert.company_id = division.company_id;
            shippingDataToInsert.division_id = division.id;
        }
    }

    /* [TODO]: Find User */
    const user = await User.findOne({ where: { username: shippingRecord.USERNAME }, raw: true });
    if (user) {
        shippingDataToInsert.created_by = user.id;
        shippingDataToInsert.updated_by = user.id;
    }
    const newEquipment = await Shipping.create(shippingDataToInsert);
}
module.exports = shippingMigration;