const { Op, Sequelize } = require('sequelize');
const Apprtype = require('../models/Apprtype');
const Division = require('../models/Division');
const Equipment = require('../models/Equipment');
const User = require('../models/User');
const mysql = require('mysql2/promise');
const prompts = require('prompts');
const fs = require('fs');
const moment = require('moment');
const cliProgress = require('cli-progress');
async function equipmentMigration() {
    try {
        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'Start migration for equipment? [y/n] '
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

        // Fetch user details
        const [equipmentRecords, fields] = await connection.query(`SELECT * FROM equipment`);
        console.log('> Equipment | Migration initiated');
        console.log('> Total records: ', equipmentRecords.length);
        console.log('-------------------------------');
        const progressBar = new cliProgress.SingleBar({
            format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
        }, cliProgress.Presets.shades_classic);
        progressBar.start(equipmentRecords.length, 0);
        for (let index = 0; index < equipmentRecords.length; index++) {
            progressBar.update(index + 1);
            const equipmentRecord = equipmentRecords[index];

            const equipmentDataToInsert = {
                location_id: 1,
                // appr_type_id: equipmentRecord, // APPRTYPE
                appr_type_name: equipmentRecord.APPRTYPE,
                serial_number: equipmentRecord.SERIALNUM,
                equipment_number: equipmentRecord.EQUIPNUM,
                designation: equipmentRecord.DESIGNATION,
                region_name: equipmentRecord.REGIONNAME,
                substn_name: equipmentRecord.SUBSTNNAME,
                norm_name: equipmentRecord.NORMNAME,
                fluid_type: equipmentRecord.FLUIDTYPE,
                ep_desc: equipmentRecord.EQPDESC,
                manufacturer: equipmentRecord.MANUFACTURER,
                year_manufacturer: equipmentRecord.YEARMFG,
                kv_rating: equipmentRecord.KVRATING,
                mva_rating: equipmentRecord.MVARATING,
                oilpres: equipmentRecord.OILPRES,
                cooling: equipmentRecord.COOLING,
                fluid_vol: equipmentRecord.FLUIDVOL,
                surveillance: equipmentRecord.SURVEILLANCE,
                eqp_remarks: equipmentRecord.EQPREMARKS,
                cond: equipmentRecord.COND,
                created_at: moment.isDate(equipmentRecord.CREATION_DATE, 'YYYY-MM-DD hh:mm:ss')
                    ? equipmentRecord.CREATION_DATE
                    : moment().format('YYYY-MM-DD hh:mm:ss'),
                updated_at: moment.isDate(equipmentRecord.CREATION_DATE, 'YYYY-MM-DD hh:mm:ss')
                    ? equipmentRecord.CREATION_DATE
                    : moment().format('YYYY-MM-DD hh:mm:ss')
            }
            try {
                const apprtype = await Apprtype.findOne({ where: { type: equipmentRecord.APPRTYPE }, raw: true });
                if (!apprtype) {
                    const newApprtype = await Apprtype.create({ type: equipmentRecord.APPRTYPE });
                    equipmentDataToInsert.appr_type_id = newApprtype.id;
                } else {
                    equipmentDataToInsert.appr_type_id = apprtype.id;
                }

                /* [TODO]: Fetch hv_division based on DIVISION field */
                if (equipmentRecord.DIVISION) {
                    const division = await Division.findOne({
                        where: {
                            name: equipmentRecord.DIVISION,
                            company_id: {
                                [Op.eq]: Sequelize.literal(`(SELECT hv_companies.id FROM hv_companies WHERE hv_companies.name = "${equipmentRecord.COMPNAME}")`)
                            }
                        },
                        raw: true
                    });
                    if (division) {
                        equipmentDataToInsert.company_id = division.company_id;
                        equipmentDataToInsert.division_id = division.id;
                    }
                }

                /* [TODO]: Find User */
                const user = await User.findOne({ where: { username: equipmentRecord.USERNAME }, raw: true });
                if (user) {
                    equipmentDataToInsert.created_by = user.id;
                    equipmentDataToInsert.updated_by = user.id;
                }
                await Equipment.create(equipmentDataToInsert);
            } catch (error) {
                console.error(`> Equipment | Migration ERR | Row number : ${index + 1}`);
                equipmentRecord.error = JSON.stringify(error, null, 2);
                fs.writeFileSync('equipment-migration-err.json', JSON.stringify(equipmentRecord, null, 2), { flag: 'a' });
            }
        }
        progressBar.stop();
        console.log('*******************************');
        console.log('> Equipment | Migration completed');
        console.log('*******************************');
        console.timeEnd('equipmentMigration');
        return {};
    } catch (error) {
        console.error('> Error while migrating: ', error);
        throw error;
    }
}
module.exports = equipmentMigration;