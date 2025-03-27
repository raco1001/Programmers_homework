const pool = require('../../app/database/mariadb');


findLikes= async (userId) => {
    const [rows] = await pool.query('SELECT user_id FROM likes WHERE user_id = ? AND product_id = ?', [userId, bookId]);
    return rows.length ? rows[0] : null;
};

insertLike = async (userId) => {
   const [result] = await pool.query('INSERT likes (product_id, user_id) VALUES (?, ?)', [bookId, userId]);
 
   return result.affectedRows;
};

deletelike= async (userId) => {
    const [result] = await pool.query('DELETE FROM likes WHERE user_id = ? AND product_id = ?', [userId, bookId]);
    return result.affectedRows;
};

