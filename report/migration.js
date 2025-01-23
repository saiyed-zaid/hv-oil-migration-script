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

async function reportMigration(PAGE = 1, LIMIT = 10) {
    try {
        const response = await prompts({
            type: 'text',
            name: 'value',
            message: 'Start migration? [y/n] '
        });
        if (String(response.value).toLowerCase() !== 'y') return true;
        console.time('reportMigration');

        // create the connection to database
        const connection = await mysql.createConnection({
            host: process.env.MG_DEV_HOST,
            user: process.env.MG_DEV_USERNAME,
            database: process.env.MG_DEV_DATABASE,
            password: process.env.MG_DEV_PASSWORD
        });

        const [sampleInfoTableRecords, fields] = await connection
            .query(`SELECT * FROM saminfotable`);
        console.log('> Report | Migration initiated');
        console.log('> Total records: ', sampleInfoTableRecords.length);
        console.log('-------------------------------');

        const progressBar = new cliProgress.SingleBar({
            format: 'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}'
        }, cliProgress.Presets.shades_classic);
        progressBar.start(sampleInfoTableRecords.length, 0);
        for (let sampleInfoIndex = 0; sampleInfoIndex < sampleInfoTableRecords.length; sampleInfoIndex++) {
            progressBar.update(sampleInfoIndex + 1);
            const sampleInfoTableRecord = sampleInfoTableRecords[sampleInfoIndex];
            try {

                const apprtype = await Apprtype.findOne({ where: { type: sampleInfoTableRecord.APPRTYPE }, raw: true });
                const company = await Company.findOne({ where: { name: sampleInfoTableRecord.COMPNAME }, raw: true });

                /* [TODO]: Find division from equipment record */
                if (sampleInfoTableRecord.DIVISION) {
                    const division = await Division.findOne({ where: { name: sampleInfoTableRecord.DIVISION }, raw: true });
                    if (division) sampleInforDataToInsert.division_id = division.id;
                }

                const user = await User.findOne({ where: { username: sampleInfoTableRecord.USERNAME }, raw: true });

                /* Find Equipement by equipment number, serial number, appr type, company id */
                const equipmentFilter = {
                    where: {
                        equipment_number:
                            sequelize.where(sequelize.fn('BINARY', sequelize.col('equipment_number')), 'LIKE', '%' + sampleInfoTableRecord.EQUIPNUM + '%'),
                        serial_number:
                            sequelize.where(sequelize.fn('BINARY', sequelize.col('serial_number')), 'LIKE', '%' + sampleInfoTableRecord.SERIALNUM + '%'),
                    }, raw: true
                };

                apprtype ? equipmentFilter.where.appr_type_id = apprtype.id : "";
                company ? equipmentFilter.where.company_id = company.id : "";

                const equipment = await Equipment.findOne(equipmentFilter);
                if (!equipment) return true;

                const sampleInforDataToInsert = {
                    serial_number: sampleInfoTableRecord.SERIALNUM,

                    location_id: 1,
                    location_name: "Test1",
                    company_id: company ? company.id : null,
                    company_name: sampleInfoTableRecord.COMPNAME,

                    appr_type_id: apprtype ? apprtype.id : null,
                    appr_type_name: sampleInfoTableRecord.APPRTYPE,

                    equipment_id: equipment ? equipment.id : null,
                    equipment_number: sampleInfoTableRecord.EQUIPNUM,

                    sample_date: moment(sampleInfoTableRecord.SAMPLEDATE).toISOString() !== null
                        ? moment(sampleInfoTableRecord.SAMPLEDATE).format('YYYY-MM-DD')
                        : moment().format('YYYY-MM-DD'),
                    lab_report_number: sampleInfoTableRecord.LABREPORTNUM,
                    tank: sampleInfoTableRecord.TANK,
                    sample_pt: sampleInfoTableRecord.SAMPLEPT,
                    lab_recv_date: moment(sampleInfoTableRecord.LABRECVDATE).toISOString() !== null
                        ? sampleInfoTableRecord.LABRECVDATE
                        : moment().format('YYYY-MM-DD'),
                    lab_test_date: moment(sampleInfoTableRecord.LABTESTDATE).toISOString() !== null
                        ? sampleInfoTableRecord.LABTESTDATE
                        : moment().format('YYYY-MM-DD'),
                    ship_date: moment(sampleInfoTableRecord.SHIPDATE).toISOString() !== null
                        ? sampleInfoTableRecord.SHIPDATE
                        : moment().format('YYYY-MM-DD'),
                    job_number: sampleInfoTableRecord.JOBNUM,
                    order_number: sampleInfoTableRecord.ORDERNUM,
                    sample_r: sampleInfoTableRecord.SAMPLER,
                    fluid_temperature: sampleInfoTableRecord.FLUIDTEMPC,
                    amb_temperature: sampleInfoTableRecord.AMBTEMP,
                    weather: sampleInfoTableRecord.WEATHER,
                    pv_gauge: sampleInfoTableRecord.PVGAUGE,
                    lvl_gauge: sampleInfoTableRecord.LVLGAUGE,
                    rlf_vlv_clr: sampleInfoTableRecord.RLFVLVCLR,
                    oil_leak: sampleInfoTableRecord.OILLEAK,
                    ground_status: sampleInfoTableRecord.GROUNDSTATUS,
                    paint: sampleInfoTableRecord.PAINT,
                    breather: sampleInfoTableRecord.BREATHER,
                    corrosion: sampleInfoTableRecord.CORROSION,
                    silick_gel: sampleInfoTableRecord.SILICKGEL,
                    ops_count: sampleInfoTableRecord.OPSCOUNT,
                    lab_name: sampleInfoTableRecord.LAB_NAME,
                    is_base: sampleInfoTableRecord.IS_BASE,
                    exclude: sampleInfoTableRecord.EXCLUDE,
                    reason: sampleInfoTableRecord.REASON,
                    first_report_date: moment(sampleInfoTableRecord.FIRSTREPORTDATE).toISOString() !== null
                        ? sampleInfoTableRecord.FIRSTREPORTDATE
                        : moment(sampleInfoTableRecord.SAMPLEDATE).format('YYYY-MM-DD'),
                    created_by: user ? user.id : null,
                    updated_by: user ? user.id : null,
                    created_at: moment(sampleInfoTableRecord.CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                        ? sampleInfoTableRecord.CREATION_DATE
                        : moment(sampleInfoTableRecord.SAMPLEDATE).format('YYYY-MM-DD hh:mm:ss'),
                    updated_at: moment(sampleInfoTableRecord.CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                        ? sampleInfoTableRecord.CREATION_DATE
                        : moment(sampleInfoTableRecord.SAMPLEDATE).format('YYYY-MM-DD hh:mm:ss')
                }
                await SampleInfo.create(sampleInforDataToInsert);

                /* --------------------------------------------------- */
                /* Find DGA record with lab report number, sample date */
                const dgatableRecordQuery = `SELECT * FROM dgatable 
                                            WHERE LABREPORTNUM = "${sampleInfoTableRecord.LABREPORTNUM}"
                                            AND date(SAMPLEDATE) = "${moment(sampleInfoTableRecord.SAMPLEDATE).format('YYYY-MM-DD')}"`;
                const [dgatableRecord, dgatableFeilds] = await connection.query(dgatableRecordQuery);

                if (dgatableRecord.length > 0) {
                    // dgatable
                    const dgatableDataToInsert = {
                        location_id: 1,
                        location_name: 'test1',
                        company_id: company ? company.id : undefined,
                        company_name: sampleInfoTableRecord.COMPNAME,
                        division_id: equipment ? equipment.division_id : null,
                        division_name: equipment ? equipment.division_id : null,
                        sample_date: moment(sampleInfoTableRecord.SAMPLEDATE).toISOString() !== null
                            ? moment(sampleInfoTableRecord.SAMPLEDATE).format('YYYY-MM-DD')
                            : moment().format('YYYY-MM-DD'),
                        lab_report_number: sampleInfoTableRecord.LABREPORTNUM,
                        h2: dgatableRecord[0].H2,
                        o2: dgatableRecord[0].O2,
                        n2: dgatableRecord[0].N2,
                        ch4: dgatableRecord[0].CH4,
                        co: dgatableRecord[0].CO,
                        co2: dgatableRecord[0].CO2,
                        c2h4: dgatableRecord[0].C2H4,
                        c2h6: dgatableRecord[0].C2H6,
                        c2h2: dgatableRecord[0].C2H2,
                        created_by: user ? user.id : null,
                        updated_by: user ? user.id : null,
                        created_at: moment(dgatableRecord[0].CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                            ? moment(dgatableRecord[0].CREATION_DATE).format('YYYY-MM-DD hh:mm:ss')
                            : moment().format('YYYY-MM-DD hh:mm:ss'),
                        updated_at: moment(dgatableRecord[0].CREATION_DATE, 'YYYY-MM-DD hh:mm:ss').toISOString() !== null
                            ? moment(dgatableRecord[0].CREATION_DATE).format('YYYY-MM-DD hh:mm:ss')
                            : moment().format('YYYY-MM-DD hh:mm:ss')
                    };
                    // console.log('dgatableDataToInsert: ', dgatableDataToInsert);
                    await Dga.create(dgatableDataToInsert);
                }

                /* --------------------------------------------------- */
                /* Find DGA record with lab report number, sample date */
                const diagtableRecordQuery = `SELECT * FROM diagtable 
                 WHERE LABREPORTNUM = "${sampleInfoTableRecord.LABREPORTNUM}"
                 AND date(SAMPLEDATE) = "${moment(sampleInfoTableRecord.SAMPLEDATE).format('YYYY-MM-DD')}"`;
                const [diagtableRecord, diagtableFeilds] = await connection.query(diagtableRecordQuery);

                // diagtable
                if (diagtableRecord.length > 0) {
                    const diagtableDataToInsert = {
                        location_id: 1,
                        location_name: 'test1',
                        company_id: company ? company.id : null,
                        company_name: sampleInfoTableRecord.COMPNAME,
                        division_id: equipment ? equipment.division_id : null,
                        division_name: equipment ? equipment.division_id : null,
                        sample_date: moment(diagtableRecord[0].SAMPLEDATE).toISOString() !== null
                            ? moment(diagtableRecord[0].SAMPLEDATE).format('YYYY-MM-DD')
                            : moment().format('YYYY-MM-DD')
                        ,
                        lab_report_number: diagtableRecord[0].LABREPORTNUM,
                        rel_saturation: diagtableRecord[0].RELSATURATION,
                        dewptc: diagtableRecord[0].DEWPTC,
                        dga_retest_date: moment(diagtableRecord[0].DGA_RETESTDATE).toISOString() !== null
                            ? moment(diagtableRecord[0].DGA_RETESTDATE).format('YYYY-MM-DD')
                            : moment().format('YYYY-MM-DD'),
                        fq_retest_date: moment(diagtableRecord[0].FQ_RETESTDATE).toISOString() !== null
                            ? moment(diagtableRecord[0].FQ_RETESTDATE).format('YYYY-MM-DD')
                            : moment().format('YYYY-MM-DD'),
                        tag: diagtableRecord[0].TAG,
                        tdcg: diagtableRecord[0].TDCG,
                        etcg: diagtableRecord[0].ETCG,
                        thg: diagtableRecord[0].THG,
                        eshl: diagtableRecord[0].ESHL,
                        total_gas_content: diagtableRecord[0].TOTAL_GAS_CONTENT,
                        o2_n2: diagtableRecord[0].O2_N2,
                        co2_co: diagtableRecord[0].CO2_CO,
                        c2h4_c2h2: diagtableRecord[0].C2H4_C2H2,
                        c2h6_ch4: diagtableRecord[0].C2H6_CH4,
                        estdp: diagtableRecord[0].ESTDP,
                        pf_ratio: diagtableRecord[0].PFRATIO,
                        fq_index: diagtableRecord[0].FQINDEX,
                        piqr: diagtableRecord[0].PIQR,
                        pmean: diagtableRecord[0].PMEAN,
                        pmedian: diagtableRecord[0].PMEDIAN,
                        pq1: diagtableRecord[0].PQ1,
                        pq3: diagtableRecord[0].PQ3,
                        pskewness: diagtableRecord[0].PSKEWNESS,
                        pstddev: diagtableRecord[0].PSTDDEV,
                        ptotal: diagtableRecord[0].PTOTAL,
                        ovrreli: diagtableRecord[0].OVRRELI,
                        gda_remarks: diagtableRecord[0].DGA_REMARKS,
                        fq_remarks: diagtableRecord[0].FQ_REMARKS,
                        moisture_remarks: diagtableRecord[0].MOISTURE_REMARKS,
                        norm_used: diagtableRecord[0].NORM_USED
                    };
                    await Diag.create(diagtableDataToInsert);
                }

                /* --------------------------------------------------- */
                /* Find FQ record with lab report number, sample date */
                const fqRecordQuery = `SELECT * FROM fqtable 
                WHERE LABREPORTNUM = "${sampleInfoTableRecord.LABREPORTNUM}"
                AND date(SAMPLEDATE) = "${moment(sampleInfoTableRecord.SAMPLEDATE).format('YYYY-MM-DD')}"`;
                const [fqRecords, fqFields] = await connection.query(fqRecordQuery);

                if (fqRecords.length > 0) {
                    // fqtable
                    const fqtableDataToInsert = {
                        location_id: 1,
                        location_name: 'test1',
                        company_id: company ? company.id : null,
                        company_name: sampleInfoTableRecord.COMPNAME,
                        division_id: equipment ? equipment.division_id : null,
                        division_name: equipment ? equipment.division_id : null,
                        sample_date:
                            moment(fqRecords[0].SAMPLEDATE, 'YYYY-MM-DD').toISOString() !== null
                                ? moment(fqRecords[0].SAMPLEDATE).format('YYYY-MM-DD')
                                : moment().format('YYYY-MM-DD'),
                        lab_report_number: sampleInfoTableRecord.LABREPORTNUM,
                        d1816_1: fqRecords[0].D1816_1,
                        d1816_2: fqRecords[0].D1816_2,
                        d877: fqRecords[0].D877,
                        water: fqRecords[0].WATER,
                        acid_number: fqRecords[0].ACIDNUM,
                        ift: fqRecords[0].IFT,
                        pf25: fqRecords[0].PF25,
                        pf100: fqRecords[0].PF100,
                        inhibitor_dbp: fqRecords[0].INHIBITOR_DBP,
                        inhibitor_dbpc: fqRecords[0].INHIBITOR_DBPC,
                        visual: fqRecords[0].VISUAL,
                        color: fqRecords[0].COLOR,
                        viscosity: fqRecords[0].VISCOSITY,
                        d1275b: fqRecords[0].D1275B,
                        d130: fqRecords[0].D130,
                        sg: fqRecords[0].SG,
                        alumi_number: fqRecords[0].ALUMINUM,
                        barium: fqRecords[0].BARIUM,
                        cadmium: fqRecords[0].CADMIUM,
                        boron: fqRecords[0].BORON,
                        calcium: fqRecords[0].CALCIUM,
                        chromium: fqRecords[0].CHROMIUM,
                        copper: fqRecords[0].COPPER,
                        iron: fqRecords[0].IRON,
                        lead: fqRecords[0].LEAD,
                        molybde_number: fqRecords[0].MOLYBDENUM,
                        magnesium: fqRecords[0].MAGNESIUM,
                        nickel: fqRecords[0].NICKEL,
                        phosphorus: fqRecords[0].PHOSPHORUS,
                        silicon: fqRecords[0].SILICON,
                        silver: fqRecords[0].SILVER,
                        sodium: fqRecords[0].SODIUM,
                        tin: fqRecords[0].TIN,
                        tungsten: fqRecords[0].TUNGSTEN,
                        zinc: fqRecords[0].ZINC,
                        p4c: fqRecords[0].P4C,
                        p6c: fqRecords[0].P6C,
                        p14c: fqRecords[0].P14C,
                        p21c: fqRecords[0].P21C,
                        p38c: fqRecords[0].P38C,
                        a1242: fqRecords[0].A1242,
                        a1254: fqRecords[0].A1254,
                        a1260: fqRecords[0].A1260,
                        total_pcb: fqRecords[0].TOTALPCB,
                        furfural: fqRecords[0].FURFURAL,
                        mfurfural: fqRecords[0].MFURFURAL,
                        hmfurfural: fqRecords[0].HMFURFURAL,
                        furfurylalc: fqRecords[0].FURFURYLALC,
                        acetylfuran: fqRecords[0].ACETYLFURAN,
                    };
                    await Fq.create(fqtableDataToInsert);
                }
            } catch (error) {
                console.error(`> Report | Migration ERR | Row number : ${sampleInfoIndex + 1}`);
                sampleInfoTableRecord.error = JSON.stringify(error, null, 2);
                fs.writeFileSync('report-migration-err.json', JSON.stringify(sampleInfoTableRecord, null, 2), { flag: 'a' });
            }
        }

        progressBar.stop();
        console.log('*******************************');
        console.log('> Report | Migration completed');
        console.log('*******************************');
        console.timeEnd('reportMigration');
        return {};
    } catch (error) {
        console.error('Error while migrating: ', error.message);
        throw error;
    }
}
module.exports = reportMigration;