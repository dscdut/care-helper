/**
 * @param {import("knex")} knex
 */
const tableName = 'hospitals';
export const numHospitals = 17;
exports.seed = async knex => {
    await knex(tableName).del();

    const hospitals = [
        { name: 'City General Hospital', address: '123 Main Street, Cityville' },
        { name: 'County Medical Center', address: '456 Oak Avenue, Countytown' },
        { name: 'Community Health Clinic', address: '789 Pine Lane, Townsville' },
        { name: 'Rural Health Center', address: '101 Meadow Road, Villageland' },
        { name: 'Metro Central Hospital', address: '555 Urban Boulevard, Metrocity' },
        { name: 'Harborview Medical Center', address: '876 Dockside Avenue, Port Harbor' },
        { name: 'Mountain View Clinic', address: '321 Summit Drive, Mountainville' },
        { name: 'Sunset Wellness Center', address: '432 West End Street, Sunset City' },
        { name: 'Greenfield Medical Associates', address: '567 Meadow Lane, Greenfield' },
        { name: 'Lakeview Community Hospital', address: '987 Lakeside Road, Laketown' },
        { name: 'Maplewood Health Center', address: '654 Oak Street, Maplewood' },
        { name: 'Pinecrest Medical Center', address: '789 Forest Avenue, Pinecrest' },
        { name: 'Valley Regional Hospital', address: '876 Valley Parkway, Valleytown' },
        { name: 'Countryside Medical Group', address: '543 Country Lane, Countryside' },
        { name: 'Hilltop General Hospital', address: '210 Summit Hill, Hilltop' },
        { name: 'Bayside Family Clinic', address: '876 Bayshore Drive, Bayside' },
        { name: 'Meadowbrook Health Services', address: '456 Meadowview Lane, Meadowbrook' },
        { name: 'Central City Medical Center', address: '101 Central Avenue, Central City' },
        { name: 'Harmony Wellness Clinic', address: '333 Harmony Street, Harmonyville' },
        { name: 'Oceanfront Medical Associates', address: '555 Ocean Drive, Oceancity' },
        { name: 'Prairie Health Center', address: '789 Prairie Lane, Prairietown' },
        { name: 'Riverbend Hospital', address: '876 River Road, Riverbend' },
        { name: 'Sunnyvale Community Clinic', address: '432 Sunshine Boulevard, Sunnyvale' },
        { name: 'Woodland Medical Center', address: '654 Wood Avenue, Woodland' },
        { name: 'Fairview General Hospital', address: '789 Fairway Street, Fairview' },
        { name: 'Silverlake Family Health', address: '876 Silver Street, Silverlake' },
        { name: 'Brookside Medical Associates', address: '543 Brook Lane, Brookside' },
        { name: 'Harbor Medical Center', address: '210 Harbor Drive, Harbortown' },
        { name: 'Lakewood Wellness Clinic', address: '876 Lakewood Avenue, Lakewood' },
        { name: 'Maple Grove Hospital', address: '333 Maple Lane, Mapletown' },
        { name: 'Pineview Health Services', address: '555 Pine Street, Pineview' },
        { name: 'Valleyview Medical Group', address: '789 Valley Road, Valleyview' },
        { name: 'Countryside Regional Hospital', address: '876 Countryside Parkway, Countrysidetown' },
        { name: 'Hillside Family Clinic', address: '432 Hillside Drive, Hillside' },
        { name: 'Bayside General Hospital', address: '654 Bayview Lane, Bayside' },
        { name: 'Meadowlark Wellness Center', address: '789 Meadowview Street, Meadowlark' },
        { name: 'Central Wellness Clinic', address: '876 Central Avenue, Centralville' },
        { name: 'Oceanview Medical Center', address: '101 Ocean Drive, Oceanview' }
    ];

    await knex(tableName).insert(hospitals);
};
