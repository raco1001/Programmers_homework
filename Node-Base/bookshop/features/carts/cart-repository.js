const db = require('../../app/database/mariadb');

const insertCartItem = async (userId, productId, quantity) => {
    const query = `
        INSERT INTO carts (user_id, product_id, count)
        VALUES (user_uuid_bin, product_uuid_bin, ?)
        ON DUPLICATE KEY UPDATE count = count + ? , updated_at = NOW()
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

const deleteCartItems = async (userId, productId) => {
    const query = `DELETE FROM carts WHERE user_id = ? AND product_id = ?`;
    await db.query(query, [userId, productId]);
};

const findCartItemsByUser = async (userId) => {
    const query = `
        SELECT 
            a.user_id  as userId,
            c.id as bookId,
            b.main_category,
            b.img_path,
            b.price,
            a.count,
            c.title,
            c.author,
            c.pages,
            c.summary
        FROM (
            SELECT user_id, product_id, count, updated_at
            FROM carts 
            WHERE user_id = ?
        ) a 
        JOIN (
            SELECT * FROM products 
            WHERE product_table_name = 'books') b ON a.product_id = b.id
        JOIN books c ON b.id = c.id
        ORDER BY a.updated_at DESC
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
};


const deleteCartItem = async (cartItemBids) => {
    if (cartItemBids.length === 0) return;  // 방어 코드

    const placeholders = cartItemBids.map(() => '?').join(', ');
    const query = `DELETE FROM carts WHERE id IN (${placeholders})`;

    await db.query(query, cartItemBids);
};


module.exports = { insertCartItem, deleteCartItems, findCartItemsByUser, updateCartItem };
