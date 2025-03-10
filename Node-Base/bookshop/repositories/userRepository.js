const pool = require('../database/mariadb');

exports.findUserById = async (userId) => {
    const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
    return rows.length ? rows[0] : null;
};

exports.deleteUserById = async (userId) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    return result.affectedRows;
};
