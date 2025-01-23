const { Op, Sequelize } = require('sequelize');
const Equipment = require('../models/Equipment');
const sequelize = require('../services/database');
const Apprtype = require('../models/Apprtype');
const Company = require('../models/Company');
const User = require('../models/User');
const SampleInfo = require('../models/SampleInfo');
const Dga = require('../models/Dga');
const moment = require('moment');
const Division = require('../models/Division');
const Fq = require('../models/Fq');
const Diag = require('../models/Diag');
const mysql = require('mysql2/promise');
const prompts = require('prompts');
const fs = require('fs');
const cliProgress = require('cli-progress');
const Report_remark = require('../models/ReportRemark');

async function reportMigrationV2() {
    try {
        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'Start migration? [y/n] '
        });
        if (String(response.value).toLowerCase() !== 'y') return true;
        console.time('reportMigration');
        const connection = await mysql.createConnection({
            host: process.env.MG_DEV_HOST,
            user: process.env.MG_DEV_USERNAME,
            database: process.env.MG_DEV_DATABASE,
            password: process.env.MG_DEV_PASSWORD
        });
        const equipments = await Equipment.findAll({
            include: [
                {
                    model: Company,
                    as: 'company'
                }
            ],
            // raw: true,
            // limit: 1
        });
        console.log('> Report | Migration initiated');
        console.log('> Total records: ', equipments.length);
        console.log('-------------------------------');
        const equipmentProgressBar = new cliProgress.SingleBar({
            format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
        }, cliProgress.Presets.shades_classic);
        equipmentProgressBar.start(equipments.length, 0);
        for (let equipmentIndex = 0; equipmentIndex < equipments.length; equipmentIndex++) {
            equipmentProgressBar.update(equipmentIndex + 1);
            const equipment = equipments[equipmentIndex].get({ plain: true });
            try {
                const company = equipment.company;
                if (!company) continue;

                /* Find Sample Information table */
                const sampleInfoTableQuery = `SELECT * FROM saminfotable WHERE COMPNAME="${company.name}" AND SERIALNUM = "${equipment.serial_number}" AND APPRTYPE = "${equipment.appr_type_name}"`;

                const [sampleInfoTableRecords] = await connection.query(sampleInfoTableQuery);

                if (sampleInfoTableRecords.length === 0) continue;
                for (let sampleInfoindex = 0; sampleInfoindex < sampleInfoTableRecords.length; sampleInfoindex++) {
                    try {
                        const sampleInfoData = sampleInfoTableRecords[sampleInfoindex];

                        const user = await User.findOne({ where: { username: sampleInfoData.USERNAME }, raw: true, plain: true });

                        const sampleInfoDataObj = {
                            location_id: 1,
                            company_id: company ? company.id : null,
                            division_id: equipment ? equipment.division_id : null,

                            location_name: "test1",
                            company_name: sampleInfoData.COMPNAME,
                            serial_number: sampleInfoData.SERIALNUM,


                            appr_type_id: equipment.appr_type_id,
                            appr_type_name: sampleInfoData.APPRTYPE,

                            equipment_id: equipment ? equipment.id : null,
                            equipment_number: sampleInfoData.EQUIPNUM,

                            sample_date: moment(sampleInfoData.SAMPLEDATE).toISOString() !== null
                                ? moment(sampleInfoData.SAMPLEDATE).format('YYYY-MM-DD')
                                : moment().format('YYYY-MM-DD'),
                            lab_report_number: sampleInfoData.LABREPORTNUM,
                            tank: sampleInfoData.TANK,
                            sample_pt: sampleInfoData.SAMPLEPT,
                            lab_recv_date: moment(sampleInfoData.LABRECVDATE).toISOString() !== null
                                ? moment(sampleInfoData.LABRECVDATE).format('YYYY-MM-DD')
                                : moment().format('YYYY-MM-DD'),
                            lab_test_date: moment(sampleInfoData.LABTESTDATE).toISOString() !== null
                                ? moment(sampleInfoData.LABTESTDATE).format('YYYY-MM-DD')
                                : moment().format('YYYY-MM-DD'),
                            ship_date: moment(sampleInfoData.SHIPDATE).toISOString() !== null
                                ? moment(sampleInfoData.SHIPDATE).format('YYYY-MM-DD')
                                : moment().format('YYYY-MM-DD'),
                            job_number: sampleInfoData.JOBNUM,
                            order_number: sampleInfoData.ORDERNUM,
                            sample_r: sampleInfoData.SAMPLER,
                            fluid_temperature: sampleInfoData.FLUIDTEMPC,
                            amb_temperature: sampleInfoData.AMBTEMP,
                            weather: sampleInfoData.WEATHER,
                            pv_gauge: sampleInfoData.PVGAUGE,
                            lvl_gauge: sampleInfoData.LVLGAUGE,
                            rlf_vlv_clr: sampleInfoData.RLFVLVCLR,
                            oil_leak: sampleInfoData.OILLEAK,
                            ground_status: sampleInfoData.GROUNDSTATUS,
                            paint: sampleInfoData.PAINT,
                            breather: sampleInfoData.BREATHER,
                            corrosion: sampleInfoData.CORROSION,
                            silick_gel: sampleInfoData.SILICKGEL,
                            ops_count: sampleInfoData.OPSCOUNT,
                            lab_name: sampleInfoData.LAB_NAME,
                            is_base: sampleInfoData.IS_BASE,
                            exclude: sampleInfoData.EXCLUDE,
                            reason: sampleInfoData.REASON,
                            first_report_date: moment(sampleInfoData.FIRSTREPORTDATE).toISOString() !== null
                                ? sampleInfoData.FIRSTREPORTDATE
                                : moment(sampleInfoData.SAMPLEDATE).format('YYYY-MM-DD'),
                            created_by: user ? user.id : null,
                            updated_by: user ? user.id : null,
                            created_at: moment(sampleInfoData.CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                                ? sampleInfoData.CREATION_DATE
                                : moment(sampleInfoData.SAMPLEDATE).format('YYYY-MM-DD hh:mm:ss'),
                            updated_at: moment(sampleInfoData.CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                                ? sampleInfoData.CREATION_DATE
                                : moment(sampleInfoData.SAMPLEDATE).format('YYYY-MM-DD hh:mm:ss')
                        };
                        try {
                            await SampleInfo.create(sampleInfoDataObj);
                        } catch (error) {
                            console.error('> Error: await SampleInfo.create: ', error.message);
                        }

                        // fs.writeFileSync('test-sampleInfoDataObj.json', JSON.stringify(sampleInfoDataObj, null, 2), { flag: 'a' });

                        /* Find DGA table information */
                        //--------------------------//
                        // date(SAMPLEDATE) = "${moment(sampleInfoData.SAMPLEDATE).format('YYYY-MM-DD')}" AND 
                        const dgaTableQuery = `SELECT * FROM dgatable WHERE LABREPORTNUM = "${sampleInfoData.LABREPORTNUM}"`;

                        const [dgaTableRecords] = await connection.query(dgaTableQuery);
                        if (dgaTableRecords.length > 0) {
                            const dgaTableObj = {
                                location_id: 1,
                                company_id: company ? company.id : null,
                                division_id: equipment ? equipment.division_id : null,
                                location_name: 'test1',
                                company_name: sampleInfoData.COMPNAME,
                                division_name: equipment ? equipment.division_id : null,
                                sample_date: moment(sampleInfoData.SAMPLEDATE).toISOString() !== null
                                    ? moment(sampleInfoData.SAMPLEDATE).format('YYYY-MM-DD')
                                    : moment().format('YYYY-MM-DD'),
                                lab_report_number: sampleInfoData.LABREPORTNUM,
                                h2: dgaTableRecords[0].H2,
                                o2: dgaTableRecords[0].O2,
                                n2: dgaTableRecords[0].N2,
                                ch4: dgaTableRecords[0].CH4,
                                co: dgaTableRecords[0].CO,
                                co2: dgaTableRecords[0].CO2,
                                c2h4: dgaTableRecords[0].C2H4,
                                c2h6: dgaTableRecords[0].C2H6,
                                c2h2: dgaTableRecords[0].C2H2,
                                created_by: user ? user.id : null,
                                updated_by: user ? user.id : null,
                                created_at: moment(dgaTableRecords[0].CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                                    ? moment(dgaTableRecords[0].CREATION_DATE).format('YYYY-MM-DD hh:mm:ss')
                                    : moment().format('YYYY-MM-DD hh:mm:ss'),
                                updated_at: moment(dgaTableRecords[0].CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                                    ? moment(dgaTableRecords[0].CREATION_DATE).format('YYYY-MM-DD hh:mm:ss')
                                    : moment().format('YYYY-MM-DD hh:mm:ss')
                            };
                            try {
                                await Dga.create(dgaTableObj);
                            } catch (error) {
                                console.error('> Error: await Dga.create: ', error.message);
                            }
                            // fs.writeFileSync('test-dgaTableObj.json', JSON.stringify(dgaTableObj, null, 2), { flag: 'a' });
                        }

                        const diagTableQuery = `SELECT * FROM diagtable WHERE LABREPORTNUM = "${sampleInfoData.LABREPORTNUM}"`;


                        const [diagTableRecords] = await connection.query(diagTableQuery);
                        if (diagTableRecords.length > 0) {
                            const diagtableObj = {
                                location_id: 1,
                                company_id: company ? company.id : null,
                                division_id: equipment ? equipment.division_id : null,
                                location_name: 'test1',
                                company_name: sampleInfoData.COMPNAME,
                                division_name: equipment ? equipment.division_id : null,
                                sample_date: moment(diagTableRecords[0].SAMPLEDATE).toISOString() !== null
                                    ? moment(diagTableRecords[0].SAMPLEDATE).format('YYYY-MM-DD')
                                    : moment().format('YYYY-MM-DD')
                                ,
                                lab_report_number: diagTableRecords[0].LABREPORTNUM,
                                rel_saturation: diagTableRecords[0].RELSATURATION,
                                dewptc: diagTableRecords[0].DEWPTC,
                                dga_retest_date: moment(diagTableRecords[0].DGA_RETESTDATE).toISOString() !== null
                                    ? moment(diagTableRecords[0].DGA_RETESTDATE).format('YYYY-MM-DD')
                                    : moment().format('YYYY-MM-DD'),
                                fq_retest_date: moment(diagTableRecords[0].FQ_RETESTDATE).toISOString() !== null
                                    ? moment(diagTableRecords[0].FQ_RETESTDATE).format('YYYY-MM-DD')
                                    : moment().format('YYYY-MM-DD'),
                                tag: diagTableRecords[0].TAG,
                                tdcg: diagTableRecords[0].TDCG,
                                etcg: diagTableRecords[0].ETCG,
                                thg: diagTableRecords[0].THG,
                                eshl: diagTableRecords[0].ESHL,
                                total_gas_content: diagTableRecords[0].TOTAL_GAS_CONTENT,
                                o2_n2: diagTableRecords[0].O2_N2,
                                co2_co: diagTableRecords[0].CO2_CO,
                                c2h4_c2h2: diagTableRecords[0].C2H4_C2H2,
                                c2h6_ch4: diagTableRecords[0].C2H6_CH4,
                                estdp: diagTableRecords[0].ESTDP,
                                pf_ratio: diagTableRecords[0].PFRATIO,
                                fq_index: diagTableRecords[0].FQINDEX,
                                piqr: diagTableRecords[0].PIQR,
                                pmean: diagTableRecords[0].PMEAN,
                                pmedian: diagTableRecords[0].PMEDIAN,
                                pq1: diagTableRecords[0].PQ1,
                                pq3: diagTableRecords[0].PQ3,
                                pskewness: diagTableRecords[0].PSKEWNESS,
                                pstddev: diagTableRecords[0].PSTDDEV,
                                ptotal: diagTableRecords[0].PTOTAL,
                                ovrreli: diagTableRecords[0].OVRRELI,
                                gda_remarks: diagTableRecords[0].DGA_REMARKS,
                                fq_remarks: diagTableRecords[0].FQ_REMARKS,
                                moisture_remarks: diagTableRecords[0].MOISTURE_REMARKS,
                                norm_used: diagTableRecords[0].NORM_USED
                            }
                            try {
                                await Diag.create(diagtableObj);
                            } catch (error) {
                                console.error('> Error: await Diag.create: ', error.message);
                            }
                            // fs.writeFileSync('test-diagtableObj.json', JSON.stringify(diagtableObj, null, 2), { flag: 'a' });
                        }

                        const fqTableQuery = `SELECT * FROM fqtable WHERE LABREPORTNUM = "${sampleInfoData.LABREPORTNUM}"`;

                        const [fqTableRecords] = await connection.query(fqTableQuery);
                        if (fqTableRecords.length > 0) {
                            const fqTableObj = {
                                location_id: 1,
                                company_id: company ? company.id : null,
                                division_id: equipment ? equipment.division_id : null,
                                location_name: 'test1',
                                company_name: sampleInfoData.COMPNAME,
                                division_name: equipment ? equipment.division_id : null,
                                sample_date:
                                    moment(fqTableRecords[0].SAMPLEDATE, 'YYYY-MM-DD').toISOString() !== null
                                        ? moment(fqTableRecords[0].SAMPLEDATE).format('YYYY-MM-DD')
                                        : moment().format('YYYY-MM-DD'),
                                lab_report_number: sampleInfoData.LABREPORTNUM,
                                d1816_1: fqTableRecords[0].D1816_1,
                                d1816_2: fqTableRecords[0].D1816_2,
                                d877: fqTableRecords[0].D877,
                                water: fqTableRecords[0].WATER,
                                acid_number: fqTableRecords[0].ACIDNUM,
                                ift: fqTableRecords[0].IFT,
                                pf25: fqTableRecords[0].PF25,
                                pf100: fqTableRecords[0].PF100,
                                inhibitor_dbp: fqTableRecords[0].INHIBITOR_DBP,
                                inhibitor_dbpc: fqTableRecords[0].INHIBITOR_DBPC,
                                visual: fqTableRecords[0].VISUAL,
                                color: fqTableRecords[0].COLOR,
                                viscosity: fqTableRecords[0].VISCOSITY,
                                d1275b: fqTableRecords[0].D1275B,
                                d130: fqTableRecords[0].D130,
                                sg: fqTableRecords[0].SG,
                                alumi_number: fqTableRecords[0].ALUMINUM,
                                barium: fqTableRecords[0].BARIUM,
                                cadmium: fqTableRecords[0].CADMIUM,
                                boron: fqTableRecords[0].BORON,
                                calcium: fqTableRecords[0].CALCIUM,
                                chromium: fqTableRecords[0].CHROMIUM,
                                copper: fqTableRecords[0].COPPER,
                                iron: fqTableRecords[0].IRON,
                                lead: fqTableRecords[0].LEAD,
                                molybde_number: fqTableRecords[0].MOLYBDENUM,
                                magnesium: fqTableRecords[0].MAGNESIUM,
                                nickel: fqTableRecords[0].NICKEL,
                                phosphorus: fqTableRecords[0].PHOSPHORUS,
                                silicon: fqTableRecords[0].SILICON,
                                silver: fqTableRecords[0].SILVER,
                                sodium: fqTableRecords[0].SODIUM,
                                tin: fqTableRecords[0].TIN,
                                tungsten: fqTableRecords[0].TUNGSTEN,
                                zinc: fqTableRecords[0].ZINC,
                                p4c: fqTableRecords[0].P4C,
                                p6c: fqTableRecords[0].P6C,
                                p14c: fqTableRecords[0].P14C,
                                p21c: fqTableRecords[0].P21C,
                                p38c: fqTableRecords[0].P38C,
                                a1242: fqTableRecords[0].A1242,
                                a1254: fqTableRecords[0].A1254,
                                a1260: fqTableRecords[0].A1260,
                                total_pcb: fqTableRecords[0].TOTALPCB,
                                furfural: fqTableRecords[0].FURFURAL,
                                mfurfural: fqTableRecords[0].MFURFURAL,
                                hmfurfural: fqTableRecords[0].HMFURFURAL,
                                furfurylalc: fqTableRecords[0].FURFURYLALC,
                                acetylfuran: fqTableRecords[0].ACETYLFURAN,
                            }
                            try {
                                await Fq.create(fqTableObj);
                            } catch (error) {
                                console.error('> Error: await Fq.create: ', error.message);
                            }
                            // fs.writeFileSync('test-fqTableObj.json', JSON.stringify(fqTableObj, null, 2), { flag: 'a' });
                        }

                        const reportRemarkQuery = `SELECT * FROM reportremark WHERE LABREPORTNUM = "${sampleInfoData.LABREPORTNUM}"`;

                        const [reportRemarkRecords] = await connection.query(reportRemarkQuery);

                        if (reportRemarkRecords.length > 0) {
                            const reportRemarkObj = {
                                lab_report_number: sampleInfoData.LABREPORTNUM,
                                equipment_type: sampleInfoData.APPRTYPE,
                                reliability: reportRemarkRecords[0].RELIABILITY,
                                hazards: reportRemarkRecords[0].HAZARDS,
                                moisture_dynamics: reportRemarkRecords[0].MOISTUREDYNAMICS,
                                oil_reconditioning: reportRemarkRecords[0].OILRECONDITIONING,
                                oil_replacement: reportRemarkRecords[0].OILREPLACEMENT,
                                next_tests: reportRemarkRecords[0].NEXTTESTS,
                                next_sample_date: moment(reportRemarkRecords[0].NEXTSAMPLEDATE, 'YYYY-MM-DD').toISOString() !== null
                                    ? moment(reportRemarkRecords[0].NEXTSAMPLEDATE).format('YYYY-MM-DD')
                                    : moment().format('YYYY-MM-DD'),
                                comments: reportRemarkRecords[0].COMMENTS,
                                action_items: reportRemarkRecords[0].ACTIONITEMS,
                                created_by: user ? user.id : null,
                                updated_by: user ? user.id : null,
                                created_at: moment(reportRemarkRecords[0].CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                                    ? moment(reportRemarkRecords[0].CREATION_DATE).format('YYYY-MM-DD hh:mm:ss')
                                    : moment().format('YYYY-MM-DD hh:mm:ss'),
                                updated_at: moment(reportRemarkRecords[0].CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                                    ? moment(reportRemarkRecords[0].CREATION_DATE).format('YYYY-MM-DD hh:mm:ss')
                                    : moment().format('YYYY-MM-DD hh:mm:ss')
                            }
                            try {
                                await Report_remark.create(reportRemarkObj);
                            } catch (error) {
                                console.error('> Error: await Report_remark.create: ', error.message);
                            }
                            // fs.writeFileSync('test-reportRemarkObj.json', JSON.stringify(reportRemarkObj, null, 2), { flag: 'a' });
                        }

                    } catch (error) {
                        console.error(`> Report | Sample Info | Migration ERR | Row number : ${equipmentIndex + 1}`);
                        equipment.error = JSON.stringify(error, null, 2);
                        fs.writeFileSync('report-migration-err.json', JSON.stringify(equipment, null, 2), { flag: 'a' });
                    }
                }
            } catch (error) {
                console.error('> Report:Equipment:Error: ', error.message);
                console.error(`> Report | Migration ERR | Row number : ${equipmentIndex + 1}`);
                equipment.error = JSON.stringify(error, null, 2);
                fs.writeFileSync('report-migration-err.json', JSON.stringify(equipment, null, 2), { flag: 'a' });
            }
        }
        equipmentProgressBar.stop();
        console.log('*******************************');
        console.log('> Report | Migration completed');
        console.log('*******************************');
        console.timeEnd('reportMigration');
    } catch (error) {
        console.error(error);
    }
}
module.exports = reportMigrationV2;