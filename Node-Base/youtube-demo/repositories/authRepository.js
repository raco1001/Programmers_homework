const pool = require('../database/mariadb');

exports.findUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows.length ? rows[0] : null;
};

exports.insertUser = async (id, name, email, password, role) => {
    const [result] = await pool.query(
        'INSERT INTO users (id, name, email, password, role, created_at, updated_at, is_activated) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), 1)',
        [id, name, email, password, role]
    );
    return { id, name, email, role };
};
