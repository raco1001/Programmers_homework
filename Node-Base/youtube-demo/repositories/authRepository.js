const pool = require('../database/mariadb');

exports.findUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log(`authRepo:` + rows);
    return rows.length ? rows[0] : null;
};

exports.insertUser = async (name, email, password) => {
    const [result] = await pool.query(
        'INSERT INTO users (id, name, email, password) VALUES (UUID(),?, ?, ?)',
        [name, email, password]
    );
    return { name, email };
};
