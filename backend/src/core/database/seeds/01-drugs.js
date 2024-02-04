/**
 * @param {import("knex")} knex
 */
import { promises as fsPromises } from 'fs';

const drugsFilePath = '../database/researchData/drugs.json';

const readJsonFile = async filePath => {
    try {
        const data = await fsPromises.readFile(filePath);
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

exports.seed = async knex => {
    await knex('drugs').del();

    const drugsList = await readJsonFile(drugsFilePath);
    const drugs = drugsList.map(drug => ({ name: drug }));
    await knex('drugs').insert(drugs);
};
