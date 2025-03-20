const db = require('../../app/database/mariadb');


const insertOrder = async (orderInfo) => {
    const query = `
        INSERT INTO orders (id, payment_id, address_id, amount, created_at)
        VALUES (?, ?, ?, ?, NOW())
    `;

    const values = [
        orderInfo.orderBid,
        orderInfo.paymentBid,
        orderInfo.addressBid,
        orderInfo.amount
    ];

    await db.query(query, values);
};

const insertOrderItems = async (orderItems) => {
    const query = `
        INSERT INTO order_items (id, order_id, product_id, count, total_price, created_at)
        VALUES ${orderItems.map(() => '(?, ?, ?, ?, ?, ?, NOW())').join(', ')}
    `;

    const values = orderItems.flatMap(item => [
        item.orderItemBid,
        item.orderBid,
        item.productId,
        item.price,
        item.count,
        item.totalPrice
    ]);

    await db.query(query, values);
};


const removeItemsTx = async (conn, userId, productIds) => {
    const placeholders = productIds.map(() => '?').join(',');
    const query = `
        DELETE FROM carts WHERE user_id = ? AND product_id IN (${placeholders})
    `;
    await conn.query(query, [userId, ...productIds]);
};


const updateOrderItem = async (userId, productId, quantity) => {
   const query = `
       UPDATE order_items
        SET count = ?, updated_at = NOW()
        WHERE user_id = ? AND product_id = ?
   `;
   await db.query(query, [quantity, userId, productId]);
};


const findOrderItemsByUser = async (userId) => {
    const query = `
        SELECT oi.count, p.id as product_id, p.product_table_name, p.price, p.img_path
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    return rows;
};

module.exports = {insertOrder, insertOrderItems, removeItemsTx, findOrderItemsByUser, updateOrderItem };
