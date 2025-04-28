const db = require('../../database/mariadb')
const chunkArray = require('../../shared/utils/chunkArray')
const findAddress = async (conn, userBid, addressBid) => {
  try {
    const query = `
        SELECT * FROM addresses WHERE user_id = ? AND id = ?
    `
    const [rows] = await conn.query(query, [userBid, addressBid])
    return rows[0]
  } catch (err) {
    throw new Error('주소 조회 실패')
  }
}

const insertAddress = async (conn, userBid, addressBid, addressInfo) => {
  try {
    const { address, zipCode, receiver, contact } = addressInfo

    const query = `
        INSERT INTO addresses (id, user_id, address_line1, zip_code, recipient_name, phone_number)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    const values = [addressBid, userBid, address, zipCode, receiver, contact]

    const result = await conn.query(query, values)
    return result.affectedRows
  } catch (err) {
    throw new Error('주소 생성 실패', err)
  }
}

const insertOrder = async (
  conn,
  orderBid,
  userBid,
  addressBid,
  amount,
  totalQuantity,
  firstBookTitle,
) => {
  try {
    const query = `
        INSERT INTO orders (id, user_id, address_id, amount, total_quantity, first_title)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    const values = [
      orderBid,
      userBid,
      addressBid,
      amount,
      totalQuantity,
      firstBookTitle,
    ]

    const [result] = await conn.query(query, values)
    return result.affectedRows
  } catch (err) {
    throw new Error('주문 생성 실패')
  }
}

const insertOrderItems = async (conn, userBid, orderBid, orderItems) => {
  try {
    if (orderItems.length === 0) return 0

    const CHUNK_SIZE = 500
    const chunks = chunkArray(orderItems, CHUNK_SIZE)

    let totalAffectedRows = 0

    for (const chunk of chunks) {
      const placeholders = chunk.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')

      const query = `
        INSERT INTO order_items (id, order_id, user_id, product_id, count, total_price)
        VALUES ${placeholders}
      `

      const values = chunk.flatMap((item) => [
        item.orderItemBid,
        orderBid,
        userBid,
        item.productBid,
        item.quantity,
        item.priceSum,
      ])

      console.log('Insert chunk:', values.length / 6, 'rows')

      const [result] = await conn.execute(query, values)
      totalAffectedRows += result.affectedRows
    }

    return totalAffectedRows
  } catch (err) {
    console.error('InsertOrderItems Error:', err)
    throw new Error('주문 생성 실패')
  }
}

const deleteCartItems = async (conn, userBid, modifiedItems) => {
  try {
    const query = `
      DELETE FROM carts WHERE user_id = ? AND product_id = ?
    `
    const values = modifiedItems.map((item) => [userBid, item.productBid])
    let result = 0
    for (const value of values) {
      const [deleteResult] = await conn.execute(query, value)

      result += deleteResult.affectedRows
    }

    if (result !== modifiedItems.length) {
      throw new Error('카트 아이템 삭제 실패')
    }
    return result
  } catch (err) {
    throw new Error('카트 아이템 삭제 실패')
  }
}

const findOrderItemsByUser = async (uid, pageSize, pageNumber) => {
  try {
    const offset = (pageNumber - 1) * pageSize
    const query = `
        SELECT oi.count, p.id as product_id, p.product_table_name, p.price, p.img_path
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.user_id = ?
        LIMIT ? OFFSET  ?
    `
    const [rows] = await db.query(query, [uid, pageSize, offset])
    return rows
  } catch (err) {
    throw new Error('주문 조회 실패')
  }
}

module.exports = {
  insertAddress,
  insertOrder,
  insertOrderItems,
  findOrderItemsByUser,
  findAddress,
  deleteCartItems,
}
