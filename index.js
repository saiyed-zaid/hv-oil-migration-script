require('./models');
require('dotenv').config()
const DatabaseMigration = require('./models/DatabaseMigration');
const prompts = require('prompts');
const companyMigration = require('./companies/migration');
const reportMigration = require('./report/migration');
const equipmentMigration = require('./equipment/migration');
const shippingMigration = require('./shipping/migration');
const userMigration = require('./user/migration');
const moment = require('moment');
const reportMigrationV2 = require('./report/migration.v2');

let askMore = true;
const questions =
{
    type: 'select',
    name: 'options',
    message: 'Select Options',
    choices: [
        { title: 'Show migration status', value: 'LIST' },
        { title: 'Start migration: Company and Divisions', value: 'COMPANY_AND_DIVISIONS' },
        { title: 'Start migration: USERS', value: 'USERS' },
        { title: 'Start migration: SHIPPING', value: 'SHIPPING' },
        { title: 'Start migration: EQUIPMENT', value: 'EQUIPMENT' },
        { title: 'Start migration: REPORTS', value: 'REPORTS' },
        { title: 'Exit script', value: 'EXIT' }
    ]
};

(async function main() {
    try {
        do {
            const response = await prompts(questions);
            switch (response.options) {
                case 'EXIT':
                    askMore = false;
                    process.exit();
                    break;
                case 'LIST':
                    const databaseMigrations = await DatabaseMigration.findAll({ raw: true });
                    console.table(databaseMigrations);
                    break;
                case 'COMPANY_AND_DIVISIONS':
                    const companyMigreation = await DatabaseMigration.findOne({ where: { tableName: 'COMPANY_AND_DIVISIONS' } });
                    try {
                        if (companyMigreation.status === 'IN_PROGRESS') continue;
                        await _update(companyMigreation, 'IN_PROGRESS', moment().format('YYYY-MM-DD HH:mm:ss'));
                        await companyMigration();
                        await _update(companyMigreation, 'DONE', null, moment().format('YYYY-MM-DD HH:mm:ss'))
                    } catch (error) {
                        await _update(companyMigreation, 'FAILED', null, moment().format('YYYY-MM-DD HH:mm:ss'))
                    }
                    break;
                case 'USERS':
                    const userMigreation = await DatabaseMigration.findOne({ where: { tableName: 'USERS' } });
                    try {
                        if (userMigreation.status === 'IN_PROGRESS') continue;
                        await _update(userMigreation, 'IN_PROGRESS', moment().format('YYYY-MM-DD HH:mm:ss'), null)
                        await userMigration();
                        await _update(userMigreation, 'DONE', null, moment().format('YYYY-MM-DD HH:mm:ss'));
                    } catch (error) {
                        await _update(userMigreation, 'FAILED', null, moment().format('YYYY-MM-DD HH:mm:ss'));
                    }
                    break;
                case 'SHIPPING':
                    const shippingMigreation = await DatabaseMigration.findOne({ where: { tableName: 'SHIPPING' } });
                    try {
                        if (shippingMigreation.status === 'IN_PROGRESS') continue;
                        await _update(shippingMigreation, 'IN_PROGRESS', moment().format('YYYY-MM-DD HH:mm:ss'), null);
                        await shippingMigration();
                        await _update(shippingMigreation, 'DONE', null, moment().format('YYYY-MM-DD HH:mm:ss'));
                    } catch (error) {
                        await _update(shippingMigreation, 'FAILED', null, moment().format('YYYY-MM-DD HH:mm:ss'));
                    }
                    break;
                case 'EQUIPMENT':
                    const equipemtnMigreation = await DatabaseMigration.findOne({ where: { tableName: 'EQUIPMENT' } });
                    try {
                        if (equipemtnMigreation.status === 'IN_PROGRESS') continue;
                        await _update(equipemtnMigreation, 'IN_PROGRESS', moment().format('YYYY-MM-DD HH:mm:ss'), null);
                        await equipmentMigration();
                        await _update(equipemtnMigreation, 'DONE', null, moment().format('YYYY-MM-DD HH:mm:ss'));
                    } catch (error) {
                        await _update(equipemtnMigreation, 'FAILED', null, moment().format('YYYY-MM-DD HH:mm:ss'));
                    }
                    break;
                case 'REPORTS':
                    const reportMigreation = await DatabaseMigration.findOne({ where: { tableName: 'REPORTS' } });
                    try {
                        if (reportMigreation.status === 'IN_PROGRESS') continue;
                        await _update(reportMigreation, 'IN_PROGRESS', moment().format('YYYY-MM-DD HH:mm:ss'), null);
                        await reportMigrationV2();
                        await _update(reportMigreation, 'DONE', null, moment().format('YYYY-MM-DD HH:mm:ss'));
                    } catch (error) {
                        await _update(reportMigreation, 'FAILED', null, moment().format('YYYY-MM-DD HH:mm:ss'));
                    }
                    break;
            }
        } while (askMore);
    } catch (error) {
        console.error(error.message);
    }
})();

async function _update(model, status, startTime = null, endTime = null) {
    model.status = status;
    startTime ? model.startTime = moment().format('YYYY-MM-DD HH:mm:ss') : null;
    endTime ? model.endTime = moment().format('YYYY-MM-DD HH:mm:ss') : null;
    await model.save();
}
process.on('uncaughtException', function _uncaughtException(error, origin) {
    console.error('> uncaughtException error: ', error.message);
    console.log('> error.name: ', error.stack);
    console.error('> origin: ', origin);
})