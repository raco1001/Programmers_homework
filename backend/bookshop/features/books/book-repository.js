const db = require('../../app/database/mariadb')
const { binaryToUuid } = require('../../shared/utils/convertIds')

const findBooks = async (query, params) => {
  const [rows] = await db.query(query, params)
  console.log(rows)
  return rows.length ? rows : []
}

const findBookDetail = async (bookId) => {
  const [result] = await db.query(
    `SELECT
              id
              ,category_id
              ,title
              ,format
              ,author
              ,isbn
              ,pages
              ,description
              ,table_of_contens
              ,publication_date
            FROM books  
            WHERE id = ?`,
    [bookId],
  )

  const bookDetail = result[0]

  console.log(bookDetail)

  if (!bookDetail) return [0, 0]

  const [categoryPath, info] = await db.query(
    `WITH RECURSIVE CategoryPath AS (
              SELECT id, parent_id, name
              FROM categories
              WHERE id = ?

              UNION ALL
              
              SELECT c.id, c.parent_id, c.name
              FROM categories c
              JOIN CategoryPath cp ON c.id = cp.parent_id
            )

            SELECT name
            FROM CategoryPath
            ORDER BY id ASC;`,
    [bookDetail.category_id],
  )

  return [bookDetail, categoryPath]
}

module.exports = { findBooks, findBookDetail }
