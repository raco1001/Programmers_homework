const db = require('../../app/database/mariadb');

const insertCartItem = async (userId, productId, quantity) => {
    const query = `
        INSERT INTO carts (user_id, product_id, quantity, created_at, updated_at)
        VALUES (?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE quantity = quantity + ? , updated_at = NOW()
    `;
    await db.query(query, [userId, productId, quantity, quantity]);
};

const updateCartItem = async (userId, productId, quantity) => {
   const query = `
       UPDATE carts ( quantity, updated_at)
       SET quantity = ?, updated_at = NOW()
       WHERE user_id = ? AND product_id = ?
   `;
   await db.query(query, [quantity, userId, productId]);
};

const deleteCartItem = async (userId, productId) => {
    const query = `DELETE FROM carts WHERE user_id = ? AND product_id = ?`;
    await db.query(query, [userId, productId]);
};

const findCartItemsByUser = async (userId) => {
    const query = `
        SELECT c.quantity, p.id as product_id, p.product_table_name, p.price, p.img_path
        FROM carts c
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
};

module.exports = { insertCartItem, deleteCartItem, findCartItemsByUser, updateCartItem };
