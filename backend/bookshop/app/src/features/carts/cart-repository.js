const db = require('../../database/mariadb')

const validateCartItem = async (userId, productId) => {
  const query = `
    SELECT * FROM carts WHERE user_id = ? AND product_id = ?
  `
  const [rows] = await db.query(query, [userId, productId])
  return rows[0]
}

const insertCartItem = async (userId, productId, quantity) => {
  console.log('insertCartItem', userId, productId, quantity)
  const query = `
        INSERT INTO carts (user_id, product_id, count)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE count = count + ? , updated_at = NOW()
    `
  await db.query(query, [userId, productId, quantity, quantity])
}

const increaseCartItem = async (userId, productId, quantity) => {
  const query = `
      UPDATE carts
      SET count = count + ?, updated_at = NOW()
      WHERE user_id = ? AND product_id = ?
    `
  await db.query(query, [quantity, userId, productId])
}

const updateCartItem = async (userId, productId, quantity) => {
  const query = `
      UPDATE carts
      SET count = ?, updated_at = NOW()
      WHERE user_id = ? AND product_id = ?
    `
  await db.query(query, [quantity, userId, productId])
}

const findCartItemsByUser = async (userId) => {
  const query = `
        SELECT 
            b.id as productId,
            a.count as quantity,
            b.img_path,
            b.price,
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
    `
  const [rows] = await db.query(query, [userId])
  return rows
}

const deleteCartItem = async (userId, productId) => {
  console.log('deleteCartItem++++++++++++++', userId, productId)
  if (!userId || !productId) return 0

  const query = `DELETE FROM carts WHERE user_id = ? AND product_id = ?`

  await db.query(query, [userId, productId])
}

module.exports = {
  insertCartItem,
  deleteCartItem,
  findCartItemsByUser,
  updateCartItem,
  increaseCartItem,
  validateCartItem,
}
