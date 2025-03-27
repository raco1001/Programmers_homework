const pool = require('../../app/database/mariadb');


findUserById = async (userId) => {
    const [rows] = await pool.query('SELECT id, name, email FROM users WHERE id = ?', [userId]);
    return rows.length ? rows[0] : null;
};


findUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT id, name, email FROM users WHERE email = ?', [email]);
    return rows.length ? rows[0] : null;
};

deleteUserById = async (userId) => {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [userId]);
    return result.affectedRows;
};

updateUserById = async (userId) => {
    const [result] = await pool.query('UPDATE users SET password = ? WHERE id = ? ', [password, userId]);
    return result.affectedRows;
};