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

const findOrdersByUser = async (userId, pageSize = 10, pageNumber = 1) => {
  try {
    console.log(pageSize, pageNumber)
    const offset = (pageNumber - 1) * pageSize
    const query = `
      SELECT 
        o.id as orderId
        , o.status
        , o.totalPrice
        , o.totalQuantity
        , b.title as firstTitle
        , a.address_line1 as address
        , a.recipient_name as receiver
        , a.phone_number as contact
        , o.created_at as createdAt
      FROM (
        SELECT 
        id
        , status
        , address_id
        , amount as totalPrice
        , total_quantity as totalQuantity
        , first_id
        , created_at 
        FROM orders
        WHERE user_id = ?
      ) o 
      JOIN books b ON o.first_id = b.id
      JOIN addresses a ON o.address_id = a.id
      
      ORDER BY o.created_at DESC
      LIMIT ? OFFSET ?
    `
    const [rows] = await db.query(query, [userId, pageSize, offset])
    return rows
  } catch (err) {
    throw new Error('주문 아이템 조회 실패')
  }
}

const findOrderItemsByOrderId = async (orderId) => {
  try {
    const query = `
        SELECT 
          oi.id as orderItemId
          , p.id as productId
          , b.title as title
          , b.author as author
          , p.price as totalPrice
          , oi.count as totalQuantity
          , p.img_path as imgPath
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        JOIN books b ON p.id = b.id
        WHERE oi.order_id = ?
        ORDER BY oi.id
    `
    const [rows] = await db.query(query, [orderId])
    return rows
  } catch (err) {
    throw new Error('주문 조회 실패')
  }
}

module.exports = {
  insertAddress,
  insertOrder,
  insertOrderItems,
  findOrdersByUser,
  findOrderItemsByOrderId,
  findAddress,
  deleteCartItems,
}
