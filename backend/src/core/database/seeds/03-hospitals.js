/**
 * @param {import("knex")} knex
 */
const tableName = 'hospitals';
export const numHospitals = 17;
exports.seed = async knex => {
    await knex(tableName).del();

    const hospitals = [
        { name: 'BV Bach Mai', address: 'Ha Noi' },
        { name: 'Bệnh viện Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Bệnh viện C', address: 'Đà Nẵng' },
        { name: 'Bệnh viện C17', address: 'Đà Nẵng' },
        { name: 'Bệnh viện 199', address: 'Đà Nẵng' },
        { name: 'U Bướu Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Phụ sản_Nhi Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Bệnh viện mắt Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Bệnh viện da liễu Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Bệnh viện tâm thần', address: 'Đà Nẵng' },
        { name: 'Bệnh viện răng hàm mặt thành phố Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Bệnh viện Bình dân', address: 'Đà Nẵng' },
        { name: 'Bệnh viện Hoàn Mỹ', address: 'Đà Nẵng' },
        { name: 'Bệnh viện gia đình Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Bệnh viện Tâm Trí Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Bệnh viện quốc tế Vinmec Đà Nẵng', address: 'Đà Nẵng' },
        { name: 'Bệnh viện đa khoa tư nhân Vĩnh Toàn', address: 'Đà Nẵng' },
    ];

    await knex(tableName).insert(hospitals);
};

